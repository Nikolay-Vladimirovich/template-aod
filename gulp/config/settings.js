// Импорт путей
// import { path } from "./path.js";
// Экспортируем объект
export const settings = {
	webpackBase: {
		module: {
			rules: [
				{
					test: /\.m?js$/,
					exclude: /(node_modules)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				},

			]
		},
	},
	webpackExt: {
		module: {
			rules: [
				{
					test: /\.m?js$/,
					exclude: /(node_modules)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				},

			]
		},
	}

}