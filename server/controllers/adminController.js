const { Admin, VisitorLog, Feedback } = require('../models');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

exports.adminLogin = async (req, res) => {
    try {
        console.log('--- ADMIN LOGIN ATTEMPT ---');
        console.log('Request body:', req.body);

        const { username, password } = req.body;

        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        }

        // Extremely simple lookup to avoid any Op.or issues
        const admin = await Admin.findOne({
            where: { username: username },
            logging: console.log
        });

        if (!admin) {
            console.log('--- LOGIN FAILED: Admin not found for username:', username);
            const allAdmins = await Admin.findAll({ attributes: ['username', 'email'] });
            console.log('Available admins in DB:', allAdmins.map(a => a.username));
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isMatch = await admin.matchPassword(password);
        if (!isMatch) {
            console.log('Password mismatch for:', username);
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        console.log('Login successful for:', username);
        res.json({
            _id: admin.id,
            username: admin.username,
            email: admin.email,
            token: generateToken(admin.id)
        });
    } catch (error) {
        console.error('CRITICAL LOGIN ERROR:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.getDashboardStats = async (req, res) => {
    try {
        const totalVisitors = await VisitorLog.count();
        const totalFeedback = await Feedback.count();

        // Most visited pages
        const topPages = await VisitorLog.findAll({
            attributes: [
                'page_name',
                [VisitorLog.sequelize.fn('COUNT', VisitorLog.sequelize.col('page_name')), 'count']
            ],
            group: ['page_name'],
            order: [[VisitorLog.sequelize.literal('count'), 'DESC']],
            limit: 5
        });

        // Device stats
        const deviceStats = await VisitorLog.findAll({
            attributes: [
                'device_type',
                [VisitorLog.sequelize.fn('COUNT', VisitorLog.sequelize.col('device_type')), 'count']
            ],
            group: ['device_type']
        });

        res.json({
            totalVisitors,
            totalFeedback,
            topPages,
            deviceStats
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getVisitorLogs = async (req, res) => {
    try {
        const logs = await VisitorLog.findAll({
            order: [['visit_time', 'DESC']],
            limit: 100
        });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.logVisitor = async (req, res) => {
    const { page_name, searched_city } = req.body;
    const ua = req.get('User-Agent') || '';
    const device_type = /Mobile|Android|iP(hone|od|ad)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua) ? 'mobile' : 'desktop';
    const ip_address = req.ip || req.connection.remoteAddress;

    try {
        await VisitorLog.create({
            page_name: page_name || 'Home',
            searched_city: searched_city || null,
            device_type,
            ip_address: ip_address === '::1' ? '127.0.0.1' : ip_address
        });
        res.status(201).json({ message: 'Visit logged' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
