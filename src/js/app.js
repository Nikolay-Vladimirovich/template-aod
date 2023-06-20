// import * as pixelperfect from "./modules/pixelperfect.js";
// window.addEventListener('load', pixelperfect.pixelperfect);

import * as myFunctions from "./modules/functions.js";
import * as misc from "./modules/misc.js";
import * as validation from "./modules/validation.js";
import Helpers from "./modules/Helpers.js";
import FocusHistory from "./modules/FocusHistory.js";
import NavigationBar from "./modules/NavigationBar.js";
import Trapping from "./modules/Trapping.js";
import ScrollSpy from "./modules/ScrollSpy.js";
import Swiper, { Pagination, Keyboard } from 'swiper';

myFunctions.isWebp();

window.addEventListener('load', misc.misc);
window.addEventListener('load', validation.validation);

// console.log = function() {}
// console.dir = function() {}

export const helpers = new Helpers();

export const focusHistory = new FocusHistory();
// export let trapping = new Trapping({
// 	regions: {
// 		navbar: {
// 			domSelector: '.navbar',
// 			tabSelectors: ['.menu__link', '.logo a' /*, '.navbar__toggler' */],
// 		},
// 		footer: {
// 			domSelector: '.footer',
// 			tabSelectors: []
// 		}
// 	}

// });
export const navbar = new NavigationBar();


export const spy = new ScrollSpy({
	_innerPointerEvent: true,
	_innerPointerEventTag: 'span'
});



const swiper = new Swiper('.swiper', {
	loop: true,
	modules: [Pagination, Keyboard],
	keyboard: {
		enabled: true
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true
	},
});



