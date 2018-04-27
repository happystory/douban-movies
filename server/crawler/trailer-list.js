const puppeteer = require('puppeteer')

const url = 'https://movie.douban.com/tag/#/?sort=R&range=6,10&tags='

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

  for(let i = 0; i < 1; i++) {
    await page.waitForSelector('.more')
    await page.click('.more')
  }

  await page.waitFor(1000)
  const result = await page.evaluate(() => {
    var $ = window.$
    var items = $('.list-wp a')
    var links = []

    if (items.length >= 1) {
      items.each((index, item) => {
        let it = $(item)
        let doubanId = it.find('div').data('id')
        let title = it.find('.title').text()
        let rate = +it.find('.rate').text()
        let poster = it.find('img').attr('src').replace('s_ratio', 'l_ratio')

        links.push({
          doubanId,
          title,
          rate,
          poster
        })
      })
    }
    return links
  })

  await page.screenshot({path: 'screenshot.png'});

  await browser.close();

  process.send({result})
  process.exit(0)
})()
