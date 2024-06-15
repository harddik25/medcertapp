const Consultation = require('../models/Consultation');
const FreeSlot = require('../models/FreeSlot');

exports.scheduleAppointment = async (req, res) => {
  try {
    const { date, time, patientName } = req.body;

    if (!date || !time || !patientName) {
      return res.status(400).json({ message: 'Дата, время и имя пациента обязательны' });
    }

    const newAppointment = new Consultation({
      date,
      time,
      patientName
    });

    await newAppointment.save();
    await FreeSlot.deleteOne({ date, time });
    res.status(201).json({ success: true, appointment: newAppointment });
  } catch (error) {
    console.error('Ошибка при сохранении времени приема', error);
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};

exports.getFreeSlots = async (req, res) => {
  try {
    const freeSlots = await FreeSlot.find();
    res.status(200).json({ freeSlots });
  } catch (error) {
    console.error('Ошибка при получении списка свободного времени', error);
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};

exports.bookFreeSlot = async (req, res) => {
  try {
    const { date, time, userId } = req.body;

    if (!date || неtime || неuserId) {
      return res.status(400).json({ message: 'Дата, время и идентификатор пользователя обязательны' });
    }

    const freeSlot = await FreeSlot.findOne({ date, time });
    if (!freeSlot) {
      return res.status(400).json({ message: 'Этот слот уже занят или не существует' });
    }

    const newAppointment = new Consultation({
      date,
      time,
      patientName: userId
    });

    await newAppointment.save();
    await FreeSlot.deleteOne({ date, time });

    res.status(201).json({ success: true, appointment: newAppointment });
  } catch (error) {
    console.error('Ошибка при бронировании времени приема', error);
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

exports.getFutureAppointments = async (req, res) => {
  try {
    const futureAppointments = await Consultation.find();
    res.status(200).json({ appointments: futureAppointments });
  } catch (error) {
    console.error('Ошибка при получении будущих консультаций', error);
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};

