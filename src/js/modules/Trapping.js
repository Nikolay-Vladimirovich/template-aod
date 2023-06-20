// import { focusHistory } from "../app.js";
import { helpers } from "../app.js";

export default class Trapping {
	constructor(options = {}) {
		this.regions = options.regions ?? null;
		// Модуль производит обход всего документа, ищет те элементы,
		// для которых доступен фокус по нажатию на tab

		// Для реализации этого обхода мы составляем множество элементов,
		// для которых по-умолчания доступен фокус по нажатию на tab
		this.default = {
			body: {
				tabSelectors:
					[
						'a', 'button', 'input', 'textarea', 'label', 'select',
						'details', 'audio', 'video', 'object', '[contenteditable]', '[tabindex]'
					],
				domEl: document.body
			}
		};
		this.merged = {};
		this.trapped = {};

		this.buildData();

	}

	buildData() {
		// Зададим dom-элемент если не задан в опциях

		for (let r in this.regions) {
			if (!this.regions[r].domEl) {
				let el;
				if (this.regions[r].domSelector) {
					el = document.querySelector(this.regions[r].domSelector)
					if (el) { this.regions[r].domEl = el; /* console.log(`${r} - trapped`)  */}
					else { console.log(`Ошибка! Не верно указан domSelector для ${r}`) }
				} else { console.log(`Ошибка! Не указан domSelector для ${r}`) }
			} else { /* console.log(`${r} - trapped`) */ }
		}
		this.merged = Object.assign(this.default, this.regions);



		for (let r in this.merged) {
			this.merged[r].tabIndexes = new Map();
		}

		for (let r in this.merged) {
			for (let i = this.merged[r].tabSelectors.length - 1; i >= 0; i--) {
				let nodelist = this.merged[r].domEl.querySelectorAll(this.merged[r].tabSelectors[i]);
				for (let j = nodelist.length - 1; j >= 0; j--) {
					this.merged[r].tabIndexes.set(nodelist[j], nodelist[j].tabIndex);
				}
			}
		}
		// console.log('---');
		// console.dir(this.merged);
	}
	setTI(region) {
		this.disableTI();
		// console.log(region);
		// console.dir(this.merged);
		for (let item of this.merged[region].tabIndexes) {
			item[0].tabIndex = item[1];
		}
		// console.log('setTI');
	}
	disableTI(region) {
		if (region) {
			for (let item of this.merged[region].tabIndexes) {
				item[0].tabIndex = -1;
			}
			// console.log(`disableTI region ${region}`);
		} else {
			for (let item of this.merged.body.tabIndexes) {
				item[0].tabIndex = -1;
			}
			// console.log('disableTI all');
		}
	}
	resetTI() {
		for (let item of this.merged.body.tabIndexes) {
			item[0].tabIndex = item[1];
		}
		// console.log('resetTI');
	}
}