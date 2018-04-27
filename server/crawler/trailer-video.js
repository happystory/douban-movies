const puppeteer = require('puppeteer')

const base = `https://movie.douban.com/subject/27036735/`
const doubanId = '27036735'
const videoBase = `https://movie.douban.com/trailer/27036735/`

const url = 'https://movie.douban.com/subject/27036735/'

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})

;(async () => {
  console.log('Start visit the target page')

  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false,
    // headless: false
  })

  const page = await browser.newPage()
  page.setViewport({
    width: 1376,
    height: 768,
  });
  page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36')

  await page.goto(url, {
    waitUntil: 'networkidle2'
  })

  await page.waitFor(1000)
  const result = await page.evaluate(() => {
    var $ = window.$
    var it = $('.related-pic-video')

    if (it && it.length > 0) {
      var link = it.attr('href')
      var cover = it.find('img').attr('src')
      return {
        link,
        cover
      }
    }

    return {}
  })

  let video
  if (result.link) {
    await page.goto(result.link, {
      waitUntil: 'networkidle2'
    })
    await page.waitFor(2000)

    video = await page.evaluate(() => {
      var $ = window.$
      var it = $('source')

      if (it && it.length > 0) {
        return $(it[0]).attr('src')
      }
      return ''
    })
  }

  // await page.screenshot({path: 'screenshot.png'});

  const data = {
    video,
    doubanId,
    cover: result.cover
  }

  await browser.close()

  process.send({
    result: data
  })
  process.exit(0)
})()
