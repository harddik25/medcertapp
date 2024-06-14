const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const app = require('./app'); // Подключение вашего основного Express приложения
const PORT = process.env.PORT || 5000;

// Создаем HTTP сервер
const server = http.createServer(app);

// Настраиваем WebSocket сервер
const wss = new WebSocket.Server({ server, path: '/ws' });

wss.on('connection', (ws) => {
    console.log('WebSocket client connected');

    ws.on('message', (message) => {
        console.log(`Received message => ${message}`);
        ws.send(`You said: ${message}`);
    });

    ws.on('close', () => {
        console.log('WebSocket client disconnected');
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

// Запускаем сервер
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
