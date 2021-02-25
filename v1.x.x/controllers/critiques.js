const Article = require('../models/article');
const Critique = require('../models/critique');

module.exports.createCritique = async (req, res) => {
	const article = await Article.findById(req.params.id);
	const critique = new Critique(req.body.critique);
	critique.auteur = req.user._id;
	article.critiques.push(critique);
	await critique.save();
	await article.save();
	req.flash('success', 'Merci d\'avoir laissé votre avis!');
	res.redirect(`/articles/${ article._id }`);
}

module.exports.destroyCritique = async (req, res) => {
	const { id, critiqueId } = req.params;
	await Article.findByIdAndUpdate(id, { $pull: { critiques: critiqueId } });
	await Critique.findByIdAndDelete(critiqueId);
	req.flash('success', 'Votre avis a été supprimé avec succès!');
	res.redirect(`/articles/${ id }`);
}