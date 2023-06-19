const router = require('express').Router();
const dailyLogController = require('../controllers/dailyLog-controller');

router
    .route('/')
    .get(dailyLogController.index);

router
    .route('/:id')
    .get(dailyLogController.findOne);

module.exports = router;