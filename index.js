const axios = require('axios').default;
const jsdom = require("jsdom");

const { JSDOM } = jsdom;

const { MEDIUM, URL } = require('./utils/constants')

const parseLaVozDeGalicia = require('./parsers/laVozDeGalicia')
const parseElCorreoGallego = require('./parsers/elCorreoGallego')


const getContent = (url) => {
	return axios({
		method: 'get',
		url: url,
		responseType: 'document'
	})
	.then( res => {
		return new JSDOM(res.data).window.document
	})
}


const aaa = getContent(URL.elCorreoGallego.mainPage)
				.then( doc => parseElCorreoGallego(doc) )
				.then( arr => console.log(arr) )

