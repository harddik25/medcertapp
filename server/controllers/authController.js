const crypto = require('crypto');
const User = require('../models/User');

exports.telegramAuth = (req, res) => {
  const { hash, ...userData } = req.body;
  const secret = crypto.createHash('sha256').update(process.env.TELEGRAM_BOT_TOKEN).digest();

  const checkString = Object.keys(userData)
    .sort()
    .map((key) => `${key}=${userData[key]}`)
    .join('\n');

  const hmac = crypto.createHmac('sha256', secret)
    .update(checkString)
    .digest('hex');

  if (hmac === hash) {
    User.findOneAndUpdate(
      { telegramId: userData.id },
      { ...userData },
      { upsert: true, new: true },
      (err, user) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(user);
      }
    );
  } else {
    res.status(401).send('Unauthorized');
  }
};

