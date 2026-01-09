const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB, sequelize } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/places', require('./routes/placeRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));
app.use('/api/transport', require('./routes/transportRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));

// Basic Route for testing
app.get('/', (req, res) => {
    res.send('Tourist Guide API is running');
});

// Start Server
const startServer = async () => {
    await connectDB();
    // Sync models
    await sequelize.sync({ force: false });

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
