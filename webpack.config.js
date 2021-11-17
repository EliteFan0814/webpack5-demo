const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const Webpack = require('webpack')

module.exports = {
  entry: {
    main: './main.ts',
    vendor: './src/vendor.js'
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: 'images/[hash][ext][query]' // 自定义资源文件输出名
  },
  module: {
    rules: [
      // 处理scss文件
      {
        test: /\.(css|s[ac]ss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']]
              }
            }
          },
          'sass-loader'
        ]
      },
      // 处理ts文件
      {
        test: /\.ts$/,
        use: ['ts-loader'],
        exclude: /node_modules/
      },
      // 处理图片资源
      {
        test: '/.(jpg|png|jpeg|gif)$/',
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack5 入门',
      template: './public/index.html',
      filename: 'index.html',
      inject: 'body',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      title: '另外一个文件',
      template: './public/other.html',
      filename: 'other.html',
      inject: 'body',
      chunks: ['vendor']
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css' //重命名输出的css文件，也可不写默认
    })
  ],
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    historyApiFallback: true,
    hot: true,
    compress: true, // gzip压缩
    port: 3000,
    open: true //自动打开浏览器
  },
  optimization: {
    minimize: false, // 若为 true 则开发环境下启用 CSS 优化
    minimizer: [new CssMinimizerPlugin()],
    runtimeChunk: 'single'
  }
}
