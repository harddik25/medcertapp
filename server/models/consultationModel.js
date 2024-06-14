let consultations = [];

exports.getAllConsultations = () => consultations;

exports.addConsultation = (consultation) => {
  consultations.push(consultation);
  return consultation;
};

exports.getConsultationById = (id) => consultations.find(consultation => consultation.id === id);
