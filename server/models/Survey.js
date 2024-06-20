// models/Survey.js
const mongoose = require('mongoose');

const SurveySchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  pathology: {
    type: String,
    required: true,
  },
  telegramId: {
    type: String,
    required: true,
  },
  generalhealth: {
    type: Map,
    of: String,
    required: true,
  },
  comparing: {
    type: Map,
    of: String,
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
  depressed: {
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
  },
  frontDocument: { type: String }, 
  backDocument: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Survey', SurveySchema);
