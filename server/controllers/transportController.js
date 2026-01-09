const { Bus, Train } = require('../models');
const { Op } = require('sequelize');

exports.getBuses = async (req, res) => {
    try {
        const { from, to } = req.query;
        let whereClause = {};

        if (from) whereClause.from_city = { [Op.like]: `%${from}%` };
        if (to) whereClause.to_city = { [Op.like]: `%${to}%` };

        const buses = await Bus.findAll({ where: whereClause });
        res.json(buses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTrains = async (req, res) => {
    try {
        const { from, to } = req.query;
        let whereClause = {};

        if (from) whereClause.from_station = { [Op.like]: `%${from}%` };
        if (to) whereClause.to_station = { [Op.like]: `%${to}%` };

        const trains = await Train.findAll({ where: whereClause });
        res.json(trains);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Keeping for legacy support if needed, but updating to use new models
exports.getTransport = async (req, res) => {
    try {
        const { source, destination, type } = req.query;
        if (type === 'Bus') {
            req.query.from = source;
            req.query.to = destination;
            return exports.getBuses(req, res);
        } else if (type === 'Train') {
            req.query.from = source;
            req.query.to = destination;
            return exports.getTrains(req, res);
        }
        res.json([]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
