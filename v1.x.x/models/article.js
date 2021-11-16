const mongoose         = require('mongoose'),
	  Critique         = require('./critique'),
	  Schema           = mongoose.Schema,
	  mongoosePaginate = require('mongoose-paginate-v2');

const ImageSchema = new Schema({
	url: String,
	filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
	return this.url.replace('/upload', '/upload/w_200');
});

const ArticleSchema = new Schema({
	titre: String,
	images: [ImageSchema],
	contenu: String,
	auteur: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	critiques: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Critique'
		}
	]
});

ArticleSchema.post('findOneAndDelete', async function (doc) {
	if (doc) {
		await Critique.deleteMany({
			_id: {
				$in: doc.critiques
			}
		})
	}
});

ArticleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Article', ArticleSchema);