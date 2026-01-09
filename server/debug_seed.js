const { Place } = require('./models');
const { sequelize } = require('./config/database');

async function debugSeed() {
    try {
        await sequelize.sync({ alter: true });
        await Place.create({
            name: 'Debug Spot',
            city: 'Chennai',
            latitude: 13.0,
            longitude: 80.0
        });
        console.log('Success');
    } catch (e) {
        console.error('FAILED:', e.message);
        if (e.errors) e.errors.forEach(err => console.error('Error field:', err.path));
    }
    process.exit();
}
debugSeed();
