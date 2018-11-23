import webpack from "webpack";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
	devtool: "inline-source-map",
	entry: [path.resolve(__dirname, "src/index")],
	target: "web",
	output: {
		path: path.resolve(__dirname, "src"),
		publicPath: "/",
		filename: "bundle.js"
	},
	mode: "development",
	resolve: {
		extensions: ["*", ".js", ".jsx", ".json"]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "src/index.html",
			inject: true
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: false,
			debug: true,
			noInfo: true
		})
	],
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loaders: ["babel-loader"] },
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] }
		]
	}
};
