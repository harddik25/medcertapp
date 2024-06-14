const Consultation = require('../models/Consultation');

exports.scheduleAppointment = async (req, res) => {
  try {
    const { date, time } = req.body;

    // Проверьте, что данные переданы корректно
    if (!date || !time) {
      return res.status(400).json({ message: 'Дата и время обязательны' });
    }

    const newAppointment = new Consultation({
      date,
      time,
      patientName: req.user ? req.user.username : 'Unknown'
    });

    await newAppointment.save();
    res.status(201).json({ success: true, appointment: newAppointment });
  } catch (error) {
    console.error('Ошибка при сохранении времени приема', error);
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};
