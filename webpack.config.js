const path = require('path');

module.exports = {
  entry: './src/screen-reader.js',
  output: {
    filename: 'screen-reader.bundle.js',
    path: path.resolve(__dirname, 'test_page'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'test_page'),
    },
    port: 9000,
    open: true,
  },
};
