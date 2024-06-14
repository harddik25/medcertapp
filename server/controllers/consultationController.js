const Consultation = require('../models/Consultation');

exports.scheduleAppointment = async (req, res) => {
  try {
    const { date, time, patientName } = req.body;

    // Проверьте, что данные переданы корректно
    if (!date || !time || !patientName) {
      return res.status(400).json({ message: 'Дата, время и имя пациента обязательны' });
    }

    const newAppointment = new Consultation({
      date,
      time,
      patientName
    });

    await newAppointment.save();
    res.status(201).json({ success: true, appointment: newAppointment });
  } catch (error) {
    console.error('Ошибка при сохранении времени приема', error);
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Consultation.find();
    res.status(200).json({ appointments });
  } catch (error) {
    console.error('Ошибка при получении списка консультаций', error);
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};
