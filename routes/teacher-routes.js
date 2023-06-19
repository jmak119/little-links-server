const router = require('express').Router();
const teacherController = require('../controllers/teacher-controller');

router
    .route('/')
    .get(teacherController.index);

router
    .route('/:id')
    .get(teacherController.findOne);

module.exports = router;
