const Survey = require('../models/Survey');

exports.getClientInfo = async (req, res) => {
  try {
    const { patientId } = req.params;

    const surveys = await Survey.find({ userId: patientId });

    const clientInfo = {
      surveys
    };

    res.status(200).json({ success: true, clientInfo });
  } catch (error) {
    console.error('Ошибка при получении информации о клиенте', error);
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  }
};
