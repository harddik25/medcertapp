const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  telegramId: { type: String, unique: true, required: true },
  firstName: String,
  lastName: String,
  username: String,
  photoUrl: String,
});

module.exports = mongoose.model('User', userSchema);
