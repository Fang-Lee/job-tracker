// route handlers for creating, fetching opportunities
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Opportunity = mongoose.model('opps');

module.exports = app => {
	app.get('/api/opps', requireLogin, async (req, res) => {
		const opps = await Opportunity.find({ _user: req.user.id });
		console.log(opps);
		res.send(opps);
	});

	app.post('/api/opp', requireLogin, async (req, res) => {
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
			lastUpdate,
			priority,
			contactName,
			contactEmail,
			contactPhone,
			lastContact,
			notes
		} = req.body;

		// create new opp in db
		const opp = new Opportunity({
			company,
			jobTitle,
			location,
			status,
			salary,
			origin,
			appLink,
			jobDescription,
			companyDescription,
			lastUpdate: new Date(lastUpdate).toLocaleDateString(),
			priority,
			contactName,
			contactEmail,
			contactPhone,
			lastContact: new Date(lastContact).toLocaleDateString(),
			notes,
			_user: req.user.id
		});

		try {
			await opp.save();
			res.send({});
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
