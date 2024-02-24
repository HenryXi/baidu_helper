// ==UserScript==
// @name         baidu helper
// @namespace    http://tampermonkey.net/
// @version      2024-02-02
// @description  try to take over the world!
// @author       You
// @match        https://pan.baidu.com/api/list*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=baidu.com
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @require      https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js
// @resource     customCSS https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

(function() {
    'use strict';
    var newCSS = GM_getResourceText("customCSS");
    GM_addStyle (newCSS);

    var list=JSON.parse(document.body.innerText).list
    document.getElementsByTagName('body')[0].innerHTML='<div class="container"><div class="row"><div id="content" class="col-lg-12"></div></div></div>'
    for (var i = 0; i < list.length; i++) {
        var cur = list[i];
        if(cur.isdir==1){
            var title = cur.path
            if(cur.path.length>70){
                title=cur.path.substring(0,70)+'......'
            }
            document.getElementById('content').innerHTML = document.getElementById('content').innerHTML
                + '<span class="list-group-item col-lg-1">'+(i+1)+'</span>'
                + '<span class="list-group-item col-lg-10">'
                +'<a title="'+cur.path+'" target="_blank" href="https://pan.baidu.com/api/list?clienttype=0&app_id=250528&web=1&dp-logid=83078100187049950055&order=time&desc=1&dir='
                +encodeURIComponent(cur.path)+'&num=10000&page=1">'+title+'</a></span><span class="list-group-item col-lg-1"><a target="_blank" href="https://pan.baidu.com/disk/main#/index?category=all&path='+encodeURIComponent(cur.path)+'">网盘页面</a></span>'
        }else{
            document.getElementById('content').innerHTML = document.getElementById('content').innerHTML + '<span class="list-group-item col-lg-12">'+list[i].path+'</span>'
        }
    }
})();
