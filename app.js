require('dotenv').config();
const { google } = require('googleapis');
const port = process.env.port || 3000;
const Video = require('./models/video-model')
const morgan = require('morgan');
const sequelize = require('./utils/db-helper')
const express = require("express");
const cors = require("cors");
var cronjob = require("./cronjob");
const videoRouter = require('./routes/video-routes')


const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({
    origin: '*',
    credentials: true
}));

app.use("/video", videoRouter);

sequelize
    .sync({ alter: false })
    .then((res) => {
        app.listen(port, () => {
            console.log('server running on port: ' + port);
        });
    })
    .catch((err) => {
        console.error(err);
    });

const youtube = google.youtube({
    version: 'v3',
    auth: process.env.API_KEY
});

getCategoryList = async () => {
    var service = await youtube.videoCategories.list({
        part: 'snippet',
        regionCode: 'in',
    }, function (err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        var cats = response.data.items;
        if (cats.length == 0) {
            console.log('No channel found.');
        } else {
            console.log(cats);
        }
    });
}
// getCategoryList();

search = async (keyword) => {
    var service = await youtube.search.list({
        part: 'snippet',
        regionCode: 'in',
        q: keyword,
        type: 'video',
        maxResults: '3'
    }, function (err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        var channels = response.data.items;
        if (channels.length == 0) {
            console.log('No channel found.');
        } else {
            console.log(response);
        }
    });
}

// search('cricket rohit hh oy');

getVideos = async () => {
    const service = await youtube.videos.list({
        part: 'snippet',
        chart: 'mostPopular',
        regionCode: 'in',
        videoCategoryId: '17',
        maxResults: '3'
    }, async (err, response) => {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        const videos = response.data.items;
        if (videos.length == 0) {
            console.log('No video found.');
        } else {
            try {
                let dataArray = [];
                let array = videos.forEach(async (data) => {
                    dataArray.push({
                        "thumbs": data.snippet.thumbnails,
                        "title": data.snippet.title,
                        "description": data.snippet.description.substring(0, 255),
                        "publishTime": data.snippet.publishedAt
                    })
                });
                let insertData = await Video.bulkCreate(dataArray, { returning: true }).then(function (response) {
                    console.log(response);
                })
                    .catch(function (error) {
                        console.log(error);
                    });
            } catch (err) {
                console.log(err);
            }
        }
    });
}
// getVideos();