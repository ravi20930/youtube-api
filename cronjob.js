const schedule = require("node-schedule");
const youtube = require('./utils/youtube-helper');
const interval = process.env.VIDEO_FETCH_INTERVAL_IN_MINUTES
const Video = require('./models/video-model')

const job = schedule.scheduleJob(
    "*/" + interval + " * * * *",
    async () => {
        let count = await Video.count();
        console.log(count);
        if (count > 0) {
            let deleteOldData = await Video.destroy({ truncate: true });
        }
        const service = youtube.videos.list({
            part: 'snippet',
            chart: process.env.CHART,
            regionCode: process.env.REGION_CODE,
            videoCategoryId: process.env.CATEGORY_ID,
            maxResults: process.env.MAX_RESULTS
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

    }
);