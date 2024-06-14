const Appointment = require('../models/Appointment');
const Slot = require('../models/Slot');

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    res.send({ appointments });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.bookAppointment = async (req, res) => {
  const appointment = new Appointment(req.body);
  try {
    await appointment.save();
    res.status(201).send(appointment);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.scheduleSlot = async (req, res) => {
  const { date, time } = req.body;
  try {
    let slot = await Slot.findOne({ date });
    if (slot) {
      slot.times.push(time);
    } else {
      slot = new Slot({ date, times: [time] });
    }
    await slot.save();
    res.status(201).send(slot);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAvailableSlots = async (req, res) => {
  try {
    const slots = await Slot.find({});
    res.send({ slots });
  } catch (error) {
    res.status(500).send(error);
  }
};
