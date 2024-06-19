const Consultation = require('../models/Consultation');
const FreeSlot = require('../models/FreeSlot');
const { createGoogleMeetLink } = require('../models/googleCalendarService');

exports.deleteFreeSlot = async (req, res) => {
  try {
    const { slotId } = req.params;
    const result = await FreeSlot.findByIdAndDelete(slotId);
    if (!result) {
      return res.status(404).json({ message: 'Слот не найден' });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Ошибка при удалении свободного времени', error);
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};

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


exports.getAppointments = async (req, res) => {
  try {
    const patientName = req.params.patientName;
    console.log('Fetching appointment for patient:', patientName);
    const appointment = await Consultation.findOne({ patientName: patientName });
    if (appointment) {
      console.log('Found appointment:', appointment);
      res.status(200).json({ appointment });
    } else {
      console.log('No appointment found for patient:', patientName);
      res.status(404).json({ message: 'Консультация не найдена' });
    }
  } catch (error) {
    console.error('Ошибка при получении консультации', error);
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};

exports.addFreeSlot = async (req, res) => {
  try {
    const { date, time } = req.body;

    if (!date || !time) {
      return res.status(400).json({ message: 'Дата и время обязательны' });
    }

    const newFreeSlot = new FreeSlot({
      date,
      time
    });

    await newFreeSlot.save();
    res.status(201).json({ success: true, freeSlot: newFreeSlot });
  } catch (error) {
    console.error('Ошибка при сохранении свободного времени', error);
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
  const { date, time, userId } = req.body;
  const user = await User.findById(userId); // Предположим, что у вас есть модель User

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  try {
    const meetLink = await createGoogleMeetLink(date, time, `Consultation with ${user.firstName}`);
    const consultation = new Consultation({
      date,
      time,
      patientName: userId,
      meetLink
    });

    await consultation.save();
    res.status(200).json({ success: true, message: 'Consultation booked successfully', meetLink });
  } catch (error) {
    console.error('Error booking consultation:', error);
    res.status(500).json({ success: false, message: 'Failed to book consultation' });
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
exports.getAppointmentByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const appointment = await Consultation.findOne({ patientName: userId });
    if (!appointment) {
      return res.status(404).json({ message: 'Запись не найдена' });
    }
    res.status(200).json({ appointment });
  } catch (error) {
    console.error('Ошибка при получении записи на консультацию', error);
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};
