var express = require('express');
var router = express.Router();
var videoController = require('../controllers/video-controller');
router.get('/data', videoController.getVideoData);
router.get('/search', videoController.searchVideo);

module.exports = router;
