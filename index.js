import jsdom from 'jsdom'
import { DIR } from './utils/constants.js'
// import { parseLaVozDeGalicia } from './parsers/laVozDeGalicia.js'
import ElCorreoGallego from './parsers/elCorreoGallego.js'

const { JSDOM } = jsdom;

const getContent = (url) => {
	return fetch(url)
		.then(res => res.text())
		.then(text => {
			return new JSDOM(text).window.document
		})
}


const mediums = [
	ElCorreoGallego
]

mediums.forEach(Medium => {
	const myMedium = new Medium()

	const aaa = getContent(myMedium.url.href)
				.then( doc => myMedium.parseList(doc) )
				.then( arr => {
					for (const noticia of arr) {
						const data = getContent(noticia.href)
						.then( doc => myMedium.parseSingle(doc, noticia.href, noticia.id) )
						.then( item => {
							console.log(item);
						})
					}
				} )
});



