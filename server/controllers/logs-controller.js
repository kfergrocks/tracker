const { Exercise, Symptom, Trigger, Log } = require('../models');
const { handleErrors } = require('../utils/dbUtils');

module.exports = {
  async getLogKeys(req, res) {
    const logKeys = {};

    logKeys.exercises = await Exercise.findAll({ order: [['name', 'ASC']] });
    logKeys.symptoms = await Symptom.findAll({ order: [['name', 'ASC']] });
    logKeys.triggers = await Trigger.findAll({ order: [['name', 'ASC']] });

    res.status(200).json(logKeys);
  },

  async getLogs(req, res) {
    const logs = await Log.findAll({
      where: {
        user_id: req.body.user_id,
      },
      order: [['date', 'DESC']],
    });
    res.json(logs);
  },

  async addLogs(req, res) {
    console.log('addlogs');
    try {
      await Log.create({
        ...req.body,
        user_id: req.body.user_id,
        exercises: JSON.stringify(req.body.exercises),
        symptoms: JSON.stringify(req.body.symptoms),
        triggers: JSON.stringify(req.body.triggers),
      });
    } catch (e) {
      const errors = handleErrors(e);
      res.status(500).json(errors);
    }
    res.status(200).end();
  },
};
