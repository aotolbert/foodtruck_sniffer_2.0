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
            .create(req.body)
            .then(favorite => res.json(favorite))
            .catch(err => res.status(422).json(err));
    },

    destroy: (req, res) => {
        db.Favorite
            .destroy({ where: { id: req.params.id } })
            .then(destroyedFavorite => res.json(destroyedFavorite))
            .catch(err => res.status(422).json(err));
    }
}