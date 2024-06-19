const Survey = require('../models/Survey');

exports.saveSurvey = async (req, res) => {
  try {
    const { telegramId, ...surveyData } = req.body;
    const survey = new Survey({ telegramId, ...surveyData });
    await survey.save();
    res.status(201).json({ message: 'Survey saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
