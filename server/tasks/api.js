const axios = require('axios')

async function fetchMovie (item) {
  const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`
  const res = await axios.get(url)
  return res.data
}

;(async () => {
  let movies = [
    { doubanId: 27620552,
    title: '鬼灯的冷彻 第二季 其之二',
    rate: 9.3,
    poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2516585731.jpg'
    }
  ]

  movies.map(async movie => {
    let movieData = await fetchMovie(movie)
    console.log(movieData)
  })
})()
