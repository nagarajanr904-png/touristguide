const { VisitorLog } = require('../models');

const trackVisitor = async (req, res, next) => {
    // Only track GET requests to main pages (not API calls unless specified)
    // However, the requirement says "Track every page visit automatically"
    // Usually this is done via a specific endpoint call from the frontend or a global middleware.
    // Given the requirement, I'll log if it's an API call that represents a page view or a search.

    // For this project, we can log specific routes or use it globally but filter.
    // Let's implement a middleware that can be used on specific routes or globally.

    const pageName = req.query.page || req.path;
    const city = req.query.city || null;
    const ua = req.get('User-Agent') || '';
    const isMobile = /Mobile|Android|iPhone/i.test(ua);

    // We only log if it's not a static file or a background API that shouldn't count as a "visit"
    // But since the frontend will call this, let's make it an endpoint or a specific middleware for page load APIs.

    next();
};

const logVisit = async (req, res, next) => {
    try {
        const { page_name, searched_city } = req.body;
        const ua = req.get('User-Agent') || '';
        const device_type = /Mobile|Android|iP(hone|od|ad)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua) ? 'mobile' : 'desktop';
        const ip_address = req.ip || req.connection.remoteAddress;

        await VisitorLog.create({
            page_name: page_name || 'Home',
            searched_city: searched_city || null,
            device_type,
            ip_address: ip_address === '::1' ? '127.0.0.1' : ip_address
        });
    } catch (error) {
        console.error('Visitor Log Error:', error);
    }
    if (next) next();
};

module.exports = { trackVisitor, logVisit };
