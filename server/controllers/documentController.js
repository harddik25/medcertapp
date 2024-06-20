const path = require('path');
const fs = require('fs');
const ftp = require('basic-ftp');
const Survey = require('../models/Survey');

async function uploadFilePart(client, localPath, remotePath, start, end, partNumber) {
  const partPath = `${localPath}.part${partNumber}`;
  const writeStream = fs.createWriteStream(partPath);

  return new Promise((resolve, reject) => {
    fs.createReadStream(localPath, { start, end })
      .pipe(writeStream)
      .on('finish', async () => {
        try {
          await client.uploadFrom(partPath, `${remotePath}.part${partNumber}`);
          fs.unlinkSync(partPath); // Удалить временный файл после успешной загрузки
          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on('error', reject);
  });
}

async function uploadToFTP(localPath, remotePath) {
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

    const fileSize = fs.statSync(localPath).size;
    const partSize = 10 * 1024 * 1024; // Размер части 10 MB
    let start = 0;
    let partNumber = 1;

    while (start < fileSize) {
      const end = Math.min(start + partSize - 1, fileSize - 1);
      await uploadFilePart(client, localPath, remotePath, start, end, partNumber);
      start += partSize;
      partNumber++;
    }

    console.log('File uploaded successfully in parts');
  } catch (error) {
    console.error('Error uploading to FTP:', error);
    throw error;
  } finally {
    client.close();
  }
}

exports.uploadDocument = async (req, res) => {
  try {
    const { documentType, userId, surveyId } = req.body;
    const frontDocument = req.files['frontDocument'] ? req.files['frontDocument'][0] : null;
    const backDocument = req.files['backDocument'] ? req.files['backDocument'][0] : null;

    if (!documentType || !userId || !frontDocument) {
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

    // FTP remote path
    const remotePathFront = `/var/www/user4806313/data/${userId}/${documentType}/front/${frontDocument.originalname}`;
    const remotePathBack = backDocument ? `/var/www/user4806313/data/${userId}/${documentType}/back/${backDocument.originalname}` : null;
    await uploadToFTP(localPathFront, remotePathFront);

    if (backDocument) {
      await uploadToFTP(localPathBack, remotePathBack);
    }

    // Remove local file after upload
    fs.unlinkSync(localPathFront);
    if (localPathBack) fs.unlinkSync(localPathBack);

    // Обновляем запись Survey
    const surveyUpdate = {
      frontDocument: remotePathFront,
    };
    if (backDocument) {
      surveyUpdate.backDocument = remotePathBack;
    }

    await Survey.findOneAndUpdate(
      { telegramId: userId },
      surveyUpdate,
      { new: true, upsert: true }
    );

    res.status(201).json({ success: true, message: 'Document uploaded successfully.' });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

