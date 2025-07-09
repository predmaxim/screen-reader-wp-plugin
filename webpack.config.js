const path = require('path');

module.exports = (env, argv) => ({
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
  mode: argv.mode || 'development',
  devtool: argv.mode === 'production' ? false : 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'test_page'),
    },
    port: 9000,
    open: false,
  },
});
