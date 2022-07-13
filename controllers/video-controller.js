const videoManager = require("../managers/video-manager");
const { log, error } = require("../utils/log-helper");

exports.getVideoData = async (req, res) => {
    try {
        log('fetching videos in the database...')
        const data = await videoManager.videoData(req);
        log('successfully fetched videos from the database.')
        return res.status(200).send(data);
    } catch (err) {
        log('some error occurred, check error logs.')
        error(req, err);
        console.error(err);
        return res.send({
            status: 400,
            message: "failed to fetch videos.",
            devMessage: err.message,
        });
    }
}

exports.searchVideo = async (req, res) => {
    try {
        log('searching for similar videos in the database...')
        const data = await videoManager.videoSearch(req);
        log('successfully searched similar videos from the database.')
        return res.status(200).send(data);
    } catch (err) {
        log('some error occurred, check error logs.')
        error(req, err);
        console.error(err);
        return res.send({
            status: 400,
            message: "Failed to search video.",
            devMessage: err.message,
        });
    }
}