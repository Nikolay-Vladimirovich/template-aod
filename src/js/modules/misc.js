export function misc() {
	let anchors = Array.from(document.body.getElementsByTagName('a'));
	anchors.forEach(
		function (a) {
			a.addEventListener('click', function (e) {
				// if (this.getAttribute('href') == "#") { e.preventDefault() }
			})
		}
	)
}