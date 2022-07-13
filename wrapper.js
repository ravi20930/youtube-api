const youtube = require('./utils/youtube-helper');

exports.getCategoryList = async () => {
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
            console.log('No category found.');
        } else {
            console.log(cats);
        }
    });
}

exports.search = async (keyword) => {
    var service = await youtube.search.list({
        part: 'snippet',
        regionCode: 'in',
        q: keyword,
        type: 'video',
        maxResults: '3'
    }, function (err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return false;
        }
        var channels = response.data.items;
        if (channels.length == 0) {
            console.log('Nothing found.');
            return true;
        } else {
            console.log(response);
            return true;
        }
    });
}

exports.getVideos = async () => {
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
        var videos = response.data.items;
        if (videos.length == 0) {
            console.log('No video found.');
        } else {
            console.log(videos);
        }
    });
}
