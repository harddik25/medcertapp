const app = require('./app');
const http = require('http');
const WebSocket = require('ws');
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('New WebSocket connection');

  ws.on('message', (message) => {
    console.log('received:', message);
    // Обработка полученного сообщения
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });

  ws.send('Welcome to the WebSocket server');
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
