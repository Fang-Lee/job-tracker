const mongoose = require('mongoose');
const { Schema } = mongoose;

const opportunitySchema = new Schema({
	company: String,
	jobTitle: String,
	location: String,
	status: String,
	salary: String,
	origin: String,
	appLink: String,
	jobDescription: String,
	companyDescription: String,
	lastUpdate: String,
	priority: { type: Number, default: 0 },
	contactName: String,
	contactEmail: String,
	contactPhone: String,
	lastContact: String,
	notes: String,
	_user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('opps', opportunitySchema);
