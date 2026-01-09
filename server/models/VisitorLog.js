const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const VisitorLog = sequelize.define('VisitorLog', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    page_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    searched_city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    device_type: {
        type: DataTypes.ENUM('mobile', 'desktop'),
        allowNull: false
    },
    ip_address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    visit_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false
});

module.exports = VisitorLog;
