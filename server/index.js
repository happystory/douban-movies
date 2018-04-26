const path = require('path')
const Koa = require('koa')
const views = require('koa-views')
const app = new Koa()

app.use(views(path.resolve(__dirname + '/views'), {
  extension: 'ejs'
}))

app.use(async (ctx, next) => {
  await ctx.render('home', {
    you: 'John'
  })
})
app.listen(8090)
