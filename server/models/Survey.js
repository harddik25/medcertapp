// models/Survey.js
const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  surveyData: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Survey', surveySchema);
