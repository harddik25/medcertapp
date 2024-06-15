const fs = require('fs');
const path = require('path');

exports.uploadDocument = (req, res) => {
  try {
    const { documentType } = req.body;
    const document = req.file;

    if (!documentType || !document) {
      return res.status(400).json({ success: false, message: 'Document type and file are required.' });
    }

    const uploadPath = path.join(__dirname, '..', 'uploads', documentType);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const filePath = path.join(uploadPath, document.originalname);
    fs.writeFileSync(filePath, document.buffer);

    res.status(201).json({ success: true, message: 'Document uploaded successfully.' });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
