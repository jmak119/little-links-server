const knex = require('knex') (require('..knexfile'));

const index = (_req, res) => {
    knex('user')
        .then((data) => {
            res.status(200).json(data);
        })
}