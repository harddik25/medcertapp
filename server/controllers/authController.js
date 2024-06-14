const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.telegramAuth = async (req, res) => {
  const { id, first_name, last_name, username, photo_url, auth_date, hash } = req.query;

  const secret = process.env.TELEGRAM_BOT_TOKEN;
  const dataCheckString = Object.keys(req.query)
    .filter(key => key !== 'hash')
    .map(key => `${key}=${req.query[key]}`)
    .sort()
    .join('\n');
  const crypto = require('crypto');
  const secretKey = crypto.createHash('sha256').update(secret).digest();
  const hmac = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

  if (hmac !== hash) {
    return res.status(401).send('Data is not from Telegram');
  }

  let user = await User.findOne({ telegramId: id });
  if (!user) {
    user = new User({
      telegramId: id,
      firstName: first_name,
      lastName: last_name,
      username: username,
      photoUrl: photo_url,
    });
    await user.save();
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.cookie('token', token, { httpOnly: true });
  res.redirect(`/profile?user=${encodeURIComponent(JSON.stringify(user))}`);
};

