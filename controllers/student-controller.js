
const knex = require('knex')(require('../knexfile'));

const findOne = (req, res) => {
    knex("students")
      .join("logs", "students.id", "logs.student_id")
      .join("teachers", "students.teacher_id", "teachers.id")
      .where({ "logs.student_id" : req.params.id})
      .select("logs.*","students.name AS student_name", "teachers.name AS teacher_name")
      .then((students) => {
        console.log(students);
        res.status(200).json(students);
      })
      .catch((error) => {
        res.status(500).json({
          message: `Unable to retrieve logs for student with ID: ${req.params.id} ${error}`,
        });
      });
  }

  module.exports ={
    findOne
  }