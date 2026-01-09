const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Bus = sequelize.define('Bus', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    route_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    from_city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    to_city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bus_type: {
        type: DataTypes.ENUM('Govt', 'Private'),
        allowNull: false
    },
    departure_time: {
        type: DataTypes.STRING,
        allowNull: false
    },
    arrival_time: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false
    },
    approximate_fare: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Bus;
