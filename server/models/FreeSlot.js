const mongoose = require('mongoose');

const freeSlotSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('FreeSlot', freeSlotSchema);
