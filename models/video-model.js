const Sequelize = require("sequelize");
const sequelize = require("../utils/db-helper");

const Video = sequelize.define("videos", {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false
    },
    publishTime: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    thumbs: {
        type: Sequelize.JSON,
    },
},
    {
        indexes: [
            { type: 'FULLTEXT', name: 'fulltext_search', fields: ['description', 'title'] }
        ]
    }
);

module.exports = Video;
