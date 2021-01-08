const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
	res.render('users/register');
}

module.exports.register = async (req, res) => {
	try {
		const { courriel, username, password } = req.body;
		const user = new User({ courriel, username });
		if(req.body.codeAuteur === process.env.CODE_AUTEUR){
		user.isAuteur = true;
			} else {
				req.flash('error', 'Veuillez envoyer un courriel à trev@superklok.com pour demander un code d\'auteur afin de terminer votre inscription.');	
				return res.redirect('/register');
			}
		const registeredUser = await User.register(user, password);
		req.login(registeredUser, err => {
			if (err) return next(err);
			req.flash('success', 'Bienvenue sur Le Current Courant!');
			res.redirect('/articles');
		});
	} catch (e) {
		req.flash('error', e.message);
		res.redirect('register');
	}
}

module.exports.renderLogin = (req, res) => {
	res.render('users/login');
}

module.exports.login = (req, res) => {
	req.flash('success', 'Ravi de vous revoir!');
	const redirectURL = req.session.returnTo || '/articles';
	delete req.session.returnTo;
	res.redirect(redirectURL);
}

module.exports.logout = (req, res) => {
	req.logout();
	req.flash('success', 'Merci d\'avoir choisi Le Current Courant!');
	res.redirect('/articles');
}