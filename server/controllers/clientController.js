const path = require('path');
const fs = require('fs');
const ftp = require('basic-ftp');
const Survey = require('../models/Survey');
const Consultation = require('../models/Consultation');

exports.getClientInfo = async (req, res) => {
  try {
    const { patientId } = req.params;

    const consultation = await Consultation.findOne({ patientName: patientId });
    if (!consultation) {
      return res.status(404).json({ message: 'Консультация с данным пациентом не найдена' });
    }

    const surveys = await Survey.find({ telegramId: patientId });

    const clientInfo = {
      patientName: consultation.patientName,
      firstName: surveys[0].firstName,
      lastName: surveys[0].lastName,
      pathology: surveys[0].pathology,
      documentType: surveys[0].documentType,
      surveys: surveys.map(survey => ({
        generalhealth: survey.generalhealth,
        comparing: survey.comparing,
        dayactivities: survey.dayactivities,
        physicalhealth: survey.physicalhealth,
        depressed: survey.depressed,
        socialactivitiesgroups: survey.socialactivitiesgroups,
        bodypain: survey.bodypain,
        paininterfere: survey.paininterfere,
        feelings: survey.feelings,
        socialInterference: survey.socialInterference,
        healthTime: survey.healthTime,
        frontDocument: survey.frontDocument || '',
        backDocument: survey.backDocument || '',
      })),
    };

    console.log('Client Info:', clientInfo); // Добавим логирование для отладки
    res.status(200).json({ clientInfo });
  } catch (error) {
    console.error('Ошибка при получении информации о клиенте:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

async function uploadFile(client, localPath, remotePath) {
  const clientAccess = await client.access({
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
    secure: false,
  });

  const remoteDir = path.dirname(remotePath);
  await client.ensureDir(remoteDir);
  await client.uploadFrom(localPath, remotePath);

  console.log('File uploaded successfully');
}

exports.uploadCertificate = async (req, res) => {
  try {
    const { userId } = req.body;
    const certificate = req.file;

    if (!certificate || !userId) {
      return res.status(400).json({ success: false, message: 'User ID and certificate are required.' });
    }

    const localPath = path.join(__dirname, '..', 'uploads', userId, 'certificate', certificate.originalname);

    // Ensure local directory exists
    const uploadPath = path.dirname(localPath);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    fs.writeFileSync(localPath, certificate.buffer);

    // FTP remote path
    const remotePath = `/var/www/user4806313/data/${userId}/certificate/${certificate.originalname}`;
    const client = new ftp.Client();
    client.ftp.verbose = true;
    client.ftp.timeout = 0;

    try {
      await uploadFile(client, localPath, remotePath);
    } finally {
      client.close();
    }

    // Remove local file after upload
    fs.unlinkSync(localPath);

    res.status(201).json({ success: true, message: 'Certificate uploaded successfully.' });
  } catch (error) {
    console.error('Error uploading certificate:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

