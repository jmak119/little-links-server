
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

// const findOne = (req, res) => {
//     knex("students")
//       .join("logs", "students.id", "logs.student_id")
//       .join("teachers", "students.teacher_id", "teachers.id")
//       .where({ "students.id": req.params.id })
//       .select({
//         student_id: "students.id",
//         student_name: "students.name",
//         teacher_id: "teachers.id",
//         teacher_name: "teachers.name",
//         logs: knex.raw(
//           `GROUP_CONCAT(
//             JSON_OBJECT(
//               'log_id', logs.id,
//               'date', logs.date,
//               'type', logs.type,
//               'start_time', logs.start_time,
//               'end_time', logs.end_time,
//               'description', logs.description
//             )
//           ) as logs`
//         )
//       })
//       .groupBy("students.id", "students.name", "teachers.id", "teachers.name")
//       .then((students) => {
//         const student = students[0];
//         if (student) {
//           student.logs = JSON.parse(`[${student.logs}]`);
//           console.log(student);
//           res.status(200).json(student);
//         } else {
//           res.status(404).json({
//             message: `Student with ID: ${req.params.id} not found.`,
//           });
//         }
//       })
//       .catch((error) => {
//         res.status(500).json({
//           message: `Unable to retrieve logs for student with ID: ${req.params.id} ${error}`,
//         });
//       });
//   };
  
  module.exports ={
    findOne
  }