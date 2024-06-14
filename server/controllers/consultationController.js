const consultationModel = require('../models/consultationModel');

exports.bookConsultation = (req, res) => {
  const { date, time } = req.body;

  const newConsultation = consultationModel.addConsultation({
    id: consultationModel.getAllConsultations().length + 1,
    date,
    time,
    patientName: 'Test User'
  });

  res.json({ success: true, consultation: newConsultation });
};

exports.getConsultations = (req, res) => {
  const consultations = consultationModel.getAllConsultations();
  res.json({ success: true, appointments: consultations });
};
