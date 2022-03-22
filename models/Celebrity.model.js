//  Add your code here

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CelebritySchema = new Schema({
	name: String,
	occupation: {
		type:	String,
		default: 'unknown',
	},
	catchPhrase: String
});

const Celebrity = mongoose.model('Celebrity', CelebritySchema);

module.exports = Celebrity;
