const Consultation = require('../models/Consultation');
const Survey = require('../models/Survey');
// Предполагая, что у вас есть модель для хранения документов

exports.getClientInfo = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Получение информации о консультациях клиента
    const consultations = await Consultation.find({ patientName: patientId });

    // Получение информации о ответах на опросы клиента
    const surveys = await Survey.find({ userId: patientId });



    res.status(200).json({
      success: true,
      clientInfo: {
        consultations,
        surveys
        
      }
    });
  } catch (error) {
    console.error('Ошибка при получении информации о клиенте:', error);
    res.status(500).json({ success: false, message: 'Ошибка сервера.' });
  }
};
