const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const NODE_ENV = process.env.NODE_ENV || 'development';
const plugins = [];

if (NODE_ENV === 'production') {
  plugins.push(
    new UglifyJSPlugin({
      uglifyOptions: {
        beautify: false,
        ecma: 5,
        compress: true,
        comments: false,
        mangle: false,
      },
    })
  );
}

module.exports = {
  entry: [
    'babel-polyfill', 
    path.resolve(__dirname, 'client', 'app.jsx'),
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: 'css/style.css'
            }
          },
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name]-[hash].[ext]',
              outputPath: 'img/'
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name]-[hash].[ext]',
              outputPath: 'fonts/'
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    })
  ],
  mode: NODE_ENV,
  watch: NODE_ENV === 'development',
};
