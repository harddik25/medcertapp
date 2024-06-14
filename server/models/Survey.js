const mongoose = require('mongoose');

const SurveySchema = new mongoose.Schema({
  generalHealth: String,
  healthComparison: String,
  physicalLimitations: String,
  emotionalProblems: String,
  socialActivities: String,
  painLevel: String,
  painInterference: String,
  energyLevel: String,
  nervousness: String,
  downhearted: String,
  calmness: String,
  happiness: String,
  documentType: String,
  documentFile: String,
  userId: String,
});

module.exports = mongoose.model('Survey', SurveySchema);
