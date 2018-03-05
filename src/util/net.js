/*
* @Author: riccin
* @Date:   2018-03-04 20:52:53
* @Last Modified by:   riccin
* @Last Modified time: 2018-03-05 22:06:30
webpackJson
*/
'use strict';
var Hogan = require('hogan');
var config = {
    serverHost : ''
};
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
    // 获取服务器地址
    getServerUrl : function(path){
        return conf.serverHost + path;
    },
    //获取url 参数   keyword=xxx&page=1
    getUrlParam : function(name){
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result =window.location.search.substr(1).match(reg);
        return result?decodeURIComponent(result[2]) : null;
    },
    renderHtml : function(htmlTemplate,data){
            var template = Hogan.compile(htmlTemplate),
            result   = template.render(data);
            return result;

    },
    successTips : function(msg){
            alert(msg || '操作成功');
    },
    errerTips   : function(msg){
            alert(msg || '操作失败');

    },
    // 字段验证, 支持非空判断 验证手机邮箱 
    validata    : function(value,type){
            var value = $.trim(value);
            // 非空验证
            if ('require' === type) {
                return !!value;
            }
            // 手机号验证
            if ('phone' === type) {
                return /^1\d{10}$/.test(value);
            }
            // 邮箱验证
            if ('mail' === type) {
                return [a-zA-Z0-9_-]+ .test(vaule);
            }
    },

    // 统一登录处理
    doLogin   : function(){
                window.location.href = './login.html?redirect='+encodeURIComponent(window.location.herf);
    }
    // 跳转首页
    goHome    : function(){
        window.location.href = './index.html';
    }
};
module.exports = _net;