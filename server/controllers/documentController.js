const path = require('path');
const fs = require('fs');
const ftp = require('basic-ftp');
const Survey = require('../models/Survey');

async function downloadFromFTP(client, remotePath, localPath) {
  try {
    await client.downloadTo(localPath, remotePath);
  } catch (error) {
    if (error.code === 550) {
      // File not found, try the next part
      return false;
    }
    throw error;
  }
  return true;
}

exports.downloadDocument = async (req, res) => {
  const { userId, documentType, side, fileName } = req.params;
  const remotePathBase = `/var/www/user4806313/data/${userId}/${documentType}/${side}/${fileName}`;
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

    let partNumber = 1;
    let downloaded = false;
    const writeStream = fs.createWriteStream(localPath);

    while (true) {
      const remotePath = `${remotePathBase}.part${partNumber}`;
      const localPathPart = `${localPath}.part${partNumber}`;
      downloaded = await downloadFromFTP(client, remotePath, localPathPart);
      if (!downloaded) break;

      const readStream = fs.createReadStream(localPathPart);
      readStream.pipe(writeStream, { end: false });
      await new Promise(resolve => readStream.on('end', resolve));
      fs.unlinkSync(localPathPart); // Remove the part after it is written
      partNumber++;
    }

    writeStream.end();
    await new Promise(resolve => writeStream.on('finish', resolve));

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

    await downloadFromFTP(client, remotePath, localPath);

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

async function ensureDir(client, remoteDir) {
  try {
    await client.ensureDir(remoteDir);
    console.log(`Directory ${remoteDir} exists or created successfully.`);
  } catch (error) {
    console.error(`Error ensuring directory ${remoteDir}:`, error);
    throw error;
  }
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

    const remoteDir = path.dirname(remotePath);
    await ensureDir(client, remoteDir);

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
    console.error('Error uploading document:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
