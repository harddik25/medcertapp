const certificateModel = require('../models/certificateModel');

exports.buyCertificate = (req, res) => {
  const { certificate } = req.body;

  const newCertificate = certificateModel.addCertificate({
    id: certificateModel.getAllCertificates().length + 1,
    name: certificate
  });

  res.json({ success: true, certificate: newCertificate });
};
