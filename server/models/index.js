const User = require('./user');
const Log = require('./log');
const Exercise = require('./exercise');
const Symptom = require('./symptom');
const Trigger = require('./trigger');

User.hasMany(Log, {
  foreignKey: 'user_id',
});
Log.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = {
  User,
  Log,
  Exercise,
  Symptom,
  Trigger,
};
