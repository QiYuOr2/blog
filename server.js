const Express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = Express();

const SERVER_HOST = 'http://101.43.4.73/';
app.use(
  createProxyMiddleware('/*', {
    target: SERVER_HOST,
    changeOrigin: true,
  })
);

app.listen(3090, () => {
  console.log('http://localhost:3090');
});

module.exports = app;
