// models/Survey.js
const mongoose = require('mongoose');

const SurveySchema = new mongoose.Schema({
  telegramId: {
    type: String,
    required: true,
  },
  dayactivities: {
    type: Map,
    of: String,
    required: true,
  },
  physicalhealth: {
    type: Map,
    of: String,
    required: true,
  },
  emotionalproblem: {
    type: Map,
    of: String,
    required: true,
  },
  socialactivitiesgroups: {
    type: Map,
    of: String,
    required: true,
  },
  bodypain: {
    type: Map,
    of: String,
    required: true,
  },
  paininterfere: {
    type: Map,
    of: String,
    required: true,
  },
  feelings: {
    type: Map,
    of: String,
    required: true,
  },
  socialInterference: {
    type: Map,
    of: String,
    required: true,
  },
  healthTime: {
    type: Map,
    of: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Survey', SurveySchema);
