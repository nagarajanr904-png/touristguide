const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Transport = sequelize.define('Transport', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: DataTypes.ENUM('Bus', 'Train'),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING, // "KPN Travels" or "Vaigai Express"
        allowNull: false
    },
    source: {
        type: DataTypes.STRING,
        allowNull: false
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false
    },
    departureTime: {
        type: DataTypes.STRING // "10:30 AM"
    },
    duration: {
        type: DataTypes.STRING // "6h 30m"
    },
    cost: {
        type: DataTypes.INTEGER // e.g. 500
    },
    classType: {
        type: DataTypes.STRING // "Sleeper", "AC", "2S" (For Train) - Optional for Bus
    }
});

module.exports = Transport;
