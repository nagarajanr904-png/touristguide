const { Place } = require('./models');
const { sequelize } = require('./config/database');

const spots = [
    // Chennai
    { name: 'Marina Beach', city: 'Chennai', category: 'Beaches', description: 'One of the longest urban beaches in the world.', description_tamil: 'உலகின் மிக நீளமான நகர்ப்புற கடற்கரைகளில் ஒன்று.', latitude: 13.0445, longitude: 80.2824, rating: 4.5 },
    { name: 'Kapaleeshwarar Temple', city: 'Chennai', category: 'Temples', description: 'A 7th-century Dravidian temple dedicated to Lord Shiva.', description_tamil: 'சிவனுக்கு அர்ப்பணிக்கப்பட்ட 7-ஆம் நூற்றாண்டு திராவிடக் கோயில்.', latitude: 13.0336, longitude: 80.2697, rating: 4.8 },

    // Madurai
    { name: 'Meenakshi Amman Temple', city: 'Madurai', category: 'Temples', description: 'An iconic temple complex known for its exquisite architecture and gopurams.', description_tamil: 'அதன் நேர்த்தியான கட்டிடக்கலை மற்றும் கோபுரங்களுக்கு பெயர் பெற்ற ஒரு புகழ்பெற்ற கோயில் வளாகம்.', latitude: 9.9195, longitude: 78.1193, rating: 4.9 },

    // Coimbatore
    { name: 'Adiyogi Shiva Statue', city: 'Coimbatore', category: 'Nature & Waterfalls', description: 'A 112-foot tall statue of Shiva located at the Isha Yoga Center.', description_tamil: 'ஈஷா யோகா மையத்தில் அமைந்துள்ள 112 அடி உயர சிவன் சிலை.', latitude: 10.9769, longitude: 76.7350, rating: 4.9 },

    // Ooty
    { name: 'Government Botanical Garden', city: 'Ooty', category: 'Parks & Entertainment', description: 'Established in 1848, it features a fossil tree over 20 million years old.', description_tamil: '1848-ல் நிறுவப்பட்டது, இது 20 மில்லியன் ஆண்டுகள் பழமையான புதைபடிவ மரத்தைக் கொண்டுள்ளது.', latitude: 11.4172, longitude: 76.7118, rating: 4.7 },

    // Hidden Gems
    {
        name: 'Kolli Hills (Agaya Gangai)',
        city: 'Namakkal',
        category: 'Nature & Waterfalls',
        description: 'A mountain range famous for its 70 hair-raising bends and the Agaya Gangai waterfall.',
        description_tamil: '70 கொண்டை ஊசி வளைவுகள் மற்றும் ஆகாய கங்கை நீர்வீழ்ச்சிக்கு புகழ்பெற்ற மலைத்தொடர்.',
        latitude: 11.2485,
        longitude: 78.3385,
        rating: 4.6,
        isHiddenGem: true
    },
    {
        name: 'Pichavaram Mangrove Forest',
        city: 'Cuddalore',
        category: 'Nature & Waterfalls',
        description: 'The world\'s second largest mangrove forest, offering boat rides through narrow water canals.',
        description_tamil: 'உலகின் இரண்டாவது மிகப்பெரிய சதுப்புநிலக் காடு, குறுகிய நீர் கால்வாய்கள் வழியாக படகு சவாரிகளை வழங்குகிறது.',
        latitude: 11.4258,
        longitude: 79.7797,
        rating: 4.8,
        isHiddenGem: true
    },
    {
        name: 'Javadi Hills',
        city: 'Vellore',
        category: 'Hill Stations',
        description: 'An extension of the Eastern Ghats, known for its sandalwood and fruit orchards.',
        description_tamil: 'கிழக்குத் தொடர்ச்சி மலையின் விரிவாக்கம், சந்தன மரம் மற்றும் பழத்தோட்டங்களுக்கு பெயர் பெற்றது.',
        latitude: 12.5833,
        longitude: 78.9167,
        rating: 4.3,
        isHiddenGem: true
    },
    {
        name: 'Dhanushkodi Ghost Town',
        city: 'Rameswaram',
        category: 'Historical Monuments',
        description: 'An abandoned town at the south-eastern tip of Pamban Island, destroyed in the 1964 cyclone.',
        description_tamil: '1964 சூறாவளியால் அழிக்கப்பட்ட பாம்பன் தீவின் தென்கிழக்கு முனையில் கைவிடப்பட்ட ஒரு நகரம்.',
        latitude: 9.1486,
        longitude: 79.4447,
        rating: 4.7,
        isHiddenGem: true
    }
];

const seedSpots = async () => {
    try {
        await sequelize.sync({ alter: true });
        await Place.destroy({ where: {} });
        await Place.bulkCreate(spots);
        console.log('Tourist spots and Hidden Gems seeded successfully (No Images)!');
        process.exit();
    } catch (error) {
        console.error('Error seeding spots:', error);
        process.exit(1);
    }
};

seedSpots();
