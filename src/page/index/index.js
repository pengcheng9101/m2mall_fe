/*
* @Author: pengcheng9101
* @Date:   2018-02-09 21:48:09
* @Last Modified by:   riccin
* @Last Modified time: 2018-03-05 21:53:10
*/
'use strict';
// var $$ = require('jquery');
// console.log('hello index');
// $$('body').html('index hollo~~~ZSS');   // 
// require('./index.css');
// require('../module.js');
var _net = require('util/net.js');

// _net.request({
//    url     : 'http://localhost:8088/product/list.do?keyword=1',
//    success :  function(res){
//         console.log(res);
//    },
//    error   :   function(errMsg){
//          console.log(errMsg);

//    }

// });

//console.log(_net.getUrlParam('test'));
var html = '<div>{{data}}</div>';
var data = {
    data : 123
}
 console.log(_net.renderHtml(html,data));