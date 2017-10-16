const mongoose = require('mongoose');
const { Schema } = mongoose;

const fileSchema = new Schema({
	file: Buffer
});

module.exports = fileSchema;