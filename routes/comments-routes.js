const router = require('express').Router();
const commentsController = require('../controllers/comments-controller');

router
    .route('/')
    .get(commentsController.index);

router
    .route('/:id')
    .get(commentsController.findOne);

module.exports = router;