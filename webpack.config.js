const path = require('path');
console.log('NODE_ENV:', process.env.NODE_ENV);
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'screen-reader.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'test_page'),
    },
    port: 9000,
    open: true,
  },
};
