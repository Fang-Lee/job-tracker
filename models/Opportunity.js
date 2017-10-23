const mongoose = require('mongoose');
const { Schema } = mongoose;
const FileSchema = require('./File');

const opportunitySchema = new Schema({
	company: String,
	jobTitle: String,
	location: String,
	status: { type: Number, default: 0},
	salary: String,
	origin: String,
	appLink: String,
	jobDescription: String,
	companyDescription: String,
	responsibilities: String,
	qualifications: String,
	lastUpdate: Date,
	priority: { type: Number, default: 0 },
	contactName: String,
	contactEmail: String,
	contactPhone: String,
	lastContact: Date,
	notes: String,
	tags: [{type: String}],
	resume: String,
	coverLetter: String,
	resumeLink: String,
	coverLetterLink: String,
	filesSize: { type: Number, default: 0 },
	_user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('opps', opportunitySchema);
