const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  username: String,
  photoUrl: String,
  role: { type: String, enum: ['user', 'doctor', 'admin'], default: 'user' }, // добавляем поле role
});

module.exports = mongoose.model('User', userSchema);
