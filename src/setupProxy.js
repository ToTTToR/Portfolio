const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/predict',
    createProxyMiddleware({
      target: 'https://bingusorfloppa-utv4yl2rlq-lz.a.run.app',
      changeOrigin: true,
    })
  );
};