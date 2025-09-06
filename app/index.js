const USER = 'Rafael Goncalves';
const PORT = 3000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

let word = "Bolsonaro";

const noticias = [
  { name: 'Veja', base: 'https://veja.abril.com.br/', address: 'https://veja.abril.com.br/politica/' },
  { name: 'Google', base: 'https://news.google.com/', address: 'https://news.google.com/' },
  { name: 'TVSenado', base: 'https://www12.senado.leg.br/tv', address: 'https://www12.senado.leg.br/tv' },
  { name: 'Uol', base: 'https://www.uol.com.br/', address: 'https://noticias.uol.com.br/politica/' },
  { name: 'G1', base: 'https://g1.globo.com/', address: 'https://g1.globo.com/' },
  { name: 'Folha', base: 'https://www.folha.uol.com.br/', address: 'https://www1.folha.uol.com.br/poder/' }
];

let articles = [];

app.get('/', (req, res) => {
  res.json(`Welcome ${USER} to my Climate Change News API`);
});

// Endpoint que busca as notícias em tempo real
app.get('/v1/news', async (req, res) => {
  articles = [`Palavra chave usada: ${word}`];

  for (const site of noticias) {
    try {
      const response = await axios.get(site.address);
      const html = response.data;
      const $ = cheerio.load(html);

      $(`a:contains(${word})`, html).each(function () {
        const title = $(this).text();
        const url = $(this).attr('href');

        articles.push({
          title,
          url,
          base: site.base,
          source: site.name
        });
      });
    } catch (error) {
      console.error(`Erro ao buscar ${site.name}:`, error.message);
    }
  }

  res.json(articles);
});

app.listen(PORT, () => console.log(`✅ Server running on PORT ${PORT}`));