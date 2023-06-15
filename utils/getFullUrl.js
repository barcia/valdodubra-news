import { DIR } from './constants.js'

const getFullUrl = ({ href, medium }) => {
	let url;

	try {
		url = new URL(href);
	} catch (error) {
		const base = DIR[medium]?.base || '';
		url = new URL(href, base);
	}
  
	return url;
  };

export default getFullUrl