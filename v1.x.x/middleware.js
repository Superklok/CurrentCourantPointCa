const {articleSchema, critiqueSchema} = require('./schemas.js');
const ExpressError = require('./HELPeR/ExpressError');
const Article = require('./models/article');
const Critique = require('./models/critique');

module.exports.isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.flash('error', 'Seulement les auteur(e)s inscrits peuvent faire cela.');
		return res.redirect('/login');
	}
	next();
}

module.exports.validateArticle = (req, res, next) => {
	const {error} = articleSchema.validate(req.body);
	if (error) {
		const msg = error.details.map(el => el.message).join(',')
		throw new ExpressError(msg, 400)
	} else {
		next();
	}
}

module.exports.isAuteur = async (req, res, next) => {
	const {id} = req.params;
	const article = await Article.findById(id);
	if (!article.auteur.equals(req.user._id)) {
		req.flash('error', 'Veuillez connecter en tant que l\'auteur(e) qui à publier cet article pour faire cela.');
		return res.redirect(`/articles/${id}`);
	}
	next();
}

module.exports.isCommentateur = async (req, res, next) => {
	const {id, critiqueId} = req.params;
	const critique = await Critique.findById(critiqueId);
	if (!critique.auteur.equals(req.user._id)) {
		req.flash('error', 'Veuillez connecter en tant que l\'auteur(e) qui a laissé cet avis pour faire cela.');
		return res.redirect(`/articles/${id}`);
	}
	next();
}

module.exports.validateCritique = (req, res, next) => {
	const {error} = critiqueSchema.validate(req.body);
	if(error){
		const msg = error.details.map(el => el.message).join(',')
		throw new ExpressError(msg, 400)
	} else {
		next();
	}
}