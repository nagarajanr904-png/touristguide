const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Train = sequelize.define('Train', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    train_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    train_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    from_station: {
        type: DataTypes.STRING,
        allowNull: false
    },
    to_station: {
        type: DataTypes.STRING,
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
    classes_available: {
        type: DataTypes.STRING, // e.g. "SL, 3A, 2A"
        allowNull: false
    }
});

module.exports = Train;
