const multer = require('multer');

// Настройка хранилища для загруженных файлов
const storage = multer.memoryStorage();

// Фильтрация файлов по типу MIME
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Неподдерживаемый тип файла'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

module.exports = upload;
