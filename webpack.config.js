var path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const packageJson = require("./package.json");

/*const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/public/index.html',
    filename: 'index.html',
    inject: 'body'
});*/

const WebpackCopyWebpackPlugin = new CopyWebpackPlugin([
    {from: 'public/assets', to: 'assets'}
]);


module.exports = (env) => {
    return {
        entry: './src/index.js',
        output: {
            filename: 'index_bundle.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/'
        },
        module: {
            exprContextCritical: false,
            loaders: [
                {
                    test   : /\.(js)$/,
                    loaders: 'babel-loader',
                    exclude: /node_modules/
                    //include: path.join(__dirname, 'src')
                },
                {
                    test   : /\.(scss|css)$/,
                    loader : ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader!sass-loader'})
                },
                {
                    test   : /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
                    loader : 'url-loader?limit=10000&name=[name]-[hash].[ext]',
                    //include: path.join(__dirname, 'src')
                },
                {
                    test   : /\.json$/,
                    loader : 'json-loader',
                    include: path.join(__dirname, 'src')
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                PRODUCTION: JSON.stringify(false),
                API_URL: JSON.stringify(env !== undefined ? env.api_url : "http://localhost:5000/api/"),
                VERSION: JSON.stringify(packageJson.version),
            }),
            new webpack.ProvidePlugin({ReactSlick: 'react-slick'}),
            new ExtractTextPlugin('css/bundle.css'),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public/index.html'),
                inject  : 'body'
            }),
            WebpackCopyWebpackPlugin
        ],
        devServer: {
            port: 3000,
            historyApiFallback: true,
            publicPath: '/'
        }
    }
};
