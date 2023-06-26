

const knex = require('knex')(require('../knexfile'));

const findByDate = (req, res) => {
    knex('logs')
      .where({ date: req.params.date,
              student_id: req.params.student_id
      })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) =>
        res.status(400).send(`Error retrieving daily logs: ${err}`)
      );
  };

  const findOne = (req, res) => {
    knex("logs")
      .where({ id: req.params.id })
      .then((logsFound) => {
  
        if (logsFound.length === 0) {
          return res
            .status(404)
            .json({ message: `Daily log with ID: ${req.params.id} not found` });
        }
  
        const logData = logsFound[0];
  
        res.status(200).json(logData);
      })
      .catch(() => {
        res.status(500).json({
          message: `Unable to retrieve log data for daily log with ID: ${req.params.id}`,
        });
      });
  };

  const joinTables = (req, res) => {
    knex("logs")
      .join("students", "students.id", "logs.student_id")
      .join("teachers", "teachers.id", "logs.teacher_id")
      .where({ "logs.id" : req.params.id})
      .select({student_name: "students.name",teachers_name: "teachers.name"})
      .then((students) => {
        console.log(students);
        res.status(200).json(students[0]);
      })
      .catch((error) => {
        res.status(500).json({
          message: `Unable to retrieve logs for student with ID: ${req.params.id} ${error}`,
        });
      });
  }

  // const posts = (req, res) => {
  //   knex("logs")
  //     .join("post", "post.user_id", "user.id")
  //     .where({ user_id: req.params.id })
  //     .then((posts) => {
  //       res.status(200).json(posts);
  //     })
  //     .catch((error) => {
  //       res.status(500).json({
  //         message: `Unable to retrieve posts for user with ID: ${req.params.id} ${error}`,
  //       });
  //     });
  // };

  module.exports = {
    findByDate,
    findOne,
    joinTables
    // add,
    // posts
  }