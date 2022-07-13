require('dotenv').config();
const { google } = require('googleapis');
const port = process.env.PORT || 3000;
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
    .sync({ alter: true })
    .then((res) => {
        app.listen(port, () => {
            console.log('server running on port: ' + port);
        });
    })
    .catch((err) => {
        console.error(err);
    });