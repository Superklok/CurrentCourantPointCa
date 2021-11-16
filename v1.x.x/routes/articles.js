const express                                   = require('express'),
	  router                                    = express.Router(),
	  articles                                  = require('../controllers/articles'),
	  catchAsync                                = require('../HELPeR/catchAsync'),
	  { isLoggedIn, isAuteur, validateArticle } = require('../middleware'),
	  multer                                    = require('multer'),
	  { storage }                               = require('../cloudinary'),
	  upload                                    = multer({ storage });

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