import { deleteAsync } from "del";
export const resetAll = () => { return deleteAsync(app.path.buildFolder); }
export const resetMain = () => {
	return deleteAsync([
		app.path.clean.html,
		app.path.clean.css,
		app.path.clean.js,
		app.path.clean.images
	]);
}
export const resetExt = () => {
	return deleteAsync([
		app.path.clean.cssExt,
		app.path.clean.jsExt
	]);
}
export const resetDevUtils = () => { return deleteAsync(app.path.clean.devutils); }
export const resetFavicons = () => { return deleteAsync(app.path.clean.favicons); }
export const resetFonts = () => { return deleteAsync(app.path.clean.fonts); }
export const resetFontFaces = () => { return deleteAsync(app.path.clean.fontfaces); }
export const resetImagesResponsive = () => { return deleteAsync(app.path.clean.imagesResponsive); }
export const resetSvgSprites = () => { return deleteAsync(app.path.clean.svgsprites); }
export const resetSprites = () => { return deleteAsync(app.path.clean.sprites); }
// export const cleanUnnecessary = () => { return deleteAsync(app.path.clean.unnecessary); }