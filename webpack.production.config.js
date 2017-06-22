const path = require('path');
const os = require('os');
const packageJson = require("./package.json");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ArchivePlugin = require('webpack-archive-plugin');
const webpack = require('webpack');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/public/index.html',
    filename: 'index.html',
    hash: true,
    inject: 'body'
});

const WebpackCommonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin('common');
const WebpackUglifyJsPlugin = new webpack.optimize.UglifyJsPlugin();
const WebpackAggressiveMergingPlugin = new webpack.optimize.AggressiveMergingPlugin();
const WebpackDefinePlugin = new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify("production"),
    API_URL: JSON.stringify("https://bbk.servers.weststeincard.com/api/"),
    VERSION: JSON.stringify(packageJson.version),
});

const WebpackCopyWebpackPlugin = new CopyWebpackPlugin([
    {from: 'public/assets', to: 'assets'}
]);

const WebpackArchivePlugin = new ArchivePlugin({
    output: 'dist/dist',
    format: 'tar'
});

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: "file-loader?name=/public/icons/[name].[ext]"
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            }
        ]
    },
    plugins: [
        HtmlWebpackPluginConfig,
        WebpackDefinePlugin,
        WebpackCommonsChunkPlugin,
        //WebpackUglifyJsPlugin,
        WebpackAggressiveMergingPlugin,
        WebpackCopyWebpackPlugin,
        WebpackArchivePlugin
    ],
    devServer: {
        port: 3000,
        historyApiFallback: true,
        publicPath: '/'
    }
};
