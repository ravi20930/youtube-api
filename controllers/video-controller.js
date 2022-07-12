const videoManager = require("../managers/video-manager");
const { log, error } = require("../utils/log-helper");

exports.getVideoData = async (req, res) => {
    try {
        const data = await videoManager.videoData(req);
        return res.status(200).send(data);
    } catch (err) {
        error(req, err);
        console.error(err);
        return res.send({
            status: 400,
            message: "Failed to fetch video data.",
            devMessage: err.message,
        });
    }
}

exports.searchVideo = async (req, res) => {
    try {
        const data = await videoManager.videoSearch(req);
        return res.status(200).send(data);
    } catch (err) {
        error(req, err);
        console.error(err);
        return res.send({
            status: 400,
            message: "Failed to search video.",
            devMessage: err.message,
        });
    }
}