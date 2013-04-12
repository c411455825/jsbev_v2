/**
 * Class: SuperMap.Bev.Util
 * 通用方法。
 */
(function () {
    SuperMap.Bev.Class.create(
        "SuperMap.Bev.Util",
        {
            init:function () {
            },
            /**
             * APIMethod: getSize
             * 获取dom元素的像素大小
             */
            getSize:function(dom){
                var a = dom.clone();

                a.css({
                    "left":"-5000px",
                    "position":"absolute"
                })
                    .appendTo($("body"));

                var w = a.width();
                var h = a.height();

                a.remove();

                return {"w":w,"h":h};
            }
        },
        null,                        //父类
        true,                       //是否是静态类
        null                        //初始化该类之前需要加载的js文件
    );
})();