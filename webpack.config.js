const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Webpack = require('webpack')

module.exports = {
  entry: {
    main: './main.ts',
    // vendor: './src/vendor.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: ''
  },
  module: {
    rules: [
      // 处理scss文件
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // 其他选项
                    }
                  ]
                ]
              }
            }
          },
          'sass-loader'
        ]
      },
      // 处理ts文件
      {
        test: /\.ts$/,
        use: ['ts-loader']
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
      template: './public/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css' //重命名输出的css文件，也可不写默认
    }),
    // new Webpack.HotModuleReplacementPlugin()
  ],
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    hot: 'only',
    historyApiFallback: true,
    compress: true, // gzip压缩
    port: 3000,
    open: true //自动打开浏览器
  },
  target: 'web'
}
