const path = require('path');
const fs = require('fs');
const ftp = require('basic-ftp');
const Survey = require('../models/Survey');

async function downloadFromFTP(client, remotePath, localPath) {
  try {
    await client.downloadTo(localPath, remotePath);
  } catch (error) {
    if (error.code === 550) {
      // File not found
      return false;
    }
    throw error;
  }
  return true;
}

exports.downloadDocument = async (req, res) => {
  const { userId, documentType, side, fileName } = req.params;
  const remotePath = `/var/www/user4806313/data/${userId}/${documentType}/${side}/${fileName}`;
  const localPath = path.join(__dirname, '..', 'downloads', userId, documentType, side, fileName);

  // Ensure local directory exists
  const downloadPath = path.dirname(localPath);
  if (!fs.existsSync(downloadPath)) {
    fs.mkdirSync(downloadPath, { recursive: true });
  }

  const client = new ftp.Client();
  client.ftp.verbose = true;
  client.ftp.timeout = 0;

  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: false,
    });

    const downloaded = await downloadFromFTP(client, remotePath, localPath);

    if (!downloaded) {
      return res.status(404).json({ success: false, message: 'File not found.' });
    }

    res.download(localPath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).json({ success: false, message: 'Error sending file.' });
      }

      // Remove local file after sending
      fs.unlinkSync(localPath);
    });
  } catch (error) {
    console.error('Error downloading document:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  } finally {
    client.close();
  }
};

exports.downloadCertificate = async (req, res) => {
  const { userId, fileName } = req.params;
  const remotePath = `/var/www/user4806313/data/${userId}/certificate/${fileName}`;
  const localPath = path.join(__dirname, '..', 'downloads', userId, 'certificate', fileName);

  // Ensure local directory exists
  const downloadPath = path.dirname(localPath);
  if (!fs.existsSync(downloadPath)) {
    fs.mkdirSync(downloadPath, { recursive: true });
  }

  const client = new ftp.Client();
  client.ftp.verbose = true;
  client.ftp.timeout = 0;

  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: false,
    });

    const downloaded = await downloadFromFTP(client, remotePath, localPath);

    if (!downloaded) {
      return res.status(404).json({ success: false, message: 'File not found.' });
    }

    res.download(localPath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).json({ success: false, message: 'Error sending file.' });
      }

      // Remove local file after sending
      fs.unlinkSync(localPath);
    });
  } catch (error) {
    console.error('Error downloading certificate:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  } finally {
    client.close();
  }
};

async function ensureFtpDirectory(client, remoteDir) {
  const parts = remoteDir.split('/');
  let currentDir = '';
  
  for (const part of parts) {
    if (part) {
      currentDir += `/${part}`;
      try {
        await client.send(`MKD ${currentDir}`);
      } catch (error) {
        if (error.code !== 550) { // 550 means the directory already exists
          throw error;
        }
      }
    }
  }
}

async function uploadToFTP(client, localPath, remotePath) {
  try {
    const remoteDir = path.dirname(remotePath);
    await ensureFtpDirectory(client, remoteDir);
    await client.uploadFrom(localPath, remotePath);
    console.log('File uploaded successfully');
  } catch (error) {
    console.error('Error uploading to FTP:', error);
    throw error;
  }
}

exports.uploadDocument = async (req, res) => {
  try {
    const { documentType, userId, surveyId } = req.body;
    const frontDocument = req.files['frontDocument'][0];
    const backDocument = req.files['backDocument'] ? req.files['backDocument'][0] : null;

    if (!documentType || !frontDocument || !userId) {
      return res.status(400).json({ success: false, message: 'Document type, user ID, and front document are required.' });
    }

    const localPathFront = path.join(__dirname, '..', 'uploads', userId, documentType, 'front', frontDocument.originalname);
    const localPathBack = backDocument ? path.join(__dirname, '..', 'uploads', userId, documentType, 'back', backDocument.originalname) : null;

    // Ensure local directory exists
    const uploadPathFront = path.dirname(localPathFront);
    if (!fs.existsSync(uploadPathFront)) {
      fs.mkdirSync(uploadPathFront, { recursive: true });
    }
    fs.writeFileSync(localPathFront, frontDocument.buffer);

    if (backDocument) {
      const uploadPathBack = path.dirname(localPathBack);
      if (!fs.existsSync(uploadPathBack)) {
        fs.mkdirSync(uploadPathBack, { recursive: true });
      }
      fs.writeFileSync(localPathBack, backDocument.buffer);
    }

    const client = new ftp.Client();
    client.ftp.verbose = true;
    client.ftp.timeout = 0;

    try {
      await client.access({
        host: process.env.FTP_HOST,
        user: process.env.FTP_USER,
        password: process.env.FTP_PASSWORD,
        secure: false,
      });

      // FTP remote path
      const remotePathFront = `/var/www/user4806313/data/${userId}/${documentType}/front/${frontDocument.originalname}`;
      const remotePathBack = backDocument ? `/var/www/user4806313/data/${userId}/${documentType}/back/${backDocument.originalname}` : null;

      await uploadToFTP(client, localPathFront, remotePathFront);

      if (backDocument) {
        await uploadToFTP(client, localPathBack, remotePathBack);
      }

      // Remove local file after upload
      fs.unlinkSync(localPathFront);
      if (localPathBack) fs.unlinkSync(localPathBack);

      // Обновляем запись Survey
      if (surveyId) {
        await Survey.findByIdAndUpdate(surveyId, {
          documentType: documentType, // Обновляем тип документа
          frontDocument: remotePathFront,
          backDocument: remotePathBack
        });
      } else {
        await Survey.updateOne({ telegramId: userId }, {
          documentType: documentType, // Обновляем тип документа
          frontDocument: remotePathFront,
          backDocument: remotePathBack
        });
      }

      res.status(201).json({ success: true, message: 'Document uploaded successfully.' });
    } catch (error) {
      console.error('Error accessing FTP server:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    } finally {
      client.close();
    }
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};


