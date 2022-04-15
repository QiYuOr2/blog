const { createServer: createViteServer } = require('vite')
const fs = require('fs')
const path = require('path')

module.exports = async function (app) {
  //
  const viteServer = await createViteServer({
    root: process.cwd(),
    logLevel: 'info',
    server: {
      middlewareMode: 'ssr',
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
  })

  // 注册vite 开发环境中间件
  app.use(viteServer.middlewares)
  app.use('*', async (req, res) => {
    const { render } = await viteServer.ssrLoadModule('/src/entry-server.js')
    let template = fs.readFileSync(
      path.resolve(__dirname, 'index.html'),
      'utf-8'
    )
    try {
      const url = req.originalUrl
      template = await viteServer.transformIndexHtml(url, template)
      const appHtml = await render(url, {})
      const html = template.replace(`<!--app-html-->`, appHtml)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (error) {
      viteServer.ssrFixStacktrace(error)
    }
  })
}
