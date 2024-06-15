const Consultation = require('../models/Consultation');
const FreeSlot = require('../models/FreeSlot');

exports.deleteFreeSlot = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Идентификатор слота обязателен' });
    }

    const deletedSlot = await FreeSlot.findByIdAndDelete(id);

    if (!deletedSlot) {
      return res.status(404).json({ message: 'Слот не найден' });
    }

    res.status(200).json({ success: true, message: 'Слот удален', slot: deletedSlot });
  } catch (error) {
    console.error('Ошибка при удалении слота', error);
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
    const appointments = await Consultation.find();
    res.status(200).json({ appointments });
  } catch (error) {
    console.error('Ошибка при получении списка консультаций', error);
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
  try {
    const { date, time, userId } = req.body;

    if (!date || !time || !userId) {
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
