const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: false,
        dialectOptions: process.env.DB_SSL === 'true' ? {
            ssl: {
                require: true,
                rejectUnauthorized: false // Common for self-signed certificates in dev/mvp
            }
        } : {}
    }
);

const connectDB = async () => {
    try {
        console.log(`Attempting to connect to database at ${process.env.DB_HOST}:${process.env.DB_PORT || 3306}...`);
        await sequelize.authenticate();
        console.log('MySQL Database connected successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        console.error('Connection Details (No Secrets):', {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            db: process.env.DB_NAME,
            ssl: process.env.DB_SSL
        });
    }
};

module.exports = { sequelize, connectDB };
