const ftp = require('basic-ftp');
const path = require('path');
const fs = require('fs');

async function uploadToFTP(localPath, remotePath) {
  const client = new ftp.Client();
  client.ftp.verbose = true; // Включаем подробный вывод для отладки

  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: false,
    });

    // Split remote path into directories and filename
    const directories = remotePath.split('/');
    const fileName = directories.pop();

    // Ensure directory exists on FTP server
    for (const dir of directories) {
      await client.ensureDir(dir);
      await client.cd(dir);
    }

    await client.uploadFrom(localPath, fileName);
  } catch (error) {
    console.error('Error uploading to FTP:', error);
    throw error;
  } finally {
    client.close();
  }
}

exports.uploadDocument = async (req, res) => {
  try {
    const { documentType } = req.body;
    const document = req.file;

    if (!documentType || !document) {
      return res.status(400).json({ success: false, message: 'Document type and file are required.' });
    }

    const localPath = path.join(__dirname, '..', 'uploads', documentType, document.originalname);

    // Ensure local directory exists
    const uploadPath = path.dirname(localPath);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    fs.writeFileSync(localPath, document.buffer);

    // Upload to FTP
    const remotePath = `${documentType}/${document.originalname}`;
    await uploadToFTP(localPath, remotePath);

    // Remove local file after upload
    fs.unlinkSync(localPath);

    res.status(201).json({ success: true, message: 'Document uploaded successfully.' });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};


