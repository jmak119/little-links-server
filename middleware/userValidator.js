const knex = require('knex')(require('../knexfile'));

const validateUser = (req, res, next) => {
    
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({
            message: "User requires name, email, and password."
        })
    }

    // validate unique email
    const uniqueEmailQuery = knex("user")
        .where({email: req.body.email});

    const isUpdate = req.params?.id;
    if (isUpdate) {
        uniqueEmailQuery.andWehre("id", "!=", req.params.id);
    }

    uniqueEmailQuery
        .then((users) => {
            if (users.length !== 0) {
                return res.status(400).json({
                    message: "Email is already in use."
                });
            }
            next();
        })
        .catch((error)  => {
            return res.status(500).json({
                message: "Unable to validate user modification",
                error
            })
        });
}

module.exports = {
    validateUser
};


