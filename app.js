require('dotenv').config();
const { google } = require('googleapis');
const { sequelize } = require('./utils/db-helper')
const express = require("express");
const cors = require("cors");

// const accountRouter = require("./routes/account");

const app = express();

app.use(express.json());
app.use(cors({
    origin: '*',
    credentials: true
}));

// app.use("/account", accountRouter);
// app.use("/", (req, res) => {
//   res.json({ message: "Hello!" })
// })

// sequelize
//     .sync({ alter: false })
//     .then((res) => {
//         app.listen(8080, () => {
//             console.log("Server running on http://localhost:8080");
//         });
//     })
//     .catch((err) => {
//         console.error(err);
//     });

// Each API may support multiple versions. With this sample, we're getting
// v3 of the blogger API, and using an API key to authenticate.
const youtube = google.youtube({
    version: 'v3',
    auth: process.env.API_KEY
});

async function getVideos() {
    var service = await youtube.videos.list({
        part: 'snippet',
        chart: 'mostPopular',
        regionCode: 'in',
        videoCategoryId: '17'
    }, function (err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        var videos = response.data.items;
        if (videos.length == 0) {
            console.log('No video found.');
        } else {
            console.log(videos);
        }
    });
}

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

// getChannel();
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
            console.log(response.data.items);
            console.log('This channel\'s ID is %s. Its title is \'%s\', and ' +
                'it has %s views.',
                channels[0].id,
                // channels[0].snippet.title,
                // channels[0].statistics.viewCount
            );
        }
    });
}

search('cricket');