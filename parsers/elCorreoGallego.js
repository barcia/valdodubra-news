import ListItem from '../models/ListItem.js'
import Article from '../models/Article.js'
import { DIR } from '../utils/constants.js'
import getFullUrl from '../utils/getFullUrl.js'
import { shortYearToFull } from '../lib/utils.js'

class ElCorreoGallego {
	constructor() {
	}

	static parseList(doc) {
		const articles = Array.from(doc.querySelectorAll('.opening article[itemtype="https://schema.org/NewsArticle"], .list article[itemtype="https://schema.org/NewsArticle"]'))

		if (articles.length > 0) {
			return articles.map( article => {
				const mainItem = article.querySelector('a[itemprop="url"]')
				const slug = mainItem.href
					return new ListItem({
						url: getFullUrl({href: slug, medium: 'elCorreoGallego'}),
					}).toJson()
				})
		} else {
			console.log('Not articles found');
		}
	}

	static parseSingle(doc, href, id) {
		const date = ElCorreoGallego.parseDate(doc.querySelector('.article-author__date').textContent.trim(), doc.querySelector('.article-author__hour').textContent.trim())
		const title = doc.querySelector('.headline-article h1').textContent
		const excerpt =  doc.querySelector('.headline-article h2')?.textContent.replace(/^\s+|\s+$/g, '');
		const paragraphs = Array.from(doc.querySelectorAll('p.article-body__text'))
		const content = paragraphs.map(paragraph => {
			return `<p>${paragraph.innerHTML.replace(/^\s+|\s+$/g, '')}</p>`;
		}).join('')

		return new Article({
			id,
			medium: 'elCorreoGallego',
			title,
			excerpt,
			url: href,
			date,
			content
		}).toJson()
	}

	static parseDate(dateString, hourString) {
		const dateParts = dateString.split('·'); // Divide la cadena en partes separadas por el caracter '·'
		const hourParts = hourString.split(':'); // Divide la cadena en partes separadas por el caracter '·'
	
		// Obtiene los componentes de fecha (día, mes y año) en formato numérico
		const day = parseInt(dateParts[0]);
		const month = parseInt(dateParts[1]);
		const year = parseInt(dateParts[2]);
	
		const hours = parseInt(hourParts[0]);
		const minutes = parseInt(hourParts[1]);
	
		return new Date(shortYearToFull(year), month - 1, day, hours, minutes)
	}
}

export default ElCorreoGallego