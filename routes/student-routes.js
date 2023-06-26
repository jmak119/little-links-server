const router = require('express').Router();
const studentController = require('../controllers/student-controller');

router
    .route('/:id')
    .get(studentController.findOne);

module.exports = router;


