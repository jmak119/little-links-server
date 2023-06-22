const router = require('express').Router();
const dailyLogController = require('../controllers/dailyLog-controller');

router
    .route('/:date/:student_id')
    .get(dailyLogController.findByDate)
    // .post(dailyLogController.add);

router
    .route('/:date/:id')
    .get(dailyLogController.findOne);

router
    .route("/:date/:id/students")
    .get(dailyLogController.joinTables);

// router
//     .route('/:id/posts')
//     .get(dailyLogController.posts);

module.exports = router;