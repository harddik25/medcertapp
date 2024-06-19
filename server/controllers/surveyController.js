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
exports.getLatestSurveyId = async (req, res) => {
  try {
    const { userId } = req.params;
    const latestSurvey = await Survey.findOne({ userId }).sort({ createdAt: -1 }).select('_id');

    if (!latestSurvey) {
      return res.status(404).json({ success: false, message: 'Survey not found' });
    }

    res.status(200).json({ success: true, surveyId: latestSurvey._id });
  } catch (error) {
    console.error('Error fetching latest survey ID:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
