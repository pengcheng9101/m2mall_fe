/*
* @Author: pengcheng9101
* @Date:   2018-02-09 21:15:55
* @Last Modified by:   pengcheng9101
* @Last Modified time: 2018-02-10 10:28:32
*/
// module.exports = {
//     entry: './src/page/index/index.js',
//     output: {
//         path: './dist',
//         filename :'app.js'
//     }
// };

var webpack             = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 获取 html webpack plusgin 参数的方法,
var getHtmlConfig = function(name){
    return {
            template : './src/view/'+name+'.html',
            filename : 'view/'+name+'.html',
            inject   : true,
            hash     : true,
            chunks   : ['common',name]    // entry 的 common  , index
    };
};
var config = {
   // entry: './src/page/index/index.js',
   entry: {
        'common' : ['./src/page/common/index.js'],
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/login/index.js'],

   },
    output : {
            path: './dist',
            filename: 'js/[name].js'
    },
    externals : {
            'jquery' : 'window.jQuery'
    },
    module: {  
        loaders: [  
            {  
                test: /\.css$/,  
               // loader: "style-loader!css-loader"  
                loader: ExtractTextPlugin.extract("style-loader","css-loader"),    // css 单独担保需要的插件 
            }  
        ]  
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({     //提取公共模块的js插件
            name : 'common',      // 这个 common 对应entry 中申明的 common 变量
            filename : 'js/base.js'
        }),
      new ExtractTextPlugin("css/[name].css"),       //,css 分离打包插件
      // new HtmlWebpackPlugin({          // html 生成器 ,及把 html source  打包到 dist  ,最后发布的是发布dist 目录下的文件
      //       这里已经提取程方法
      //       template : './src/view/index.html',
      //       filename : 'view/index.html',
      //       inject   : true,
      //       hash     : true,
      //       chunks   : ['common','index']    // entry 的 common  , index
      //        getHtmlConfig('index');


      //       //所有静态资源css和JavaScript都会注入到模板文件中
      // }),
       new HtmlWebpackPlugin(getHtmlConfig('index')),
       new HtmlWebpackPlugin(getHtmlConfig('login')),
    ]
};

module.exports = config;