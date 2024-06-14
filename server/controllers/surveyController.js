const Survey = require('../models/Survey');

exports.createSurvey = async (req, res) => {
  const survey = new Survey(req.body);
  try {
    await survey.save();
    res.status(201).send(survey);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find({});
    res.send({ surveys });
  } catch (error) {
    res.status(500).send(error);
  }
};
