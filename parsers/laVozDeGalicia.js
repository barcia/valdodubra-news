const Article = require('../models/Article')
const Image = require('../models/Image')
const { MEDIUM } = require('../utils/constants')

const parseLaVozDeGalicia = (doc) => {

	const articles = [...doc.querySelectorAll('main div.col.sz-dk-67.txt-blk article')]

	return articles.map(article => {

		const slug = article.querySelector('h4 a').href

		return new Article({
			medium: MEDIUM.laVozDeGalicia,
			title: article.querySelector('h4 a').textContent,
			excerpt: article.querySelector('p.entradilla')?.textContent,
			url: `https://www.lavozdegalicia.es${slug}`,
			date: new Date(Date.parse(article.querySelector('strong.date_pos').textContent)),
			premium: article.querySelector('h4')?.classList.contains('i-access-subscribers'),
			featuredImg: new Image({
				src: article.querySelector('img')?.src,
				alt: article.querySelector('img')?.alt,
				width: article.querySelector('img')?.width,
				height: article.querySelector('img')?.height
			})
		}).toJson()

	})
}

module.exports = parseLaVozDeGalicia