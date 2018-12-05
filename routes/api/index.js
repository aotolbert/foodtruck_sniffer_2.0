const router = require('express').Router();
const truckRoutes = require('./trucks');
const yelpRoutes = require('./yelp');
const favoriteRoutes = require('./favorites');
const userRoutes = require('./users');
router.use('/trucks', truckRoutes);
router.use('/yelpreviews', yelpRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/users', userRoutes);
module.exports = router;