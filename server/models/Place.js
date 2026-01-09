const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Place = sequelize.define('Place', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    description_tamil: {
        type: DataTypes.TEXT
    },
    location: {
        type: DataTypes.STRING, // "lat,lng"
        allowNull: true
    },
    latitude: {
        type: DataTypes.FLOAT
    },
    longitude: {
        type: DataTypes.FLOAT
    },
    category: {
        type: DataTypes.STRING // "Temple", "History", "Nature", "Entertainment"
    },
    isHiddenGem: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    best_time: {
        type: DataTypes.TEXT
    },
    travel_tips: {
        type: DataTypes.TEXT
    },
    gemini_explanation: {
        type: DataTypes.TEXT
    }
});

module.exports = Place;
