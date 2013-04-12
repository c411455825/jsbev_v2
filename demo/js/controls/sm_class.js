/**
 * Class: SuperMap.Bev.Class
 * 实现面向对象。
 */
(function(){
    /**
     * Constructor: SuperMap.Bev.Class
     * 实现面向对象。
     *
     * Examples:
     * (code)
     * SuperMap.Bev.Class.create("SuperMap.Bev.Test",{},null,false,null);
     * (end)
     */
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
     * APIMethod: create
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
        if(depend&&depend.length>0){
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
})()