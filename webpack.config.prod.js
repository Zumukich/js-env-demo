import webpack from "webpack";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import WebpackMd5Hash from "webpack-md5-hash";
import ExtractTextPlugin from "extract-text-webpack-plugin";

export default {
	mode: "production",
	resolve: {
		extensions: ["*", ".js", ".jsx", ".json"]
	},
	devtool: "source-map",
	entry: {
		vendor: path.resolve(__dirname, "src/vendor"),
		main: path.resolve(__dirname, "src/index")
	},
	target: "web",
	output: {
		path: path.resolve(__dirname, "dist"),
		publicPath: "/",
		filename: "[name].[chunkhash].js"
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendor",
					chunks: "all"
				}
			}
		}
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false,
			noInfo: true
		}),

		new ExtractTextPlugin("[name].[md5:contenthash:hex:20].css"),

		new WebpackMd5Hash(),

		new HtmlWebpackPlugin({
			template: "src/index.html",
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			},
			inject: true
		})
	],
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
			{ test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader?sourceMap') }
		]
	}
};
