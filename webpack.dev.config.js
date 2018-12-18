// https://blog.alexdevero.com/building-desktop-apps-electron-react/
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { spawn } = require('child_process');

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = path.resolve(__dirname, 'src');

const javascript = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: ['babel-loader', 'eslint-loader'],
};

const scss = {
  test: /\.s[c|a]ss$/,
  use: [
    'css-hot-loader',
    // "style-loader",
    MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader',
    'sass-loader',
  ],
};

const images = {
  test: /\.(jpe?g|png|gif)$/, // loader for images
  use: [{ loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]' }],
  include: defaultInclude,
};

const fonts = {
  test: /\.(eot|svg|ttf|woff|woff2)$/, // loader for custom fonts
  use: [{ loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]' }],
  include: defaultInclude,
};

module.exports = {
  module: {
    rules: [scss, javascript, images, fonts],
  },
  entry: [path.resolve(__dirname, 'src', 'renderer', 'index.js')],
  target: 'electron-renderer',
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new CleanWebpackPlugin('dist', {}),
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  devtool: 'cheap-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    stats: {
      colors: true,
      chunks: false,
      children: false,
    },
    before() {
      spawn('electron', ['.'], {
        shell: true,
        env: process.env,
        stdio: 'inherit',
      })
        .on('close', code => process.exit(0))
        .on('error', spawnError => console.error(spawnError));
    },
  },
};
