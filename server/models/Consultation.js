const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  videoLink: {
    type: String, // Поле для ссылки на видеоконференцию
    required: true
  }
});

module.exports = mongoose.model('Consultation', consultationSchema);
