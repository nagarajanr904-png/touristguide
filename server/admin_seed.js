const { Admin } = require('./models');
const { connectDB, sequelize } = require('./config/database');

const seedAdmin = async () => {
    try {
        await connectDB();
        await sequelize.sync({ force: false });

        const adminExists = await Admin.findOne({ where: { email: 'admin@tourist.com' } });

        if (!adminExists) {
            await Admin.create({
                username: 'admin',
                email: 'admin@tourist.com',
                password: 'adminpassword123'
            });
            console.log('Admin account created successfully');
        } else {
            console.log('Admin account already exists');
        }

        process.exit();
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
