const router = require('express').Router();
const studentController = require('../controllers/student-controller');

router
    .route('/')
    .get(studentController.index);

router
    .route('/:id')
    .get(studentController.findOne);

module.exports = router;


