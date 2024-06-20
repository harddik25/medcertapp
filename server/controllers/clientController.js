const Survey = require('../models/Survey');
const Consultation = require('../models/Consultation');

exports.getClientInfo = async (req, res) => {
  try {
    const { patientId } = req.params;

    const consultation = await Consultation.findOne({ patientName: patientId });
    if (!consultation) {
      return res.status(404).json({ message: 'Консультация с данным пациентом не найдена' });
    }

    const surveys = await Survey.find({ telegramId: patientId });

    const clientInfo = {
      patientName: consultation.patientName,
      surveys: surveys.map(survey => ({
        dayactivities: survey.dayactivities,
        physicalhealth: survey.physicalhealth,
        emotionalproblem: survey.emotionalproblem,
        socialactivitiesgroups: survey.socialactivitiesgroups,
        bodypain: survey.bodypain,
        paininterfere: survey.paininterfere,
        feelings: survey.feelings,
        socialInterference: survey.socialInterference,
        healthTime: survey.healthTime,
        documentPath: survey.documentPath,
      })),
    };

    res.status(200).json({ clientInfo });
  } catch (error) {
    console.error('Ошибка при получении информации о клиенте:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
