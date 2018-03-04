/*
* @Author: riccin
* @Date:   2018-03-04 20:52:53
* @Last Modified by:   riccin
* @Last Modified time: 2018-03-04 22:05:26
webpackJson
*/
'use strict';
var _net = {

    request : function(param){
        var _this=this;
        $.ajax({
                type    : param.method ||'get',
                url     : param.url    ||'',
                dataType: param.type   ||'json',
                data    : param.data   ||'',
                success : function(res){
                    // 请求成功
                    if (0 === res.status) {
                        typeof param.success ==='function' && param.success(res.data,res.msg)
                    }
                    // 没登录状态,需要强制登录
                    else if (10 === res.status) {
                        _this.doLogin();
                    } //请求数据错误
                     else if (1 === res.status) {
                       typeof param.error ==='function' && param.error(res.msg)
                    }
                },
                error   : function(err){
                       typeof param.error ==='function' && param.error(err.statusText)
                }

        });

    },
    doLogin   : function(){
                window.location.href = './login.html?redirect='+encodeURIComponent(window.location.herf);
    }
};
module.exports = _net;