const Survey = require('../models/Survey');

exports.saveSurvey = async (req, res) => {
  try {
    const surveyData = req.body;
    const survey = new Survey(surveyData);
    await survey.save();
    res.status(201).json({ message: 'Survey saved successfully' });
  } catch (error) {
    console.error('Error saving survey data:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

