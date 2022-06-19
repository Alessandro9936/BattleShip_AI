const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '..', './src/gameLoop.js'),
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js'],
  },
  output: {
    path: path.resolve(__dirname, '..', './dist'),
    filename: 'bundle.js',
    clean: true,
  },
  plugins: [
    new ESLintPlugin(),
    new HtmlWebpackPlugin({
      title: 'BattleShip',
      template: path.resolve(__dirname, '..', './src/index.html'),
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, '..', './dist'),
  },
};
