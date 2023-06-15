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

const elCorreoDubra = new URL(DIR.elCorreoGallego.council, DIR.elCorreoGallego.base)


const aaa = getContent(elCorreoDubra.href)
				.then( doc => ElCorreoGallego.parseList(doc) )
				.then( arr => {
					for (const noticia of arr) {
						const data = getContent(noticia.href)
						.then( doc => ElCorreoGallego.parseSingle(doc, noticia.href, noticia.id) )
						.then( item => {
							console.log(item);
						})
					}
				} )

