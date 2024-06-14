import React, { useEffect } from 'react';

const WebSocketComponent = () => {
  useEffect(() => {
    const ws = new WebSocket('wss://medlevel.me/ws');

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
      console.log('WebSocket message received:', event);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  
};

export default WebSocketComponent;
