const knex = require('knex')(require('..knexfile'));

const index = (_req, res) => {
    knex('user')
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) =>
            res.status(400).send(`Error retrieving Users: ${err}`)
        );
};

const findOne = (req, res) => {
    knex("user")
        .where({ id: req.params.id })
        .then((usersFound) => {

            if (usersFound.length === 0) {
                return res
                    .status(404)
                    .json({ message: `User with ID: ${req.params.id} not found` });
            }

            const userData = usersFound[0];

            res.status(200).json(userData);
        })
        .catch(() => {
            res.status(500).json({
                message: `Unable to retrieve user data for user with ID: ${req.params.id}`,
            });
        });
}