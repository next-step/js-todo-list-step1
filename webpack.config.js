const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: { filename: 'bundle.js', path: path.resolve(__dirname, 'dist') },
  devServer: {
    contentBase: __dirname + '/dist/',
    host: 'localhost',
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
};
