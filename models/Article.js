const crypto = require('crypto')

class Article {
	constructor({ medium, title, excerpt, url, date, featuredImg, premium }) {
		this.id = crypto.createHash('sha256', url).digest('hex')
		this.medium = medium
		this.title = title
		this.url = url
		this.date = date ? date.toLocaleString('es-ES', {
			timeZone: 'Europe/Madrid',
		}) : undefined
		this.excerpt = excerpt
		this.featuredImg = featuredImg
		this.premium = premium
	}

	toJson() {
		return {
			id: this.id,
			medium: this.medium,
			title: this.title,
			url: this.url,
			date: this.date,
			excerpt: this.excerpt,
			featuredImg: this.featuredImg,
			premium: this.premium
		}
	};
}

module.exports = Article