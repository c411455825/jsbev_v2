/**
 * Class: SuperMap.Bev.Accordion
 * 手风琴控件。
 */
(function () {
    SuperMap.Bev.Class.create(
        "SuperMap.Bev.Accordion",
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
             *config:[
             *    {
             *        "title":"name1",
             *        "body":$("<p>this is a simple text;this is a simple text;this is a simple text;this is a simple text;this is a simple text;</p>")
             *    },
             *    {
             *        "title":"name2",
             *        "body":$("<p>this is a simple text;this is a simple text;this is a simple text;this is a simple text;this is a simple text;</p>")
             *    }
             *],
             * (end)
             */
            config:[
                {
                    "title":"name1",
                    "body":$("<p>this is a simple text;this is a simple text;this is a simple text;this is a simple text;this is a simple text;</p>")
                },
                {
                    "title":"name2",
                    "body":$("<p>this is a simple text;this is a simple text;this is a simple text;this is a simple text;this is a simple text;</p>")
                }
            ],
            /**
             * Constructor: SuperMap.Bev.Accordion
             * 实例化 Accordion 类。
             *
             * Parameters:
             * body - {HTMLElement} 父容器
             * config - {Array} 初始化参数
             *
             * Examples:
             * (code)
             * var myAccordion = new SuperMap.Bev.Accordion($("#left_menu"),
             *    [
             *        {
             *            "title":"查询",
             *            "body":$("<p>this is a examples</p><br><p>this is a examples</p><br><p>this is a examples</p>")
             *        }
             *    ]
             * );
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
                var c,c1,b;
                c = this.config;
                b = this.body;
                if(c){
                    b.empty();
                    for(var i=0;i< c.length;i++){
                        c1 = c[i];
                        $("<h3>")
                            .html(c1.title)
                            .appendTo(b);

                        $("<div>")
                            .append(c1.body)
                            .appendTo(b);
                    }
                }

                b.accordion();

                window.setTimeout(function(){
                    b.find("h3").next().css("height","auto");
                },20);
            }
        },
        null,                        //父类
        false,                       //是否是静态类
        [                            //初始化该类之前需要加载的js文件
            "demo/js/ui/jquery.ui.widget.js",
            "demo/js/ui/jquery.ui.accordion.js"
        ]
    );
})();