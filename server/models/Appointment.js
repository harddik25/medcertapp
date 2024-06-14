const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  date: String,
  time: String,
  patientName: String,
  userId: String,
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
