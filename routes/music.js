const express = require('express');
const { getRecentMusic, addToRecentMusic } = require('../Controllers/recentMusicControllers');
const { getFavoriteTracks, addToFavoriteTracks, removeFromFavorites } = require('../Controllers/favoriteMusicController');
const { getAllArtists, addToAllArtists } = require('../Controllers/allArtists');
const { setLanguage } = require('../Controllers/selectedLanguage');
const { getAllPlayListsByUser, createPlayListByUser, addTrackToThePlayListById, removeTrackFromPlaylistByTrackId, deletePlayListByPlayListId } = require('../Controllers/playlist');

const route = express.Router();

route.get('/recentlyPlayed', getRecentMusic);
route.post('/recentlyPlayed', addToRecentMusic);

route.get('/favorites/:userId', getFavoriteTracks);
route.post('/favorites', addToFavoriteTracks);
route.delete('/favorites/:songId', removeFromFavorites);

route.get('/allartists', getAllArtists);
route.post('/allartists', addToAllArtists);
route.post('/setLanguages', setLanguage);

//  Playlist routes
route.get('/getAllPlayListsByUser/:userId', getAllPlayListsByUser);
route.post('/createPlayListByUser', createPlayListByUser);
route.post('/addTrackToThePlayListById', addTrackToThePlayListById);
route.post('/removeTrackFromPlaylistByTrackId', removeTrackFromPlaylistByTrackId);
route.post('/deletePlayListByPlayListId', deletePlayListByPlayListId);



module.exports = route;