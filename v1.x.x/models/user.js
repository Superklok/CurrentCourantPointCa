const mongoose              = require('mongoose'),
	  Schema                = mongoose.Schema,
	  passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
	isAuteur: {
		type: Boolean,
		default: false
	},
	courriel: {
		type: String,
		required: true,
		unique: true
	}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);