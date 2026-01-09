const { Feedback } = require('../models');

exports.submitFeedback = async (req, res) => {
    const { name, email, rating, message, page_name } = req.body;

    try {
        const feedback = await Feedback.create({
            name,
            email,
            rating,
            message,
            page_name
        });
        res.status(201).json(feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllFeedback = async (req, res) => {
    const { rating } = req.query;
    const where = {};
    if (rating) {
        where.rating = rating;
    }

    try {
        const feedback = await Feedback.findAll({
            where,
            order: [['created_at', 'DESC']]
        });
        res.json(feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findByPk(req.params.id);
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        await feedback.destroy();
        res.json({ message: 'Feedback deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
