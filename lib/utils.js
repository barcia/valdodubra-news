const shortYearToFull = shortYear => {
	// console.log('shoryear', shortYear);
	// if (isNaN(valor)) {
	// 	throw new Error("El valor proporcionado no es un número válido")
	// }

	const currentCentury = new Date().getFullYear().toString().slice(0, 2);
	const fullYear = Number(`${currentCentury}${shortYear}`);
  
	return fullYear;
  };
  

export { 
	shortYearToFull
 }