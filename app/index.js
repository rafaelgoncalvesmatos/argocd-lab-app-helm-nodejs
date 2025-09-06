
const USER = 'Rafael Goncalves'
const PORT = 3000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()

var word = "Bolsonaro"

const noticias = [
  {
    name: 'Veja',
    base: 'https://veja.abril.com.br/',
    address: 'https://veja.abril.com.br/politica/'
  },
  {
    name: 'Google',
    base: 'https://news.google.com/',
    address: 'https://news.google.com/'
  },
  {
    name: 'TVSenado',
    base: 'https://www12.senado.leg.br/tv',
    address: 'https://www12.senado.leg.br/tv'
  },
  {
    name: 'Uol',
    base: 'https://www.uol.com.br/',
    address: 'https://noticias.uol.com.br/politica/'
  },
  {
    name: 'G1',
    base: 'https://g1.globo.com/',
    address: 'https://g1.globo.com/'
  },
  {
    name: 'Folha',
    base: 'https://www.folha.uol.com.br/',
    address: 'https://www1.folha.uol.com.br/poder/'
  }
]

const articles = []

articles.push(`Palavra chave usada ${word}`)

noticias.forEach(noticias => {
  axios.get(noticias.address)
    .then(response => {
      const html = response.data
      const $ = cheerio.load(html)


      $(`a:contains(${word})`, html).each(function () {
        const title = $(this).text()
        const url = $(this).attr('href')
        
        articles.push({
          title,
          url: url,
          base: noticias.base,
          source: noticias.name
        })
      })
    })
})

app.get('/', (req, res) => {
  res.json(`Welcome ${USER} to my Climate Change New API`)
})

app.get('/v1/news', (req, res) => {
  res.json(articles)
})


// app.get('/news/:noticiasId', async (req, res) => {
//   const noticiasId = req.params.noticiasId
  
//   const noticiasAddress =  noticias.filter(noticias => noticias.name === noticiasId)[0].address
  
//   console.log(noticiasAddress)
//   // axios.get()
// })

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))