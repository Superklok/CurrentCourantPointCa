if (process.env.NODE_ENV !== "production") {
	require('dotenv').config();
}

const mongoose = require('mongoose');
const { adjectifs, sujets } = require('./articleTitres');
const { contenu } = require('./articleContenu');
const articleImg1 = require('./articleImg1');
const articleImg2 = require('./articleImg2');
const Article = require('../models/article');
// Base de données de production
const urlBd = process.env.URL_BD;
// Base de données de développement
// const urlBd = 'mongodb://localhost:27017/currentcourantpointca';

mongoose.connect(urlBd, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "erreur de connexion:"));
db.once("open", () => {
	console.log("Base de données CurrentCourantPointCa connectée");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Article.deleteMany({});
	for(let i = 0; i < 200; i++){
		const random30Img1 = Math.floor(Math.random() * 30);
		const random30Img2 = Math.floor(Math.random() * 30);
		const article = new Article({
			// auteur: 'ObjectId' (Dans le Shell MongoDB, lancez db.users.find() dès qu'un utilisateur a été créé.)
			// Utilisateur de la base de données de production
			auteur: '5ff7b183b47e4c4dc8e786c6',
			// Utilisateur de la base de données de développement
			// auteur: '5ff76eed7b497641b07efd21',
			titre: `${ sample(sujets) } ${ sample(adjectifs) }`,
			contenu: `${ sample(contenu) }`,
			images: [
				{
					url: `${ articleImg1[random30Img1].url }`,
					filename: `${ articleImg1[random30Img1].filename }`
				},
				{
					url: `${ articleImg2[random30Img2].url }`,
					filename: `${ articleImg2[random30Img2].filename }`
				}
			]
		})
		await article.save();
	}
}

seedDB().then(() => {
	mongoose.connection.close();
})