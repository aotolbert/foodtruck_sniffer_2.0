const db = require('../models');

module.exports = {
    findOne: (req, res) => {
        db.User
            .findOne({ where: { fbId: req.params.id }})
            .then(foundUser => res.json(foundUser))
            .catch(err => res.status(422).json(err));
    },
    create: (req, res) => {
        db.User
          .create(req.body)
          .then(dbUser => res.json(dbUser))
          .catch(err => res.status(422).json(err));
      },
}