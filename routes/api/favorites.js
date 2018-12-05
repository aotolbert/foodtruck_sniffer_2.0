const router = require('express').Router();
const favoriteController = require('../../controller/favoriteController');
// Matches with "/api/favorites/:id" 
router
    .route('/:fbId')
    .get(favoriteController.findAll)
    .post(favoriteController.create)
router
    .route('/:fbId/:foodTruckId')
    .delete(favoriteController.destroy);
module.exports = router; 