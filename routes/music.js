const express = require('express');
const { verifyToken } = require('../middleware/verifyToken');
const { getRecentMusic, addToRecentMusic } = require('../Controllers/recentMusicControllers');
const { getFavoriteTracks, addToFavoriteTracks } = require('../Controllers/favoriteMusicController');
const { getAllArtists, addToAllArtists } = require('../Controllers/allArtists');
const { setLanguage } = require('../Controllers/selectedLanguage');

const route = express.Router();

route.get('/recentlyPlayed', verifyToken, getRecentMusic);
route.post('/recentlyPlayed', verifyToken, addToRecentMusic);

route.get('/favorites', verifyToken, getFavoriteTracks);
route.post('/favorites', verifyToken, addToFavoriteTracks);

route.get('/allartists', verifyToken, getAllArtists);
route.post('/allartists', verifyToken, addToAllArtists);
route.post('/setLanguages', verifyToken, setLanguage);


module.exports = route;