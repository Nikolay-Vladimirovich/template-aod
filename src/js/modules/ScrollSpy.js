import { focusHistory, trapping } from "../app.js";
import { navbar } from "../app.js";

export default class ScrollSpy {
	constructor(options = {}) {
		// Переназначаем значения по-умолчанию заданными в опциях, если они заданы : начало
		this.enabled = options.enabled ?? true;

		if (this.enabled) {
			// console.log(`Модуль ScrollSpy - включен`);
			this.navbarClass = options.navbarClass ?? 'navbar';
			this.menuItemsClass = options.menuItemsClass ?? 'menu__link';
			this._innerPointerEvent = options._innerPointerEvent ?? false;
			if (this._innerPointerEvent) {
				this._innerPointerEventTag = options._innerPointerEventTag ?? 'span';
			}
			// Переназначаем значения по-умолчанию заданными в опциях, если они заданы : конец
			// Далее получаем "живой" html-объект navbar
			this.$navbar = document.getElementsByClassName(this.navbarClass)[0];
			if (this.$navbar) {// Если элемент navbar существует на странице, то
				this.$menuItems = this.$navbar.getElementsByClassName(this.menuItemsClass);
				this.$menuItemsArr = Array.from(this.$menuItems);
				this._menuItems = {
					default: {
						activeItem: 0
					},
					stateClass: {
						active: 'is-active',
						clicked: 'is-clicked'
					}
				}
				this._statement = {
					inScrollTo: false, // Прокрутки не происходит, значит false
					inScrolling: false
				}
				this.defaultBlocks = [];
				this.defaultBlocksId = [];

				// Оптимизация производительности через техники throttle and debounce
				this._loadPageScroll = {
					now: Date.now,
					timeout: null,
					lastCall: 0,
					delay: 1000
				}
				this._helperScroll = {
					now: Date.now,
					timeout: null,
					lastCall: 0,
					delay: 100
				}
				this.init();
				this.listen();
			}
		}
	}
	init() {
		this.translateIdToDataset();

		if (window.location.hash) {
			this.setCurrentHash(window.location.hash);
			window.addEventListener('load', () => {
				this._tdLoadPage(() => { // Таймаут перед первым scrollToId после загрузки страницы
					this.scrollToId(window.location.hash);
				});
			});
		}
	}
	listen() {
		window.addEventListener('hashchange', (e) => {
			if (!this._statement.inScrolling) {
				this.scrollToId(window.location.hash);
			}
		});
		window.addEventListener('scroll', () => {
			this.onScrollHandler();
		});
		this.$menuItemsArr.map(item => {
			item.addEventListener('click', (e) => {
				e.preventDefault();
				if (this._innerPointerEvent) {
					// Ловим клик внутри пункта меню на тэге, указанном в опциях
					// (чтобы исключить реакцию на нажатие на декоративные элементы)
					if (e.target.tagName == String(this._innerPointerEventTag).toUpperCase()) {
						this.menuItemHandler(item);
					} else { return false; }
				} else {
					this.menuItemHandler(item);
				}
			});
			item.addEventListener('keydown', (e) => {
				if (e.code == "Space" || e.code == "Enter") {
					e.preventDefault();
					this.menuItemHandler(item);
				}
			});
		});
	}
	menuItemHandler(item) {
		this.setCurrentHash(item.hash);
		this.scrollToId(window.location.hash);
		if (navbar._navbar.isMinimal) {
			navbar.togglerHandler();
		}
	}
	onScrollHandler() {
		this._td(() => {
			// console.log('onScrollHandler START');
			this._statement.inScrolling = true
			let currentPosY = window.pageYOffset;
			for (let i = this.$menuItemsArr.length - 1; i >= 0; i--) {
				let menuItemHash = this.$menuItemsArr[i].hash;
				let linkedContentId = menuItemHash.replace(/\#/g, '');
				// console.log(linkedContentId);
				let $itemForActivate;
				if (menuItemHash.includes(linkedContentId)) {
					$itemForActivate = this.$menuItemsArr[i];
					// Получаем соответствующий пункт меню
				}
				let linkedContent = document.querySelector(`[data-linked-hash=${linkedContentId}]`);
				if (currentPosY >= (this.elemOffsetTop(linkedContent) - window.innerHeight / 2)) {
					this.setMenuItemActive($itemForActivate);
					this.setCurrentHash(menuItemHash);
					break;
				} else {
					this.removeMenuItemActive();
				}
			}
			this._td(() => {
				// console.log('onScrollHandler STOP');
				this._statement.inScrolling = false;
			});
		});
	}
	scrollToId(addressHash) {
		if (addressHash) {
			let $itemForActivate;
			this.$menuItemsArr.map(el => {
				const menuItemHash = String(el.hash);
				if (menuItemHash.includes(addressHash)) { // Получаем соответствующий хэшу (в адресной строке) пункт меню
					$itemForActivate = el;
				}
			});
			const addressId = String(addressHash).replace(/\#/g, '');
			let target = document.querySelector(`[data-linked-hash=${addressId}]`);
			let navbarHeight = navbar._navbar.isMinimal ? 0 : this.$navbar.clientHeight;
			if (target) {
				let styles = window.getComputedStyle(target);
				let pos = this.elemOffsetTop(target) - navbarHeight - parseFloat(styles.marginTop);
				this.setMenuItemClicked($itemForActivate);
				this.scrollToHandler(pos, () => {
					this.setMenuItemActive($itemForActivate);
				});
			}
		} else {
			this.removeMenuItemActive();
		}
	}
	scrollToHandler(offset, callback) {
		const fixedOffset = offset.toFixed();
		const _onScroll = () => {
			if (window.pageYOffset.toFixed() === fixedOffset) {
				window.removeEventListener('scroll', thrdeb);
				window.addEventListener('scroll', () => {
					this.onScrollHandler();
				});
				callback();
			}
		}
		const thrdeb = () => {
			this._td(_onScroll);
		}
		window.addEventListener('scroll', thrdeb)
		thrdeb();
		window.scrollTo({ top: offset, behavior: 'smooth' });
	}
	setCurrentHash(h) {
		window.location.hash = h;
	}
	_tdLoadPage(action) {
		if (this._loadPageScroll.now > this._loadPageScroll.lastCall + this._loadPageScroll.delay) {
			action();
			this._loadPageScroll.lastCall = this._loadPageScroll.now;
		}
		this.__debounceLoadPage(action);
	}
	__debounceLoadPage(action) {
		clearTimeout(this._loadPageScroll.timeout);
		this._loadPageScroll.timeout = setTimeout(() => {
			action();
		}, this._loadPageScroll.delay);
	}
	_td(action) {
		if (this._helperScroll.now > this._helperScroll.lastCall + this._helperScroll.delay) {
			action();
			this._helperScroll.lastCall = this._helperScroll.now;
		}
		this.__debounce(action);
	}
	__debounce(action) {
		clearTimeout(this._helperScroll.timeout);
		this._helperScroll.timeout = setTimeout(() => {
			action();
		}, this._helperScroll.delay);
	}

	setMenuItemClicked(item) {
		this._removeMenuItemsClickedClass();
		item.classList.add(this._menuItems.stateClass.clicked);
	}
	setMenuItemActive(item) {
		this.removeMenuItemActive();
		item.classList.add(this._menuItems.stateClass.active);
	}
	removeMenuItemActive() {
		this._removeMenusItemActiveClass();
		this._removeMenuItemsClickedClass();
	}
	_removeMenusItemActiveClass() {
		this.$menuItemsArr.map(el => {
			el.classList.remove(this._menuItems.stateClass.active);
		});
	}
	_removeMenuItemsClickedClass() {
		this.$menuItemsArr.map(el => {
			el.classList.remove(this._menuItems.stateClass.clicked);
		});
	}
	translateIdToDataset() {
		this.$menuItemsArr.map((el) => {
			let targetElId = String(el.hash).replace(/\#/g, '');
			let targetEl = document.getElementById(targetElId);
			this.defaultBlocks.push(targetEl);
			this.defaultBlocksId.push(targetElId);
		});
		this.defaultBlocks.map((el, i) => {
			el.dataset.linkedHash = this.defaultBlocksId[i];
		});
		this.defaultBlocks.map(el => {
			el.removeAttribute('id');
		});
	}
	elemOffsetTop(node) {
		let coords = node.getBoundingClientRect();
		return coords.top + window.pageYOffset;
	}
}