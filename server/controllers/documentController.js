const ftp = require('basic-ftp');
const path = require('path');
const fs = require('fs');

async function uploadFilePart(client, localPath, remotePath, start, end, partNumber) {
  const partPath = `${localPath}`;
  const writeStream = fs.createWriteStream(partPath);

  return new Promise((resolve, reject) => {
    fs.createReadStream(localPath, { start, end })
      .pipe(writeStream)
      .on('finish', async () => {
        try {
          await client.uploadFrom(partPath, `${remotePath}`);
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
      await uploadFilePart(client, localPath, remotePath, start, end);
      start += partSize;
      
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
    const {userId } = req.body;
    const document = req.file;

    if (!document || !userId) {
      return res.status(400).json({ success: false, message: 'Document type, user ID, and file are required.' });
    }

    const localPath = path.join(__dirname, '..', 'uploads', document.originalname);

    // Ensure local directory exists
    const uploadPath = path.dirname(localPath);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    fs.writeFileSync(localPath, document.buffer);

    // FTP remote path with patientId as file name
    const remotePath = `/var/www/user4806313/data/${userId}/${userId}`;
    await uploadToFTP(localPath, remotePath);

    // Remove local file after upload
    fs.unlinkSync(localPath);

    res.status(201).json({ success: true, message: 'Document uploaded successfully.' });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.downloadDocument = async (req, res) => {
  const { userId, documentType } = req.params;
  const localPath = path.join(__dirname, '..', 'downloads', userId, documentType, userId);

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

    const remotePath = `/var/www/user4806313/data/${userId}/${userId}`;
    
    // Ensure local directory exists
    const downloadPath = path.dirname(localPath);
    if (!fs.existsSync(downloadPath)) {
      fs.mkdirSync(downloadPath, { recursive: true });
    }

    await client.downloadTo(localPath, remotePath);

    res.download(localPath, (err) => {
      if (err) {
        console.error('Error downloading document:', err);
        res.status(500).json({ success: false, message: 'Server error.' });
      }
      fs.unlinkSync(localPath); // Удалить временный файл после загрузки
    });
  } catch (error) {
    console.error('Error downloading document:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  } finally {
    client.close();
  }
};

