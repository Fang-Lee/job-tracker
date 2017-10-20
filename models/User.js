const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
	firstName: String,
	lastName: String,
	email: String,
	totalStorage: { type: Number, default: 0 }
});

mongoose.model('users', userSchema);
