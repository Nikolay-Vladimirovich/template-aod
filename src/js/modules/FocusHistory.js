export default class FocusHistory {
	constructor(options = {}) {
		this._statement = {
			lastElement: 123,
			desiredElement: 456
		}
		
	}
	saveFocus(el) {
		this._focusHistory.lastElement = el;
		this._focusHistory.desiredElement = el;
		// console.log(this._focusHistory);
	}
}