const schedule = require("node-schedule");
const { google } = require('googleapis');
const interval = process.env.VIDEO_FETCH_INTERVAL_IN_MINUTES
const Video = require('./models/video-model')
const youtube = google.youtube({
    version: 'v3',
    auth: process.env.API_KEY
});
const job = schedule.scheduleJob(
    "*/" + interval + " * * * *",
    async () => {
        let deleteOldData = await Video.destroy({ truncate: true }).then(() => {
            const service = youtube.videos.list({
                part: 'snippet',
                chart: 'mostPopular',
                regionCode: 'in',
                videoCategoryId: '17',
                maxResults: '50'
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
                            console.log('db updated');
                        })
                            .catch(function (error) {
                                console.log(error);
                            });
                    } catch (err) {
                        console.log(err);
                    }
                }
            });
        });
    }
);