const mongoose = require('mongoose'),
	  Schema   = mongoose.Schema;

const critiqueSchema = new Schema({
	body: String,
	note: Number,
	auteur: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model("Critique", critiqueSchema);