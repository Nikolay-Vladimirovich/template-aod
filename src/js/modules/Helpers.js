export default class Helpers {
	constructor(options = {}) {
		
	}
	different(arrayFrom, sub) {
		// Функция которая вычитает из массива arrayFrom другой массив sub
		return arrayFrom.filter(el => !sub.includes(el))
	}
	unique(arr) {
		// Функция которая оставляет в массиве только уникальные значения
		let result = [];
		for (let str of arr) {
			if (!result.includes(str)) {
				result.push(str);
			}
		}
		return result;
	}

}