const path = require('path');

module.exports = {
  mode: 'development',

  entry: {
    main: './src/main.js',
  },

  output: {
    filename: '[name].js',
    path: path.resolve('./dist'),
  },
};