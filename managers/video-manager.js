const { log, error } = require("../utils/log-helper");
const { Op, Sequelize, QueryTypes } = require("sequelize");
const videoModel = require('../models/video-model')
const sequelize = require('../utils/db-helper')

const getPagination = (page, size) => {
    const limit = size ? +size : 20;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: assets } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { limit, totalPages, currentPage, totalItems, assets };
};

exports.videoData = async (req) => {
    try {
        const { page, size } = req.query;
        const { limit, offset } = getPagination(page, size);
        const data = await videoModel.findAndCountAll({
            order: [["publishTime", "desc"]],
            limit: limit,
            offset: offset
        })
        const response = getPagingData(data, page, limit);
        return response;
    } catch (err) {
        console.error(err.message);
        error(req, err);
    }
}

exports.videoSearch = async (req) => {
    try {
        const { page, size, q } = req.query;
        const { limit, offset } = getPagination(page, size);
        // const data = await videoModel.findAndCountAll({
        //     where: {
        //         [Op.or]: [
        //             ['MATCH (title, description) AGAINST(? IN NATURAL LANGUAGE MODE)', [q]],
        //             // {
        //             //     title: { [Op.substring]: q },
        //             //     description: { [Op.substring]: q }
        //             // },
        //         ]
        //     }
        // })]
        // 
        const rows = await sequelize.query(`select * from videos where MATCH (title, description) AGAINST('${q}' IN NATURAL LANGUAGE MODE) ORDER BY publishTime DESC LIMIT ${limit} offset ${offset}`, { type: QueryTypes.SELECT });
        const count = await sequelize.query(`select count(*) as count from videos where MATCH (title, description) AGAINST('${q}' IN NATURAL LANGUAGE MODE) ORDER BY publishTime DESC LIMIT ${limit} offset ${offset}`, { type: QueryTypes.SELECT });
        const finalData = {
            'count': count[0].count,
            'rows': rows
        }
        const response = getPagingData(finalData, page, limit);
        return response;
    } catch (err) {
        console.error(err.message);
        error(req, err);
    }
}