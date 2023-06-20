const knex = require('knex')(require('../knexfile'));

const index = (_req, res) => {
    knex('logs')
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
  
        const logData = logsFoundFound[0];
  
        res.status(200).json(logData);
      })
      .catch(() => {
        res.status(500).json({
          message: `Unable to retrieve log data for daily log with ID: ${req.params.id}`,
        });
      });
  };

  module.exports = {
    index,
    findOne
  }