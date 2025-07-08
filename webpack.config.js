const path = require('path');

module.exports = {
  entry: './src/screen-reader.js',
  output: {
    filename: 'screen-reader.bundle.js',
    path: path.resolve(__dirname, 'test_page'),
    clean: false
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
  watch: false,
  devServer: {
    static: {
      directory: path.join(__dirname, 'test_page'),
    },
    compress: true,
    port: 9000,
    open: true,
    hot: true,
  },
};
