const userModel = require('../models/User');
const certificateModel = require('../models/certificateModel');

exports.getUsers = (req, res) => {
  const users = userModel.getAllUsers();
  res.json({ success: true, users: users });
};

exports.getCertificates = (req, res) => {
  const certificates = certificateModel.getAllCertificates();
  res.json({ success: true, certificates: certificates });
};
