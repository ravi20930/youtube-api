const Sequelize = require("sequelize");
const sequelize = require("../utils/db-helper");

const Video = sequelize.define("videos", {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
    },
    message: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    from: Sequelize.STRING,
    type: {
        type: Sequelize.STRING,
        defaultValue: "MESSAGE", //MESSAGE || DOCUMENT
    },
    documentUrl: {
        type: Sequelize.TEXT,
    },
},
    {
        indexes: [
            {
                unique: false,
                fields: ['message']
            },
            {
                name: 'title_index',
                using: 'BTREE',
                fields: [
                    'message',
                    {
                        name: 'title',
                        collate: 'en_US',
                        order: 'DESC',
                        length: 5
                    }
                ]
            }
        ]
    }
);

module.exports = Video;
