const express = require('express');
const http = require('http');
const app = require('./app'); // Подключение вашего основного Express приложения
const PORT = process.env.PORT || 5000;

// Создаем HTTP сервер
const server = http.createServer(app);

// Запускаем сервер
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
