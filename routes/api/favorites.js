const router = require('express').Router();
const favoriteController = require('../../controller/favoriteController');
// Matches with "/api/favorites/:id" 
router
    .route('/:fbId')
    .get(favoriteController.findAll)
//returns all favorites for a user with firebase id fbId
router
    .route('/:fbId/:FoodTruckId')
    .delete(favoriteController.destroy)
    .post(favoriteController.create)
//manages a user's particular favorites
module.exports = router; 