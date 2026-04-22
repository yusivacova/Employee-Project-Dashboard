const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const HtmlValidatePlugin = require('html-validate-webpack-plugin');
//const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");

const devServer = (isDev) => !isDev ? {} : {
  devServer: {
    devMiddleware: {
      index: 'index.html',
    },
    open: true,
    port: 8080,
    client: {
      overlay: {
        errors: false,
        warnings: false,
      },
    },
  },
};

module.exports = ({ development }) => ({
  mode: development ? 'development' : 'production',
  devtool: development ? 'inline-source-map' : false,
  optimization: {
    minimize: false,
  },
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    assetModuleFilename: 'assets/images/[name][ext]'
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      chunks: ['home'],
      minify: false,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CopyPlugin({
      patterns: [{
        from: 'src/public/',
        to: "./public/",
        noErrorOnMissing: true,
      }],
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new StylelintPlugin({
      configFile: '.stylelintrc',
      context: 'src',
      files: ['**/*.scss'],
      failOnError: false,
      failOnWarning: false,
      fix: false,
    }),
    new HtmlValidatePlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]'
        }
      },
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: false },
          }
        ]
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [require('postcss-preset-env')],
            },
          },
        },
          'sass-loader']
      },
      {
        test: /\.m?js$/i,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ]
  },
  ...devServer(development),
});
