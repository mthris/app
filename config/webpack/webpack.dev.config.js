import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  context: path.resolve(__dirname, '../../src'),
  entry: {
    home: 'pages/home/index.js',
  },
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../../src')
  },
  resolve:{
    alias: {
      sass: path.resolve(__dirname, '../../src/sass/'),
      reusable: path.resolve(__dirname, '../../src/js/')
    },
    modules: ['node_modules', path.resolve(__dirname, '../../src')]
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../../src'),
    watchContentBase: true,
    hot: true,
    port: 3001
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: ['babel-loader', {
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-formatter-pretty')
          }
        }]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            config: {
              ctx: {
                env: process.env.NODE_ENV
              }
            }
          }
        }, 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: true
            }
          }
        ]
      },
      {
       test: /\.html$/i,
       loader: 'html-loader',
       options: {
         attributes: {
           root: path.resolve(__dirname, '../../src/assets/img')
         }
       }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'pages/home/index.html',
      template: 'pages/home/home.html',
      chunks: ['home']
    })
  ]
}
