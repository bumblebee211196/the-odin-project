const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    menu: './src/menu.js',
    home: './src/home.js',
    contact: './src/contact.js',
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Bee\'s Shawarma',
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      // For CSS files
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // For image files
      {
        test: /\.(png|jpg|jpeg|svg|gif)/i,
        type: 'asset/resource'
      },
    ]
  }
}