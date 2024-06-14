const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  telegramId: { type: String, unique: true },
  first_name: String,
  last_name: String,
  username: String,
  photo_url: String,
  auth_date: String,
});

module.exports = mongoose.model('User', UserSchema);
