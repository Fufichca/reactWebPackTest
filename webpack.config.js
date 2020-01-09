const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let conf = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
        publicPath: 'dist/'
    },
    devServer: {
        overlay: true //ошибка на черном фоне
        // contentBase: path.join(__dirname, './dist'),
        // compress: true,
        // port: 9000,
        // watchContentBase: true,
        // progress: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
                }
            },
            {
                test: /\.css$/i,
                use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                    esModule: true,
                    },
                },
                'css-loader',
                ],
            },
            {
                test: /\.scss$/,
                use:  [ 'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(
            {filename: 'style.css'}
        ),
        new HtmlWebpackPlugin(),
    ]
};

module.exports = (env, options) => {
    let production = options.mode === 'production';

    conf.devtool = production ? false : 'eval-sourcemap';

    return conf;
}