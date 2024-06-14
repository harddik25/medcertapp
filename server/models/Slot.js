const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
  date: String,
  times: [String],
});

module.exports = mongoose.model('Slot', SlotSchema);
