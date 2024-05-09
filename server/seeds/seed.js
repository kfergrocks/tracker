const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');
const { User, Log, Symptom, Exercise, Trigger } = require('../models');
const symptoms = require('./symptons.json');
const exercises = require('./exercises.json');
const triggers = require('./triggers.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  const pwd = await bcrypt.hash('Password123!', 10);
  await User.create({
    email: 'kfergrocks@gmail.com',
    password: pwd,
    fName: 'Kevin',
    lName: 'Ferguson',
    dob: '06/16/1980',
  });
  await Symptom.bulkCreate(symptoms);
  await Trigger.bulkCreate(triggers);
  await Exercise.bulkCreate(exercises);

  process.exit(0);
};

seedDatabase();
