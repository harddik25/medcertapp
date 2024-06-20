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
      firstName: survey.firstName,
      lastName: survey.lastName,
      pathology: survey.pathology,
      surveys: surveys.map(survey => ({
        generalhealth: survey.generalhealth,
        comparing: survey.comparing,
        dayactivities: survey.dayactivities,
        physicalhealth: survey.physicalhealth,
        depressed: survey.depressed,
        socialactivitiesgroups: survey.socialactivitiesgroups,
        bodypain: survey.bodypain,
        paininterfere: survey.paininterfere,
        feelings: survey.feelings,
        socialInterference: survey.socialInterference,
        healthTime: survey.healthTime,
        frontDocument: survey.frontDocument || '',
        backDocument: survey.backDocument || '',
      })),
    };

    console.log('Client Info:', clientInfo); // Добавим логирование для отладки
    res.status(200).json({ clientInfo });
  } catch (error) {
    console.error('Ошибка при получении информации о клиенте:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

