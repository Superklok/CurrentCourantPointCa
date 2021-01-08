const express = require('express');
const router = express.Router();
const articles = require('../controllers/articles');
const catchAsync = require('../HELPeR/catchAsync');
const { isLoggedIn, isAuteur, validateArticle } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
	.get(catchAsync(articles.index))
	.post(isLoggedIn, 
		upload.array('image'), 
		validateArticle, 
		catchAsync(articles.createArticle))

router.get('/new', 
	isLoggedIn, 
	articles.renderNewForm);

router.route('/:id')
	.get(catchAsync(articles.showArticle))
	.put(isLoggedIn, 
		isAuteur, 
		upload.array('image'), 
		validateArticle, 
		catchAsync(articles.updateArticle))
	.delete(isLoggedIn, 
		isAuteur, 
		catchAsync(articles.destroyArticle))

router.get('/:id/edit', 
	isLoggedIn, 
	isAuteur, 
	catchAsync(articles.renderEditForm));

module.exports = router;