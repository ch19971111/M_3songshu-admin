const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    // 开发模式
    mode  : 'development',
    //入口文件
    entry : './src/app.js',
    // 出口文件
    output: {
        path: path.resolve(__dirname,'../dev'),
        filename:'app.js'
    },
    // 启一个服务
    devServer : {
        contentBase: path.resolve(__dirname,'../dev'),
        port       : 8000,
        // 做个代理
        proxy: {
          '/api': {
            target: 'http://localhost:3000',
            // pathRewrite: {'^/api' : ''}
          }
        }
    },
      // loader
      module: {
        rules: [
          {
            test: /\.art$/,
            loader: 'art-template-loader' // 配置art-template-loader
          },
          
          {
            test:/\.(css|scss)$/,
            loader: ['style-loader','css-loader','sass-loader']
          }
        ]
      },
    // 插件
    plugins : [
        // html 的插件
        new htmlWebpackPlugin({
            template : './index.html',
            filename: 'index.html'
        }),
        // 拷贝文件
        new copyWebpackPlugin([{
            from : './public',
            to: './public'
        }])
    ]
  
}