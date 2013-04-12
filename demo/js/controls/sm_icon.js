/**
 * Class: SuperMap.Bev.Icon
 * 图标按钮。
 */
(function () {
    SuperMap.Bev.Class.create(
        "SuperMap.Bev.Icon",
        {
            /**
             * APIProperty: body
             * {HTMLElement} 父容器
             */
            body:null,
            /**
             * APIProperty: config
             * {Object} 初始化所需的参数
             *
             *(code)
             *config:{
             *    "title":"test",
             *    "click":function(){},
             *    "img":"",
             *    "isDisplayTitle":false
             * },
             * (end)
             */
            config:{
                "title":"test",
                "click":function(){},
                "img":"",
                "isDisplayTitle":false
            },
            /**
             * APIProperty: defaultWidth
             * {Number} 默认宽度
             */
            defaultWidth:16,
            /**
             * APIProperty: defaultHeight
             * {Number} 默认高度
             */
            defaultHeight:16,
            /**
             * Constructor: SuperMap.Bev.Icon
             * 实例化 Icon 类。
             *
             * Parameters:
             * body - {HTMLElement} 父容器
             * config - {Array} 初始化参数
             *
             * Examples:
             * (code)
             * var myIcon1 = new SuperMap.Bev.Icon($("#bd_toolbar"),{
             *    "title":"面积量算",
             *    "img":"images/frameimages/measure2.png",
             *    "click":function(){
             *        var m = getMesure();
             *        m.measureArea();
             *    },
             *    "isDisplayTitle":true
             * });
             * (end)
             */
            init:function (body1,config) {
                this.body = body1;
                if(config)this.config = config;
                this.create();
            },
            /**
             * Method: create
             * 创建该控件的dom对象。
             */
            create:function(){
                var b = this.body,c = this.config,c1,c2,c3;

                if(c){
                    c1 = $("<span>")
                        .addClass("sm_icon ui-corner-all ui-state-default")
                        .css({
                            "height":"16px",
                            "display":"inline-block",
//                            "background":"url("+c.img+")",
                            "margin-right":"10px",
                            "cursor":"pointer",
                            "padding":"3px"
                        })
                        .click(c.click)
                        .mouseover(function(){
                            $(this).addClass("ui-state-hover");
                        })
                        .mouseout(function(){
                            $(this).removeClass("ui-state-hover");
                        })
                        .appendTo(this.body);

                    c2 = $("<span>")
                        .css({
                            "height":(c.height||this.defaultHeight)+"px",
                            "width":(c.width||this.defaultWidth)+"px",
                            "display":"inline-block",
                            "background":"url("+c.img+")",
                            "margin-right":"5px"
                        })
                        .appendTo(c1);

                    if(c.isDisplayTitle){
                        c3 = $("<span>")
                            .css({
                                "height":(c.height||this.defaultHeight)+"px",
                                "line-height":(c.height||this.defaultHeight)+"px",
                                "display":"inline-block",
                                "white-space": "nowrap",
                                "vertical-align": "top"
                            })
                            .html(c.title)
                            .appendTo(c1);
                    }
                    else{
                        c1.attr("title", c.title);
                    }
                }
            }
        },
        null,                        //父类
        false,                       //是否是静态类
        null                         //初始化该类之前需要加载的js文件
    );
})();