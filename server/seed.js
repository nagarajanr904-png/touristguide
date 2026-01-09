const { sequelize, Place, Transport } = require('./models');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); // WARNING: Resets DB
        console.log('Database synced.');

        // Places
        await Place.bulkCreate([
            {
                name: "Meenakshi Amman Temple",
                city: "Madurai",
                description: "A historic Hindu temple located on the southern bank of the Vaigai River.",
                description_tamil: "வைகை ஆற்றின் தென்கரையில் அமைந்துள்ள வரலாற்று சிறப்புமிக்க இந்துக் கோவில்.",
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
                description_tamil: "மன்னர் திருமலை நாயக்கரால் கட்டப்பட்ட 17 ஆம் நூற்றாண்டு அரண்மனை.",
                location: "9.9155,78.1237",
                latitude: 9.9155,
                longitude: 78.1237,
                category: "History",
                isHiddenGem: false,
                rating: 4.5,
                image_url: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Thirumalai_Nayakkar_Mahal_Madurai.jpg"
            },
            {
                name: "Samanar Hills",
                city: "Madurai",
                description: "Ancient Jain caves with carvings and inscriptions, offering scenic views.",
                description_tamil: "சிற்பங்கள் மற்றும் கல்வெட்டுகளுடன் கூடிய பழமையான சமணக் குகைகள்.",
                location: "9.9150,78.0500",
                latitude: 9.9150,
                longitude: 78.0500,
                category: "History",
                isHiddenGem: true,
                rating: 4.6,
                image_url: "https://upload.wikimedia.org/wikipedia/commons/8/87/Samanar_Malai.jpg"
            },
            {
                name: "Marina Beach",
                city: "Chennai",
                description: "The longest natural urban beach in the country.",
                description_tamil: "நாட்டின் மிக நீண்ட இயற்கையான நகர்ப்புற கடற்கரை.",
                location: "13.0500,80.2824",
                latitude: 13.0500,
                longitude: 80.2824,
                category: "Nature",
                isHiddenGem: false,
                rating: 4.4,
                image_url: "https://upload.wikimedia.org/wikipedia/commons/2/25/Marina_Beach_Chennai.jpg"
            },
            {
                name: "Broken Bridge",
                city: "Chennai",
                description: "A partially collapsed bridge in Adyar, popular for sunsets but less crowded.",
                description_tamil: "அடையாறில் உள்ள சிதிலமடைந்த பாலம், சூரிய அஸ்தமனத்திற்கு பிரபலமானது.",
                location: "13.0116,80.2747",
                latitude: 13.0116,
                longitude: 80.2747,
                category: "Nature",
                isHiddenGem: true,
                rating: 4.2,
                image_url: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Broken_Bridge_Chennai.jpg"
            }
        ]);

        // Transport
        await Transport.bulkCreate([
            {
                type: "Bus",
                name: "KPN Travels",
                source: "Chennai",
                destination: "Madurai",
                departureTime: "10:00 PM",
                duration: "8h 00m",
                cost: 850,
                classType: "AC Sleeper"
            },
            {
                type: "Bus",
                name: "SETC (Govt)",
                source: "Chennai",
                destination: "Madurai",
                departureTime: "08:30 PM",
                duration: "9h 30m",
                cost: 450,
                classType: "Ultra Deluxe"
            },
            {
                type: "Train",
                name: "Vaigai Express (12635)",
                source: "Chennai Egmore",
                destination: "Madurai Jn",
                departureTime: "01:40 PM",
                duration: "7h 30m",
                cost: 200,
                classType: "2S"
            },
            {
                type: "Train",
                name: "Pandian Express (12637)",
                source: "Chennai Egmore",
                destination: "Madurai Jn",
                departureTime: "09:40 PM",
                duration: "8h 00m",
                cost: 480,
                classType: "SL"
            }
        ]);

        console.log('Seed data inserted.');
        process.exit();
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedDatabase();
