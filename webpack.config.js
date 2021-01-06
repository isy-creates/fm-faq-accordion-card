//Work with directories
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

//main configuration object

module.exports = {

  //path to entry point
  entry: './src/js/index.js',

  //path and filename of result bundle
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      //JS Loader for es6 and up
      {
        //reg. expression looking for specific files
        test: /\.js$/,
        //reg. expression which path to ignore
        exclude: /(node_modules)/,
        //which loader is going to be used
        use: ['babel-loader']
        },
      //SCSS Loader
      {
        //test for sass, scss and css files
        test: /\.(sa|sc|c)ss$/,
        use: [
          //loader chaining, from last to first 
          {
            //after all css loaders all files gets extracted into a single file
            //needs plugin
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          }
        ]
      },
      //File Loader
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename:'bundle.css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html')
    })
  ]

};