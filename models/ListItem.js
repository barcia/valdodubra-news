import createUuid from '../utils/createId.js'

export default class ListItem {
	constructor({ url }) {
		this.url = url
		this.id = createUuid(this.url.origin + this.url.pathname)
	}

	toJson() {
		return {
			id: this.id,
			href: this.url.origin + this.url.pathname
		}
	};
}