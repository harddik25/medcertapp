const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/ws',
    createProxyMiddleware({
      target: 'http://localhost:5000', // Ваш backend
      changeOrigin: true,
      ws: true,
      pathRewrite: {
        '^/ws': '', // Убедитесь, что путь правильно переписывается
      },
    })
  );
};
