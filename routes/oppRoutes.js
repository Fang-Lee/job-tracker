// route handlers for creating, fetching opportunities
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const linkify = require('linkifyjs');
const keys = require('../config/keys');
var fs = require('fs');
var S3FS = require('s3fs');
const multer = require('multer');

var s3fsImpl = new S3FS('jobtracker-dev', {
	accessKeyId: keys.s3AccessKeyId,
	secretAccessKey: keys.s3SecretAccessKey
});

const Opportunity = mongoose.model('opps');

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
	app.post('/api/opp', requireLogin, multer().any(), async (req, res) => {
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
			tags = '',
		} = req.body;

		const resume = req.files[0];

		// upload documents to aws s3
		s3fsImpl.writeFile(resume.originalName, resume.buffer, err => {
			if (err) throw err;
			console.log('document saved!');
		})

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
			tags: tags.split(',').map(tag => tag.trim()),
			_user: req.user.id
		});

		try {
			await opp.save();
			console.log('successfully added to db');
			res.send({ redirect: `/opp/${opp._id}` });
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
