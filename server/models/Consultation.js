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
  meetLink: {
    type: String,
    required: true // Сделайте это поле обязательным
  }
});

module.exports = mongoose.model('Consultation', consultationSchema);
