const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Text Editor',
        inject: 'body',
        template: './index.html'
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js',
      }),
      new WebpackPwaManifest({
        name: 'Text-Editor',
        short_name: 'texEdit',
        description: 'My text editor application',
        background_color: '#808080',
        theme_color: '#FFFFFF',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('./src/images/logo.png'),
            sizes: [96],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      new MiniCssExtractPlugin()
    ],
    module: {
      rules: [
        //loader rule. test uses a regex for css file. Checkign the end of each file for the css tag. 
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/icons',
        },
        {
          test: /\.(js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env']
              ]
            }
          }
        }
      ],
    },
    devServer: {
      proxy: {
        '*': 'http://localhost:3333'
      },
      compress: true,
      hot: true,
      watchFiles: ['./index.html']
    },

  }

}
