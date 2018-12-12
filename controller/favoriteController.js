const db = require('../models');

module.exports = {
    findAll: (req, res) => {
        db.Favorite
            .findAll({ where: { UserFbId: req.params.fbId },include: [ {
                model: db.FoodTruck,
                include: [
                    db.YelpReview
                ]
            } ] })
            .then(userFavorites => res.json(userFavorites))
            .catch(err => res.status(422).json(err));
    },

    create: (req, res) => {
        db.Favorite
            .findOrCreate({where: {FoodTruckId: req.params.FoodTruckId, UserFbId: req.params.fbId}})
            .then(favorite => res.json(favorite))
            .catch(err => res.status(422).json(err));
    },

    destroy: (req, res) => {
        db.Favorite
            .destroy({where: { FoodTruckId: req.params.FoodTruckId, UserFbId: req.params.fbId } })
            .then(destroyedFavorite => res.json(destroyedFavorite))
            .catch(err => res.status(422).json(err));
    }
}