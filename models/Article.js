import createUuid from '../utils/createId.js'

export default class Article {
	constructor({ id, medium, title, excerpt, url, date, content, premium = false }) {
		this.id = id || createUuid(url)
		this.medium = medium
		this.title = title
		this.excerpt = excerpt
		this.url = url
		this.date = date 
		this.content = content
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
			content: this.content,
			premium: this.premium,
		}
	};
}