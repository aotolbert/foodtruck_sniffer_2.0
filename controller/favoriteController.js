const db = require('../models');

module.exports = {
    findAll: (req, res) => {
        db.Favorite
            .findAll({ where: { UserId: req.params.userId } })
            .then(userFavorites => res.json(userFavorites))
            .catch(err => res.status(422).json(err));
    },

    create: (req, res) => {
        db.Favorite
            .create({FoodTruckId: req.params.FoodTruckId, UserId: req.params.userId})
            .then(favorite => res.json(favorite))
            .catch(err => res.status(422).json(err));
    },

    destroy: (req, res) => {
        db.Favorite
            .destroy({ where: { FoodTruckId: req.params.FoodTruckId, UserId: req.params.userId } })
            .then(destroyedFavorite => res.json(destroyedFavorite))
            .catch(err => res.status(422).json(err));
    }
}