/**
 * Class: SuperMap.Bev.Loading
 * 加载动画。
 */
(function () {
    SuperMap.Bev.Class.create(
        "SuperMap.Bev.Loading",
        {
            /**
             * APIProperty: body
             * {HTMLElement} 父容器
             */
            body:null,
            /**
             * Constructor: SuperMap.Bev.Loading
             * 实例化 Loading 类。
             *
             * Parameters:
             * body - {HTMLElement} 父容器
             *
             * Examples:
             * (code)
             * (end)
             */
            init:function (option) {
                for(var key in option){
                   this[key] = option[key];
                }
                this.create();
            },
            /**
             * Method: create
             * 创建该控件的dom对象。
             */
            create:function(){
                var b = this.body,d;

                if(b){
                    d = $("<div>")
                        .appendTo(b)
                        .append(
                            $("<img>")
                            .attr({
                                "src":"../demo/img/loading1.gif"
                            })
                            .css({
                                "width":"64px",
                                "height":"64px"
                            })
                        );

                    d = $("<div>")
                        .html("加载中...")
                        .css({
                            "font-size":"14px"
                        })
                        .appendTo(b);
                }
            },
            /**
             * Method: hide
             * 隐藏loading。
             */
            hide:function(){
                if(this.body)this.body.css({
                    "display":"none"
                });
            },
            /**
             * Method: show
             * 显示loading。
             */
            show:function(){
                if(this.body)this.body.css({
                    "display":"block"
                });
            }
        },
        null,                        //父类
        false,                       //是否是静态类
        null                         //初始化该类之前需要加载的js文件
    );
})();