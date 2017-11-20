// route handlers for creating, fetching opportunities
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const linkify = require('linkifyjs');
const keys = require('../config/keys');
const fs = require('fs');
const S3FS = require('s3fs');
const multer = require('multer');
var moment = require('moment');
var momentTz = require('moment-timezone');
const upload = multer({
	dest: 'uploads'
});
const AWS = require('aws-sdk');
AWS.config.update({
	accessKeyId: keys.s3AccessKeyId,
	secretAccessKey: keys.s3SecretAccessKey,
	region: 'us-west-1'
});
const s3 = new AWS.S3();

const s3fsImpl = new S3FS(keys.s3Bucket, {
	region: 'us-west-1',
	accessKeyId: keys.s3AccessKeyId,
	secretAccessKey: keys.s3SecretAccessKey
});

const fileFields = [
	{ name: 'resume', maxCount: 1 },
	{ name: 'coverLetter', maxCount: 1 }
];

const Opportunity = mongoose.model('opps');
const User = mongoose.model('users');

module.exports = app => {
	// fetch all opps
	app.get('/api/opps', requireLogin, async (req, res) => {
		const opps = await Opportunity.find({ _user: req.user.id });
		res.send(opps);
	});

	// fetch single opp by id
	app.get('/api/opp/:id', requireLogin, async (req, res) => {
		const opp = await Opportunity.findOne({ _id: req.params.id });
		res.send(opp);
	});

	// create an opp
	// files cannot be parsed by body-parser so have to use middleware called multer.
	// for multer to read files, must be placed inside formData
	app.put(
		'/api/opp',
		requireLogin,
		upload.fields(fileFields),
		async (req, res) => {
			moment.locale();
			console.log(typeof(moment().format('L')));
			const {
				company,
				jobTitle,
				location,
				status,
				salary,
				origin,
				appLink,
				jobDescription,
				companyDescription,
				responsibilities,
				qualifications,
				lastUpdate = moment().format('L'),
				priority,
				contactName,
				contactEmail,
				contactPhone,
				lastContact,
				notes,
				tags = ''
			} = req.body;

			let resumeFileName = '';
			let coverLetterFileName = '';
			let resumeLink;
			let coverLetterLink;
			let resumeFileSize = 0;
			let coverLetterFileSize = 0;

			// upload documents to aws s3
			if (req.files.resume) {
				let resume = req.files.resume[0];
				resumeFileName = `${req.user
					.id}/${company}/resume/${resume.originalname}`;
				resumeLink = `https://s3-us-west-1.amazonaws.com/${keys.s3Bucket}/${resumeFileName}`;
				resumeFileSize = resume.size;
				var stream = fs.createReadStream(resume.path);
				await s3fsImpl.writeFile(resumeFileName, stream).then(() => {
					fs.unlink(resume.path, err => {
						if (err) throw err;
						console.log('resume saved!');
					});
				});
			}

			if (req.files.coverLetter) {
				let coverLetter = req.files.coverLetter[0];
				coverLetterFileName = `${req.user
					.id}/${company}/cover_letter/${coverLetter.originalname}`;
				coverLetterLink = `https://s3-us-west-1.amazonaws.com/${keys.s3Bucket}/${coverLetterFileName}`;
				coverLetterFileSize = coverLetter.size;
				var stream = fs.createReadStream(coverLetter.path);
				console.log('stream', stream);
				s3fsImpl.writeFile(coverLetterFileName, stream).then(() => {
					fs.unlink(coverLetter.path, err => {
						if (err) throw err;
						console.log('cover letter saved!');
					});
				});
			}

			// linkify the application link
			let appLinkHref = '';
			if (appLink) {
				const linkInfo = linkify.find(appLink);
				if (linkInfo.length > 0) {
					appLinkHref = linkInfo[0].href;
				}
			}

			const opp = new Opportunity({
				company,
				jobTitle,
				location,
				status,
				salary,
				origin,
				appLink: appLinkHref,
				jobDescription,
				companyDescription,
				responsibilities,
				qualifications,
				lastUpdate,
				priority,
				contactName,
				contactEmail,
				contactPhone,
				lastContact,
				notes,
				resume: resumeFileName,
				coverLetter: coverLetterFileName,
				resumeLink,
				coverLetterLink,
				resumeSize: resumeFileSize,
				coverLetterSize: coverLetterFileSize,
				tags: tags.split(',').map(tag => tag.trim()),
				_user: req.user.id
			});

			try {
				const user = await User.findByIdAndUpdate(req.user.id, {
					$inc: { totalStorage: resumeFileSize + coverLetterFileSize }
				});
			} catch (err) {
				return res.status(500).send(err);
			}

			try {
				await opp.save();
				console.log('saved opp', opp);
				console.log('successfully added to db');
				res.send({ redirect: `/opp/${opp._id}` });
			} catch (err) {
				res.status(422).send(err);
			}
		}
	);

	app.post(
		'/api/edit',
		requireLogin,
		upload.fields(fileFields),
		async (req, res) => {
			moment.locale();
			const {
				company = '',
				jobTitle = '',
				location = '',
				status,
				salary = '',
				origin = '',
				appLink = '',
				jobDescription = '',
				companyDescription = '',
				responsibilities = '',
				qualifications = '',
				priority,
				contactName = '',
				contactEmail = '',
				contactPhone = '',
				lastContact,
				notes = '',
				tags,
				oldResume,
				oldCoverLetter,
				resume,
				coverLetter
			} = req.body;
		
			let resumeFileName = resume;
			let coverLetterFileName = coverLetter;
			let resumeLink = req.body.resumeLink;
			let coverLetterLink = req.body.coverLetterLink;
			let resumeFileSize = 0;
			let coverLetterFileSize = 0;

			// upload documents to aws s3
			if (req.files.resume) {
				if (oldResume) {
					var resumeParams = {
						Bucket: keys.s3Bucket,
						Key: oldResume
					};
					s3.deleteObject(resumeParams, function(err, data) {
						if (err) console.log('error deleting resume from s3', err);
						else console.log('successfully deleted resume from s3');
					});
				}
				let resume = req.files.resume[0];
				resumeFileName = `${req.user
					.id}/${company}/resume/${resume.originalname}`;
				resumeLink = `https://s3-us-west-1.amazonaws.com/${keys.s3Bucket}/${resumeFileName}`;
				resumeFileSize = resume.size;
				var stream = fs.createReadStream(resume.path);
				console.log('stream', stream);
				await s3fsImpl.writeFile(resumeFileName, stream).then(() => {
					fs.unlink(resume.path, err => {
						if (err) throw err;
						console.log('resume saved!');
					});
				});
			}

			if (req.files.coverLetter) {
				if (oldCoverLetter) {
					var coverLetterParams = {
						Bucket: keys.s3Bucket,
						Key: oldCoverLetter
					};
					s3.deleteObject(coverLetterParams, function(err, data) {
						if (err) console.log('error deleting cover letter from s3', err);
						else console.log('successfully deleted cover letter from s3');
					});
				}
				let coverLetter = req.files.coverLetter[0];
				coverLetterFileName = `${req.user
					.id}/${company}/cover_letter/${coverLetter.originalname}`;
				coverLetterLink = `https://s3-us-west-1.amazonaws.com/${keys.s3Bucket}/${coverLetterFileName}`;
				coverLetterFileSize = coverLetter.size;
				var stream = fs.createReadStream(coverLetter.path);
				console.log('stream', stream);
				s3fsImpl.writeFile(coverLetterFileName, stream).then(() => {
					fs.unlink(coverLetter.path, err => {
						if (err) throw err;
						console.log('cover letter saved!');
					});
				});
			}

			// linkify the application link
			let appLinkHref = '';
			if (appLink) {
				const linkInfo = linkify.find(appLink);
				if (linkInfo.length > 0) {
					appLinkHref = linkInfo[0].href;
				}
			}

			const edits = {
				company,
				jobTitle,
				location,
				status,
				salary,
				origin,
				appLink: appLinkHref,
				jobDescription,
				companyDescription,
				responsibilities,
				qualifications,
				priority,
				lastUpdate: moment().format('L'),
				contactName,
				contactEmail,
				contactPhone,
				notes,
				tags: tags.split(',').map(tag => tag.trim())
			};

			if (lastContact) {
				edits.lastContact = lastContact;
			}

			if (req.files.resume) {
				console.log('addng resume to edits');
				edits.resume = resumeFileName,
				edits.resumeLink = resumeLink,
				edits.resumeSize = resumeFileSize
			}

			if (req.files.coverLetter) {
				console.log('adding cover letter to edits');
				edits.coverLetter = coverLetterFileName,
				edits.coverLetterLink = coverLetterLink,
				edits.coverLetterFileSize = coverLetterFileSize
			}

			try {
				const editedOpp = await Opportunity.findByIdAndUpdate(req.body._id, edits);
				console.log('successfully edited', editedOpp);
				res.send({ redirect: `/opp/${editedOpp._id}` });
			} catch (err) {
				console.log(err);
				res.send(err);
			}
		}
	);

	app.delete('/api/delete/opp/:id', requireLogin, async (req, res) => {
		try {
			const deletedOpp = await Opportunity.findByIdAndRemove(req.params.id);
			console.log('this opp was deleted', deletedOpp);
			if (deletedOpp.resume) {
				var resumeParams = { Bucket: keys.s3Bucket, Key: deletedOpp.resume };
				s3.deleteObject(resumeParams, function(err, data) {
					if (err) console.log('error deleting resume from s3', err);
					else console.log('successfully deleted resume from s3');
				});
			}
			if (deletedOpp.coverLetter) {
				var coverLetterParams = {
					Bucket: keys.s3Bucket,
					Key: deletedOpp.coverLetter
				};
				s3.deleteObject(coverLetterParams, function(err, data) {
					if (err) console.log('error deleting cover letter from s3', err);
					else console.log('successfully deleted cover letter from s3');
				});
			}
			const removeFileSize =
				(deletedOpp.resumeSize + deletedOpp.coverLetterSize) * -1;
			try {
				const user = await User.findByIdAndUpdate(req.user.id, {
					$inc: { totalStorage: removeFileSize }
				});
			} catch (err) {
				return res.status(500).send(err);
			}
			res.send({ opp: deletedOpp, redirect: '/dashboard' });
		} catch (err) {
			res.status(500).send(err);
		}
	});

	app.post('/api/archive/opp/:id', requireLogin, async (req, res) => {
		try {
			const updatedOpp = await Opportunity.findByIdAndUpdate(req.params.id, {
				$set: { status: 5 }
			});
			res.send({ redirect: '/dashboard' });
		} catch (err) {
			res.status(500).send(err);
		}
	});
};
