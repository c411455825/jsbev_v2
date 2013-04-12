/**
 * Class: SuperMap.Bev.Dialog
 * 窗口面板。
 */
(function () {
    SuperMap.Bev.Class.create(
        "SuperMap.Bev.Dialog",
        {
            /**
             * APIProperty: body
             * {HTMLElement} 父容器
             */
            body:null,
            /**
             * APIProperty: content_body
             * {HTMLElement} 放置内容的父容器
             */
            content_body:null,
            /**
             * APIProperty: content
             * {HTMLElement} 所展现的内容元素
             */
            content:null,
            /**
             * APIProperty: head
             * {Object} 窗口头部符号和文字标题
             * (code)
             * var head = {
             *    "icon":"className",
             *    "text":"标题"
             * }
             * (end)
             */
            head:{
                "icon":"",
                "text":"test"
            },
            /**
             * Constructor: SuperMap.Bev.Dialog
             * 实例化 Dialog 类。
             *
             * Parameters:
             * widgetControl - {SuperMap.Bev.WidgetControl} 窗口管理工具
             * content - {HTMLElement} 需要展现的内容
             * head - {Object}标题参数。
             *
             * Examples:
             * (code)
             * var myWidgetControl = new SuperMap.Bev.WidgetControl("#widgetControl");
             * var dialog = new SuperMap.Bev.Dialog(myWidgetControl,null,{
             *    "icon":"measure_16_16",
             *    "text":"量&nbsp;&nbsp;&nbsp;&nbsp;算"
             * });
             * (end)
             */
            init:function (content, head) {
                this.content = content;
                this.head = head;
                this.create();
            },
            /**
             * Method: create
             * 创建该控件的dom对象。
             */
            create:function () {
                var body, content,t = this;

                this.body = body = $("<div title=\"Basic dialog\" class=\"dialog\"></div>")
                    .css({
                        "visibility":"hidden"
                    })
                    .appendTo($("body"));
                this.content_body = content = $("<div class=\"jsBev_sample\"></div>");
                content.appendTo(body);
                if (this.content)content.append(this.content);

                window.setTimeout(function(){
                    if(!body.isDialog)body.dialog();
                    body.dialog(
                        "option", "title",
                        "<span class=\"icon16_16 " + t.head.icon + " dialog_title_icon\"></span><span class=\"dialog_title_txt\">" + t.head.text + "</span>")
                        .css({
                            "visibility":"visible"
                        });
                },30);
            },
            /**
             * APIMethod: getContentBody
             * 获取放置内容的父容器。
             *
             * Returns:
             * {HTMLElement}  返回 Dom 对象。
             */
            getContentBody:function () {
                return this.content_body;
            },
            on:function (event, fun) {
                this.body.on(event, fun);
            }
        },
        null,                                      //父类
        false,                                     //是否是静态类
        [                                          //初始化该类之前需要加载的js文件
            "demo/js/ui/jquery.ui.widget.js",
            "demo/js/ui/jquery.ui.position.js",
            "demo/js/ui/jquery.ui.mouse.js",
            "demo/js/ui/jquery.ui.draggable.js",
            "demo/js/ui/jquery.ui.dialog.js"
        ]
    );
})()