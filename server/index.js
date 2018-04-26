const Koa = require('koa')
const ejs = require('ejs')
const app = new Koa()
const { ejsTpl } = require('./tpl')

app.use(async (ctx, next) => {
  ctx.type = 'html'
  ctx.body = ejs.render(ejsTpl, {
    you: 'test'
  })
})
app.listen(8090)