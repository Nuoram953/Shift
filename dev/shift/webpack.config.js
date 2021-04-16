const path = require('path');

module.exports = {
  entry: {
    main : '/public/javascripts/adventure.js',
  },
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};