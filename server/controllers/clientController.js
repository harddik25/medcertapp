const Consultation = require('../models/Consultation');
const Survey = require('../models/Survey');
const ftp = require('basic-ftp');
const path = require('path');
const fs = require('fs');

async function listFTPDocuments(client, remotePath) {
  try {
    const fileList = await client.list(remotePath);
    return fileList.map(file => file.name);
  } catch (error) {
    console.error('Error listing FTP documents:', error);
    throw error;
  }
}

exports.getClientInfo = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Получение информации о консультациях клиента
    const consultations = await Consultation.find({ patientName: patientId });

    // Получение информации о ответах на опросы клиента
    const surveys = await Survey.find({ userId: patientId });

    // Установка соединения с FTP
    const client = new ftp.Client();
    client.ftp.verbose = true;
    client.ftp.timeout = 0;

    let documents = [];

    try {
      await client.access({
        host: process.env.FTP_HOST,
        user: process.env.FTP_USER,
        password: process.env.FTP_PASSWORD,
        secure: false,
      });

      const remotePath = `/var/www/user4806313/data/${patientId}/`;
      documents = await listFTPDocuments(client, remotePath);

    } catch (error) {
      console.error('Error accessing FTP:', error);
    } finally {
      client.close();
    }

    res.status(200).json({
      success: true,
      clientInfo: {
        consultations,
        surveys,
        documents
      }
    });
  } catch (error) {
    console.error('Ошибка при получении информации о клиенте:', error);
    res.status(500).json({ success: false, message: 'Ошибка сервера.' });
  }
};
