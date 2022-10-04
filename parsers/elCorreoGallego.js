const Article = require('../models/Article')
const Image = require('../models/Image')
const { MEDIUM } = require('../utils/constants')

const parseElCorreoGallego = (doc) => {

	const articles = [...doc.querySelectorAll('.noticias > article.article.element')]


	return articles.map(article => {

	const slug = article.querySelector('.left-block > a').href

		return new Article({
			medium: MEDIUM.elCorreoGallego,
			title: article.querySelector('h2 span').textContent,
			excerpt: undefined,
			url: `https://www.elcorreogallego.es${slug}`,
			date: undefined,
			premium: false,
			featuredImg: new Image({
				src: article.querySelector('img')?.src,
				alt: article.querySelector('img')?.alt,
				width: article.querySelector('img')?.width,
				height: article.querySelector('img')?.height
			})
		}).toJson()

	})
}

module.exports = parseElCorreoGallego