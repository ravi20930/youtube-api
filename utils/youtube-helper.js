require('dotenv').config();
const { google } = require('googleapis');

let counter = 0;
const apiKeyArray = [process.env.API_KEY, process.env.API_KEY1, process.env.API_KEY2];
const youtube = google.youtube({
    version: 'v3',
    auth: apiKeyArray[counter]
});

// const validateApiKey = async () => {
//     var service = await mYoutube.search.list({
//         part: 'snippet',
//         regionCode: 'in',
//         q: 'API',
//         type: 'video',
//         maxResults: '1'
//     }, function (err, response) {
//         if (err) {
//             return false;
//         }
//         if (response.data.items.length == 0) {
//             return true;
//         } else {
//             return true;
//         }
//     });
// }

// const mYoutube = () => {
//     if (!validateApiKey) {
//         counter = (counter + 1) % apiKeyArray.length
//         console.log('api key changed');
//         return youtube;
//     }
//     return youtube;
// }

module.exports = youtube;