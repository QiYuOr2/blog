const express = require('express')
const devServer = require('./dev')
const prodServer = require('./prod')

const createExpressApp = async () => {
  const app = express()
  return { app }
}

module.exports = createExpressApp().then(async ({ app }) => {
  const isDev = process.env.NODE_ENV === 'development'
  isDev ? await devServer(app) : await prodServer(app)
  const port = 80
  app.listen(port, () => {
    console.log(`You can navigate to http://localhost:${port}`)
  })
})
