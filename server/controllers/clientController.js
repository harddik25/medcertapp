const Survey = require('../models/Survey');
const Consultation = require('../models/Consultation');

exports.getClientInfo = async (req, res) => {
  try {
    const { patientId } = req.params;

    const consultation = await Consultation.findOne({ patientName: patientId });
    if (!consultation) {
      return res.status(404).json({ message: 'Консультация с данным пациентом не найдена' });
    }

    const surveys = await Survey.find({ userId: patientId });

    const clientInfo = {
      patientName: consultation.patientName,
      surveys: surveys.map(survey => ({
        question: survey.question,
        answer: survey.answer,
        documentPath: survey.documentPath,
      })),
    };

    res.status(200).json({ clientInfo });
  } catch (error) {
    console.error('Ошибка при получении информации о клиенте:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
