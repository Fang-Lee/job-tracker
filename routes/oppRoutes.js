// route handlers for creating, fetching opportunities
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const linkify = require('linkifyjs');
const keys = require('../config/keys');
const fs = require('fs');
const S3FS = require('s3fs');
const multer = require('multer');
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
			console.log('req.body', req.body);
			console.log('req.files', req.files);
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
				lastUpdate,
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
				console.log('stream', stream);
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
				console.log('app link', appLink);
				const linkInfo = linkify.find(appLink);
				console.log('link info', linkInfo);
				if (linkInfo.length > 0) {
					console.log('link info', linkInfo);
					appLinkHref = linkInfo[0].href;
					console.log(appLinkHref);
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
				filesSize: resumeFileSize + coverLetterFileSize,
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
			const removeFileSize = deletedOpp.filesSize * -1;
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
			res.send({redirect: '/dashboard'});
		} catch (err) {
			res.status(500).send(err);
		}
	});
};
