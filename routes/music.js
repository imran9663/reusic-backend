const express = require('express');
const { verifyToken } = require('../middleware/verifyToken');
const { getRecentMusic, addToRecentMusic } = require('../Controllers/recentMusicControllers');
const { getFavoriteTracks, addToFavoriteTracks } = require('../Controllers/favoriteMusicController');

const route = express.Router();

route.get('/recentlyPlayed', verifyToken, getRecentMusic);
route.post('/recentlyPlayed', verifyToken, addToRecentMusic);
route.get('/favorites', verifyToken, getFavoriteTracks);
route.post('/favorites', verifyToken, addToFavoriteTracks);


module.exports = route;