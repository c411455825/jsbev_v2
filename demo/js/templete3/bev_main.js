/*jslint browser: true, eqeqeq: true, bitwise: true, newcap: true, immed: true, regexp: false */

/**
LazyLoad makes it easy and painless to lazily load one or more external
JavaScript or CSS files on demand either during or after the rendering of a web
page.

Supported browsers include Firefox 2+, IE6+, Safari 3+ (including Mobile
Safari), Google Chrome, and Opera 9+. Other browsers may or may not work and
are not officially supported.

Visit https://github.com/rgrove/lazyload/ for more info.

Copyright (c) 2011 Ryan Grove <ryan@wonko.com>
All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the 'Software'), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

@module lazyload
@class LazyLoad
@static
@version 2.0.3 (git)
*/
LazyLoad=function(k){function p(b,a){var g=k.createElement(b),c;for(c in a)a.hasOwnProperty(c)&&g.setAttribute(c,a[c]);return g}function l(b){var a=m[b],c,f;if(a)c=a.callback,f=a.urls,f.shift(),h=0,f.length||(c&&c.call(a.context,a.obj),m[b]=null,n[b].length&&j(b))}function w(){var b=navigator.userAgent;c={async:k.createElement("script").async===!0};(c.webkit=/AppleWebKit\//.test(b))||(c.ie=/MSIE/.test(b))||(c.opera=/Opera/.test(b))||(c.gecko=/Gecko\//.test(b))||(c.unknown=!0)}function j(b,a,g,f,h){var j=
    function(){l(b)},o=b==="css",q=[],d,i,e,r;c||w();if(a)if(a=typeof a==="string"?[a]:a.concat(),o||c.async||c.gecko||c.opera)n[b].push({urls:a,callback:g,obj:f,context:h});else{d=0;for(i=a.length;d<i;++d)n[b].push({urls:[a[d]],callback:d===i-1?g:null,obj:f,context:h})}if(!m[b]&&(r=m[b]=n[b].shift())){s||(s=k.head||k.getElementsByTagName("head")[0]);a=r.urls;d=0;for(i=a.length;d<i;++d)g=a[d],o?e=c.gecko?p("style"):p("link",{href:g,rel:"stylesheet"}):(e=p("script",{src:g}),e.async=!1),e.className="lazyload",
    e.setAttribute("charset","utf-8"),c.ie&&!o?e.onreadystatechange=function(){if(/loaded|complete/.test(e.readyState))e.onreadystatechange=null,j()}:o&&(c.gecko||c.webkit)?c.webkit?(r.urls[d]=e.href,t()):(e.innerHTML='@import "'+g+'";',u(e)):e.onload=e.onerror=j,q.push(e);d=0;for(i=q.length;d<i;++d)s.appendChild(q[d])}}function u(b){var a;try{a=!!b.sheet.cssRules}catch(c){h+=1;h<200?setTimeout(function(){u(b)},50):a&&l("css");return}l("css")}function t(){var b=m.css,a;if(b){for(a=v.length;--a>=0;)if(v[a].href===
    b.urls[0]){l("css");break}h+=1;b&&(h<200?setTimeout(t,50):l("css"))}}var c,s,m={},h=0,n={css:[],js:[]},v=k.styleSheets;return{css:function(b,a,c,f){j("css",b,a,c,f)},js:function(b,a,c,f){j("js",b,a,c,f)}}}(this.document);

/**
 * Class: SuperMap.Bev.Class
 * class类,实现面向对象。
 */
(function(){
    function A(){}
    /**
     * Method: register
     * 注册一个类。
     *
     * Parameters:
     * className - {String} 类的名称
     * classObj - {Object} 类对象，包括一些属性和方法
     * extend - {String} 父类的名称
     * isStatic - {Boolean} 是否是静态类
     */
    A.register = function(className,classObj,extend,isStatic){
        var names,space = window,name,lastName;

        names = className.split(".");
        lastName = names.pop();
        for(var i=0;i<names.length;i++){
            name = names[i];
            if(!space[name]){
                space[name] = {};
            }
            space = space[name];
        }
        if(lastName){
            if(isStatic){
                space[lastName] = new classObj();
            }
            else{
                space[lastName] = classObj;
            }
        }

        if(extend) classObj.prototype = eval("(new " + extend + ")");
    }
//    A.requires = function(paths,callback){
//
//    }
    /**
     * Method: create
     * 创建一个类。
     *
     * Parameters:
     * className - {String} 类的名称
     * object - {Object} 类对象，包括一些属性和方法
     * extend - {String} 父类的名称
     * isTtatic - {Boolean} 是否是静态类
     * depend - {Array<String>} 初始化该类前需要加载的依赖脚本
     */
    A.create = function(className,object,extend,isTtatic,depend){
        var me=this;
        if(depend){
            SuperMap.Bev.Main.loadClass(className+"_depend",depend,function(className,object,extend,isTtatic,depend){
                return function(){
                    _create(className,object,extend,isTtatic,depend);
                }
            }(className,object,extend,isTtatic,depend));
        }
        else{
            _create(className,object,extend,isTtatic,depend);
        }
        function _create(className,object,extend,isTtatic,depend){
            var C = function(){if(this.init)this.init.apply(this,arguments);}, p;
            if(extend) C.prototype = eval("(new " + extend + "())");
            for(var key in object){
                p = object[key];
                C.prototype[key] = p;
            }
            me.register(className,C,null,isTtatic);
        }
    }
    A.register("SuperMap.Bev.Class",A);
})();

/**
 * Class: SuperMap.Bev.Main
 * bev框架的初始化类.
 */
(function(){
    function A(){
        var jsPath = "demo/js/";
        var jqPath = jsPath+"ui/";
        var cssPath = "demo/css/";
        /**
         * Property: initJS
         * {Array<String>} 初始化时需要预先加载的js文件
         */
        this.initJS = [
            jqPath+"jquery.ui.core.js"
        ];
        /**
         * Property: initCss
         * {Array<String>} 初始化时需要预先加载的css文件
         */
        this.initCss = [
            cssPath+"templete3/style.css",
            "demo/uithemes/demos.css"
        ];
        /**
         * Property: widget
         * {Array<String>} 初始化时需要预先加载的控件
         */
        this.widget = [
            "demo/js/controls/sm_menu.js",
            "demo/js/templete3/sm_toolbar.js",
            "demo/js/controls/sm_dialog.js",
            "demo/js/controls/sm_measure.js",
            "demo/js/controls/sm_geolocate.js",
            "demo/js/controls/sm_drawFeature.js"
        ]
        /**
         * Property: themePath
         * {String} SuperMap.Bev.Theme类的文件路径
         */
        this.themePath = jsPath+"templete3/sm_theme.js";
        this.loadTimes = 0;
        this.cache = {};
    }
    var B = A.prototype;
    /**
     * Method: init
     * init方法，加载一些初始化文件。
     *
     * Parameters:
     * callback - {Function} 回调方法
     */
    B.init = function(callback){
        var me = this;
        this.loadInitCss(complete);
        this.loadInitJs(complete);
        function complete(){
            me.loadTimes++;
            if(me.loadTimes>=2){
                me.loadClass("init",me.widget.concat([me.themePath]),callback);
            }
        }
    }
    /**
     * Method: loadInitCss
     * 加载初始化的css文件
     *
     * Parameters:
     * cb - {Function} 回调方法
     */
    B.loadInitCss = function(cb){
        this.load("css",this.initCss,cb,null);
    }
    /**
     * Method: loadInitJs
     * 加载初始化的js文件
     *
     * Parameters:
     * cb - {Function} 回调方法
     */
    B.loadInitJs = function(cb){
        this.load("js",this.initJS,cb,null);
    }
    /**
     * APIMethod: loadJs
     * 加载js文件
     *
     * Parameters:
     * path - {String} 文件路径
     * cb - {Function} 回调方法
     * args - {Object} 回调方法中的回传参数
     */
    B.loadJs = function(path,cb,args){
        this.load("js",path,cb,args);
    }
    /**
     * APIMethod: load
     * 加载文件
     *
     * Parameters:
     * type - {String} 文件类型，js or css
     * path - {String} 文件路径
     * cb - {Function} 回调方法
     * args - {Object} 回调方法中的回传参数
     */
    B.load = function(type,path,cb,args){
        LazyLoad[type](path, function (cb) {
            return function(args){
                cb&&cb(args);
            }
        }(cb),args);
    }
    /**
     * APIMethod: loadClass
     * 加载一个类
     *
     * Parameters:
     * className - {String} 类名称
     * path - {String} 文件路径
     * cb - {Function} 回调方法
     */
    B.loadClass = function(className,path,cb){
        var me = this;
        this.cache[className] = function(cb,className){
            return function(){
                if(cb)cb();
            }
        }(cb,className);
        this.loadJs(path,function(key){
            return function(){
                if(key.indexOf("_depend")<0){
                    if(!me.cache[key+"_depend"]){
                        doCb(key)
                    }
                }
                else{
                    doCb(key);
                    doCb(key.replace(/_depend/,""));
                }
            }
        }(className));
        function doCb(key){
            if(me.cache[key]&&key!="init"){
                me.cache[key]();
                me.cache[key] = null;
                delete me.cache[key];
                if(me.cache["init"]&&getLength(me.cache)==1){
                    me.cache["init"]();
                    me.cache["init"] = null;
                    delete me.cache["init"];
                }
            }
        }
        function getLength(obj){
            var i=0;
            for(var key in obj){
                i++;
            }
            return i;
        }
    }
    SuperMap.Bev.Class.register("SuperMap.Bev.Main",A,null,true);
})()
