/*
* @Author: pengcheng9101
* @Date:   2018-02-09 21:15:55
* @Last Modified by:   riccin
* @Last Modified time: 2018-03-04 22:03:26
*/
// module.exports = {
//     entry: './src/page/index/index.js',
//     output: {
//         path: './dist',
//         filename :'app.js'
//     }
// };

var webpack             = require('webpack');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin   = require('html-webpack-plugin');
// 获取 html webpack plusgin 参数的方法,

var WEBPACK_ENV         = process.env.WEBPACK_ENV||'dev';
console.log(WEBPACK_ENV);

var getHtmlConfig = function(name){
    return {
            template : './src/view/'+name+'.html',
            filename : 'view/'+name+'.html',
            inject      : true,
            hash        : true,
            chunks   : ['common',name]    // entry 的 common  , index
    };
};
var config = {
   // entry: './src/page/index/index.js',
   entry: {
        'common' : ['./src/page/common/index.js','webpack-dev-server/client?http://localhost:8088/'],
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/login/index.js'],

   },
    output : {
            path: './dist',
            publicPath: '/dist/',
            filename: 'js/[name].js'
    },
    externals : {
            'jquery' : 'window.jQuery'
    },
    module  : {  
        loaders: [  
        //  // loader: "style-loader!css-loader"  
            // {  test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader"),    // css 单独担保需要的插件 
            // },
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader")},
            {test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader:'url-loader?limit=100&name=resource/[name].[ext]'}
        ]  
    },
    // 定义项目路径变量 ,在js 代码直接用...
    resolve : {
        alias : {
         util    : __dirname+'/src/util',       //   __dirname 当前项目地址
         page    : __dirname+'/src/page',       //   __dirname 当前项目地址
         service : __dirname+'/src/service',       //   __dirname 当前项目地址
         img     : __dirname+'/src/img'      //   __dirname 当前项目地址

        }

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
      new webpack.ProvidePlugin({
          "$": "jquery",
          "jQuery": "jquery",
          "window.jQuery": "jquery"
      }),
       new HtmlWebpackPlugin(getHtmlConfig('index')),
       new HtmlWebpackPlugin(getHtmlConfig('login')),
    ]
};
if ('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')

}

module.exports = config;