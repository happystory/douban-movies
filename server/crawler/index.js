const puppeteer = require('puppeteer')

;(async () => {
  // 启动浏览器
  const browser = await puppeteer.launch({
    headless: false,
    timeout: 300000
  });

  // 打开空白页面
  const page = await browser.newPage();

  // 设置浏览器视窗
  page.setViewport({
    width: 1376,
    height: 768,
  });


  await page.goto('https://www.baidu.com/', {
    // 等待网络状态为空闲的时候才继续执行
    waitUntil: 'networkidle2'
  });

  // 获取视窗信息
  // const dimensions = await page.evaluate(() => {
  //   return {
  //     width: document.documentElement.clientWidth,
  //     height: document.documentElement.clientHeight,
  //     deviceScaleFactor: window.devicePixelRatio
  //   };
  // });
  // console.log('视窗信息:', dimensions);

  await page.focus('#kw');
  await page.type('#kw', '我是谁', {
     delay: 300, // 控制 keypress 也就是每个字母输入的间隔
  });
  await page.keyboard.press('Enter');

  await page.waitFor(3000)
  // 保存网页为图片
  await page.screenshot({path: 'screenshot.png'});

  // 关闭浏览器
  // await browser.close();
})();
