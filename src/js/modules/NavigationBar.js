import Trapping from "./Trapping.js";
import { focusStorage } from "../app.js";
import { helpers } from "../app.js";

export default class NavigationBar {
	constructor(options = {}) {
		// Переназначаем значения по-умолчанию заданными в опциях, если они заданы : начало
		this.trappingEnable = options.trappingEnable ?? true;
		if (this.trappingEnable) {
			this._trappingSettings = options._trappingSettings ?? {
				regions: {
					navbar: {
						domSelector: '.navbar',
						tabSelectors: ['.menu__link', '.logo a'],
					}/* ,
					citiesSearch: {
						domSelector: '.search-cities',
						tabSelectors: []
					} */
				}
			}
		}
		this._class = {
			navbar: options.navbarClass ?? 'navbar',
			toggler: options.togglerClass ?? 'navbar__toggler',
			navWrp: options.navWrpClass ?? 'nav-wrap',
			nav: options.navClass ?? 'nav',
			menu: options.menuClass ?? 'menu',
			menuItems: options.menuItemsClass ?? 'menu__link',
			ctrlsWrp: options.ctrlsWrpClass ?? 'ctrls-wrap',
			psWrp: options.psWrpClass ?? 'plainsight-wrap',
			ps: options.psClass ?? 'plainsight',
			psWrpMainstay: options.psWrpMainstayClass ?? 'page-header',
		}
		this.psWrpPos = options.psWrpPos ?? 'afterbegin'; // Куда относительно "опоры" будет добавлятся "обертка"
		this.hop = options.hop ?? ['.logo']; // Элементы, которые должны "перепрыгивать" на "посадочное место" при трансформации меню

		this.staticPoint = this.staticPoint ?? '992px'; // С какой ширины вьюпорта меню будет статичным
		this.mdPoint = this.mdPoint ?? '768px'; // С какой ширины вьюпорта меню будет статичным

		// Далее получаем "живой" html-объект navbar
		this.$navbar = document.getElementsByClassName(this._class.navbar)[0];

		if (this.$navbar) {// Если элемент navbar существует на странице, то
			// производим поиск состоявляющих его элементов и их присвоение переменным
			console.log(`Модуль NavigationBar - включен`);
			this.$toggler =
				this.$navbar.getElementsByClassName(this._class.toggler)[0] ?? // В первую очередь ищем внутри navbar'а
				document.getElementsByClassName(this._class.toggler)[0]; // если внутри navbar'а не находим, то ищем за пределами
			// this.$toggler = this.$navbar.querySelector('.' + this._class.toggler);
			this.$navWrp = this.$navbar.getElementsByClassName(this._class.navWrp)[0];
			this.$nav = this.$navbar.getElementsByClassName(this._class.nav)[0];
			this.$ctrlsWrp = this.$navbar.getElementsByClassName(this._class.ctrlsWrp)[0];
			this.$menu = this.$nav.getElementsByClassName(this._class.menu)[0];
			this.$menuItems = this.$nav.getElementsByClassName(this._class.menuItems);
			this.$menuItemsArr = Array.from(this.$menuItems);
			// Далее получаем html-объект из живой коллекции каждой сущности
			this.$hop = this.hop.map((el) => {
				return this.$navbar.querySelector(el);
			});

			// Далее получаем html-объекты для посадочного места 
			this.$psWrpMainstay = document.getElementsByClassName(this._class.psWrpMainstay)[0];
			this.$psWrp = document.getElementsByClassName(this._class.psWrp)[0];
			if (this.$psWrp) { this.$ps = this.$psWrp.getElementsByClassName(this._cs.ps)[0]; }

			//
			this.statMQ = window.matchMedia('(min-width: ' + this.staticPoint + ')');
			this.mdMQ = window.matchMedia('(min-width: ' + this.mdPoint + ') and (max-width: ' + this.staticPoint + ')');
			this.minMQ = window.matchMedia('(max-width: ' + this.mdPoint + ')');

			this._toggler = {
				isEnabled: true,
				isVisible: undefined,
				isActive: true,
				stateClass: {
					active: 'is-active',
					visible: 'is-visible',
					enabled: 'is-enabled',
				}
			};
			this._navbar = {
				isMinimal: undefined,
				isMD: undefined,
				isStatic: undefined,
				isExpanded: false,
				isVisible: undefined,
				stateClass: {
					visible: 'is-visible',
					expanded: 'is-expanded',
				}
			};
			this._pagebody = {
				stateClass: {
					locked: 'is-locked'
				}
			};

			this.trapping = {};

			this.init();
			this.listen();
		}
	}
	init() {
		this.buildPS();
		this.showPS();
		if (this.trappingEnable) {
			this.trapping = new Trapping(this._trappingSettings)
		}
		this.render();
	}
	render() {
		this.setStates();
		this.drawHTML();
		this.bindingHandlers();
	}
	listen() {
		this.statMQ.addEventListener('change', ()=>{this.render()});
		this.mdMQ.addEventListener('change', ()=>{this.render()});
		this.minMQ.addEventListener('change', ()=>{this.render()});
	}
	setStates() {
		this._navbar.isStatic = this.statMQ.matches ? true : false;
		this._navbar.isMD = this.mdMQ.matches ? true : false;
		this._navbar.isMinimal = this.minMQ.matches ? true : false;
		this._navbar.isVisible = this.statMQ.matches ? true : false; // Состояние видимости для навбара
		this._toggler.isVisible = this.statMQ.matches ? false : true; // Состояние видимости для тоглера
	}
	drawHTML() {
		this.drawClasses();
		this.drawAccessibility();
	}
	bindingHandlers() {
		this.$toggler.addEventListener('click', ()=>{this.togglerHandler()});
		document.addEventListener('keydown', e => {
			if (e.code == 'Escape') {
				this.togglerHandler();
			}
		});
	}
	drawClasses() {
		if (this._toggler.isVisible) {
			this.$toggler.classList.add(this._toggler.stateClass.visible);
		} else { this.$toggler.classList.remove(this._toggler.stateClass.visible); }
		if (this._toggler.isActive) {
			this.$toggler.classList.add(this._toggler.stateClass.active);
		} else { this.$toggler.classList.remove(this._toggler.stateClass.active); }
		if (this._navbar.isExpanded) {
			this.$navbar.classList.add(this._navbar.stateClass.expanded);
			this.hidePS();
		} else {
			this.$navbar.classList.remove(this._navbar.stateClass.expanded);
			this.showPS();
		}
		if (this._navbar.isMinimal && this._navbar.isExpanded) {
			document.body.classList.add(this._pagebody.stateClass.locked);
		} else { document.body.classList.remove(this._pagebody.stateClass.locked); }
	}
	drawAccessibility() {
		if (this.trappingEnable) {
			if (!this._navbar.isStatic) { // Если не "статично"
				if (this._navbar.isExpanded) {
					this.trapping.setTI('navbar');
					// this.$toggler.tabIndex = -1;
				} else {
					this.trapping.resetTI();
					this.trapping.disableTI('navbar');
					// this.$toggler.tabIndex = 0;
				}
				// this.$toggler.tabIndex = 0;
			} else {
				this.trapping.resetTI();
				this.$toggler.tabIndex = -1;
			}
		}
	}
	togglerHandler() {
		if (this._toggler.isVisible && this._toggler.isEnabled) {
			this._toggler.isActive = this._toggler.isActive ? false : true;
		}
		if (!this._navbar.isStatic) { // Если меню !НЕ "статично"
			this._navbar.isExpanded = this._navbar.isExpanded ? false : true;
		}
		this.drawHTML();
	}

	showPS() {
		this.$ps.classList.add('is-visible');
	}
	hidePS() {
		this.$ps.classList.remove('is-visible');
	}
	buildPS() {
		let ctx = this;
		let isExist = this.$ps ?? false;
		if (isExist) {
			cloneHop(ctx);
		} else {
			buildPsWrp(ctx);
			cloneHop(ctx);
		}
		function cloneHop(ctx) {
			ctx.$hop.map(el => {
				ctx.$ps.insertAdjacentElement('afterBegin', el.cloneNode(true));
			});
		}
		function buildPsWrp(ctx) {
			let el = document.createElement('div');
			el.classList.add(ctx._class.ps);
			let wrap = document.createElement('div');
			wrap.classList.add(ctx._class.psWrp);
			wrap.appendChild(el);
			ctx.$psWrpMainstay.insertAdjacentElement(ctx.psWrpPos, wrap);
			// Присвавиваем построенный объект в переменную:
			ctx.$psWrp = document.getElementsByClassName(ctx._class.psWrp)[0];
			ctx.$ps = ctx.$psWrp.getElementsByClassName(ctx._class.ps)[0];
		}
	}
}