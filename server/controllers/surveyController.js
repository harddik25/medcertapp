// controllers/surveyController.js
const Survey = require('../models/Survey');

exports.saveSurvey = async (req, res) => {
  try {
    const { userId, surveyData } = req.body;

    const newSurvey = new Survey({
      userId,
      surveyData,
    });

    await newSurvey.save();
    res.status(201).json({ success: true, survey: newSurvey });
  } catch (error) {
    console.error('Ошибка при сохранении данных опроса', error);
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};
