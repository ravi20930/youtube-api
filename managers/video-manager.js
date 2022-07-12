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
    const assets = data;
    const totalItems = data.length;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { limit, totalPages, currentPage, totalItems, assets };
};

exports.videoData = async (req) => {
    try {
        const { page, size } = req.query;
        const { limit, offset } = getPagination(page, size);
        const data = await videoModel.findAll({
            limit: limit,
            offset: offset,
            // where: {
            //     isAudited: 0
            // }
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
        // const data = await videoModel.findAll({
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
        const data = await sequelize.query(`select * from videos where MATCH (title, description) AGAINST('${q}' IN NATURAL LANGUAGE MODE) LIMIT ${limit} offset ${offset}`, { type: QueryTypes.SELECT });
        const response = getPagingData(data, page, limit);
        return response;
    } catch (err) {
        console.error(err.message);
        error(req, err);
    }
}