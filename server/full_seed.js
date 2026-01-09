const { sequelize } = require('./config/database');
const User = require('./models/User');
const Place = require('./models/Place');
const Transport = require('./models/Transport');
const Admin = require('./models/Admin');
const Review = require('./models/Review');

const fullSeed = async () => {
    try {
        // Disable foreign key checks to allow force sync
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        await sequelize.sync({ force: true });
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

        console.log('Database synced successfully.');

        // 1. Create Admin
        await Admin.create({
            username: 'admin',
            email: 'admin@tourist.com',
            password: 'adminpassword123'
        });
        console.log('Admin account created.');

        // 2. Create Places
        await Place.bulkCreate([
            {
                name: "Meenakshi Amman Temple",
                city: "Madurai",
                description: "A historic Hindu temple located on the southern bank of the Vaigai River.",
                location: "9.9195,78.1193",
                latitude: 9.9195,
                longitude: 78.1193,
                category: "Temples",
                isHiddenGem: false,
                rating: 4.8,
                image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Madurai_Meenakshi_Amman_Temple_West_Tower.jpg/800px-Madurai_Meenakshi_Amman_Temple_West_Tower.jpg"
            },
            {
                name: "Thirumalai Nayakkar Mahal",
                city: "Madurai",
                description: "A 17th-century palace erected by King Tirumala Nayaka.",
                location: "9.9155,78.1237",
                latitude: 9.9155,
                longitude: 78.1237,
                category: "History",
                isHiddenGem: false,
                rating: 4.5,
                image_url: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Thirumalai_Nayakkar_Mahal_Madurai.jpg"
            },
            {
                name: "Marina Beach",
                city: "Chennai",
                description: "The longest natural urban beach in the country.",
                location: "13.0500,80.2824",
                latitude: 13.0500,
                longitude: 80.2824,
                category: "Nature",
                isHiddenGem: false,
                rating: 4.4,
                image_url: "https://upload.wikimedia.org/wikipedia/commons/2/25/Marina_Beach_Chennai.jpg"
            },
            {
                name: "Arignar Anna Zoological Park",
                city: "Chennai",
                description: "One of the largest zoological parks in South East Asia.",
                location: "12.8792,80.0817",
                latitude: 12.8792,
                longitude: 80.0817,
                category: "Nature",
                isHiddenGem: false,
                rating: 4.3,
                image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Vandalur_zoo_safari.jpg/800px-Vandalur_zoo_safari.jpg"
            }
        ]);
        console.log('Places seeded.');

        console.log('--- SEEDING COMPLETE ---');
        process.exit();
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

fullSeed();
