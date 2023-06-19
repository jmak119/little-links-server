// import seed data files, arrays of objects

const studentsData = require('../seed-data/students');
const teachersData = require('../seed-data/teachers');
const dailyLogsData = require('../seed-data/dailyLogs');
const commentsData = require('../seed-data/comments');

exports.seed = function (knex) {
  return knex('comments')
    .del()
    .then(function () {
      return knex('logs').del();
    })
    .then(function () {
      return knex('students').del();
    })
    .then(function () {
      return knex('teachers').del();
    })
    .then(function () {
      return knex('teachers').insert(teachersData);
    })
    .then(function () {
      return knex('students').insert(studentsData);
    })
    .then(function () {
      return knex('logs').insert(dailyLogsData);
    })
    .then(function () {
      return knex('comments').insert(commentsData);
    });
};