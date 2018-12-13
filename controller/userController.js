const db = require('../models');

module.exports = {
    findOne: (req, res) => {
        db.User
            .findOne({
                where: { fbId: req.params.id },
                include: [
                    {
                        model: db.Favorite,
                        include: [
                            {
                                model: db.FoodTruck,
                                include: [
                                    db.YelpReview
                                ]
                            }
                        ]
                    }
                ]
            })
            .then(foundUser => res.json(foundUser))
            .catch(err => res.status(422).json(err));
    },
    create: (req, res) => {
        db.User
            .create(req.body)
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err));
    },
    findOrCreate: (req, res) => {
        db.User
            .findOrCreate({ where: { fbId: req.params.id }, defaults: { role: "user" } })
            .then(result => res.json(result))
            .catch(err => res.status(422).json(err));
    }
}