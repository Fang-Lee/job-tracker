// route handlers for creating, fetching opportunities
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const linkify = require("linkifyjs");

const Opportunity = mongoose.model("opps");

module.exports = app => {
	// fetch all opps
	app.get("/api/opps", requireLogin, async (req, res) => {
		const opps = await Opportunity.find({ _user: req.user.id });
		res.send(opps);
	});

	// fetch single opp by id
	app.get("/api/opp/:id", requireLogin, async (req, res) => {
		const opp = await Opportunity.findOne({ _id: req.params.id });
		res.send(opp);
	});

	// create an opp
	app.post("/api/opp", requireLogin, async (req, res) => {
		console.log(req.body);
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
			tags = "",
		} = req.body;

		// linkify the application link
		let appLinkHref = "";
		if (appLink) {
			console.log("app link", appLink);
			const linkInfo = linkify.find(appLink);
			console.log("link info", linkInfo);
			if (linkInfo.length > 0) {
				console.log("link info", linkInfo);
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
			console.log('successfully added to db')
			res.send({redirect: `/opp/${opp._id}`});
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
