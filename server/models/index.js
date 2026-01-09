const User = require('./User');
const Place = require('./Place');
const Review = require('./Review');
const Transport = require('./Transport');
const Admin = require('./Admin');
const VisitorLog = require('./VisitorLog');
const Feedback = require('./Feedback');
const Bus = require('./Bus');
const Train = require('./Train');

// Associations
User.hasMany(Review, { foreignKey: 'userId', onDelete: 'CASCADE' });
Review.belongsTo(User, { foreignKey: 'userId' });

Place.hasMany(Review, { foreignKey: 'placeId', onDelete: 'CASCADE' });
Review.belongsTo(Place, { foreignKey: 'placeId' });

module.exports = {
    User,
    Place,
    Review,
    Transport,
    Admin,
    VisitorLog,
    Feedback,
    Bus,
    Train
};

