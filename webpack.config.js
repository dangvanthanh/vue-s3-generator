var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './src/app.js',
	output: {
		filename: './app.js'
	},
	module: {
		loaders: [
			{ test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
			{ test: /\.vue$/, loader: 'vue' },
			{ test: /\.js$/, loader: 'babel', exclude: /node_modules/ }
		]
	},
	babel: {
		presets: ['es2015'],
		plugins: ['transform-runtime']
	},
	plugins: [
		new ExtractTextPlugin('./app.css')
	]
};

if (process.env.NODE_ENV === 'production') {
	module.exports.plugins = [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: "'production'"
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: false,
			compress: {
				warnings: false
			},
			output: {
				comments: false
			}
		})
	]
} else {
	module.exports.devtool = '#source-map';
}
