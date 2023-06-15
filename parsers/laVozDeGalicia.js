import ListItem from '../models/ListItem.js'

export const parseLaVozDeGalicia = (doc) => {

	const articles = [...doc.querySelectorAll('main article')]

	return articles.map(article => {

		const slug = article.querySelector('h4 a').href

		return new ListItem({
			medium: 1,
			title: article.querySelector('h4 a').textContent,
			excerpt: article.querySelector('p.entradilla')?.textContent,
			url: `https://www.lavozdegalicia.es${slug}`,
			date: new Date(Date.parse(article.querySelector('strong.date_pos').textContent)),
		}).toJson()
	})
}