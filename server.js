const express = require('express');
const devServer = require('./dev');
const prodServer = require('./prod');

const app = express();

const isDev = process.env.NODE_ENV === 'development';

console.log('isDev ', isDev);

isDev
  ? (async function () {
      await devServer(app);
    })()
  : prodServer(app);

const port = 8081;
app.listen(port, () => {
  console.log(`You can navigate to http://localhost:${port}`);
});

module.exports = app;
