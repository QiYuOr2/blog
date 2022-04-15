const path = require('path');
const fs = require('fs');
const express = require('express');

module.exports = function (app) {
  const prodStaticPath = path.join(__dirname, 'dist', 'client');
  const prodStaticEntryPath = path.join(prodStaticPath, 'index.html');
  const prodStaticServerPath = path.join(__dirname, 'dist', 'server');

  const template = fs.readFileSync(prodStaticEntryPath, 'utf8');
  const { render } = require(path.resolve(prodStaticServerPath, 'entry-server.js'));

  app.use(express.static(prodStaticPath));
  app.use('/atom', express.static(path.join(__dirname, './dist/client', 'atom.xml')));
  app.use('/rss', express.static(path.join(__dirname, './dist/client', 'rss.xml')));
  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;
      const appHtml = await render(url, require('./dist/client/ssr-manifest.json'));

      const html = template.replace(`<!--ssr-outlet-->`, appHtml);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (error) {}
  });
};
