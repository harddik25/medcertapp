const ftp = require('basic-ftp');
const path = require('path');
const fs = require('fs');

async function uploadToFTP(localPath, remotePath) {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: false,
    });

    await client.ensureDir(path.dirname(remotePath));
    await client.uploadFrom(localPath, remotePath);
  } catch (error) {
    console.error('Error uploading to FTP:', error);
    throw error;
  } finally {
    client.close();
  }
}

exports.uploadDocument = async (req, res) => {
  try {
    const { documentType, userId } = req.body; // Получаем userId из запроса
    const document = req.file;

    if (!documentType || !document || !userId) {
      return res.status(400).json({ success: false, message: 'Document type, user ID and file are required.' });
    }

    const localPath = path.join(__dirname, '..', 'uploads', userId, documentType, document.originalname);

    // Ensure local directory exists
    const uploadPath = path.dirname(localPath);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    fs.writeFileSync(localPath, document.buffer);

    // FTP remote path
    const remotePath = `/var/www/user4806313/data/${userId}/${documentType}/${document.originalname}`;
    await uploadToFTP(localPath, remotePath);

    // Remove local file after upload
    fs.unlinkSync(localPath);

    res.status(201).json({ success: true, message: 'Document uploaded successfully.' });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};


