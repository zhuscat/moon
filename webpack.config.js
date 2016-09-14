var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var FONT_AWESOME_PATH = path.resolve(ROOT_PATH, 'node_modules', 'font-awesome')
var REACT_SPINKIT_PATH = path.resolve(ROOT_PATH, 'node_modules', 'react-spinkit')
var REACT_LOADING_BAR_PATH = path.resolve(ROOT_PATH, 'node_modules', 'react-progress-2')
var REACT_ALERT_PATH = path.resolve(ROOT_PATH, 'node_modules', 'react-s-alert', 'dist')
var ANTD = path.resolve(ROOT_PATH, 'node_modules', 'antd')

module.exports = {
    // 默认寻找文件夹下面的index.js文件
    entry: {
        app: path.resolve(APP_PATH, 'index.jsx'),
    },
    output: {
        path: BUILD_PATH,
        filename: '[name].[hash].js'
    },
    plugins: [
        new HtmlwebpackPlugin({
            title: 'IUR 政策法规平台'
        })
    ],
    devServer: {
        historyApiFallback: true,
        hot: false,
        inline: true,
        progress: true,
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                include: APP_PATH,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /(\.scss|\.css)$/,
                loaders: ["style", "css", "sass"],
                include: APP_PATH
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=50000&name=[path][name].[ext]'
            },
            {
                test: /\.css$/,
                loaders: ["style", "css"],
                include: [FONT_AWESOME_PATH, REACT_SPINKIT_PATH, REACT_LOADING_BAR_PATH, REACT_ALERT_PATH, ANTD]
            }
        ]
    },
    devtool: 'eval-source-map'
};
