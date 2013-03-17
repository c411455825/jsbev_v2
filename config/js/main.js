/**
 * Class: CF_Main
 * 配置界面。
 */
(function(){
    function A(){
        var t = this;
        t.createToolbar();
        t.createMap();
    }
    var B = A.prototype;
    /**
     * Method: createToolbar
     * 创建配置工具栏。
     */
    B.createToolbar = function(){
        var body,bk,ct,btn,d1;

        body = $("#toolbar");
        bk = $("<div>")
            .css({
                "position":"absolute",
                "height":"100%",
                "width":"100%",
                "opacity":0.8,
                "filter":"alpha(opacity=80)",
                "border-right": "1px solid #aed0ea",
                "z-index":5
            })
            .addClass("ui-widget-overlay")
            .appendTo(body);

        ct = $("<div>")
            .css({
                "position":"absolute",
                "height":"100%",
                "width":"100%"
            })
            .appendTo(body);

        btn = $("<div>")
            .css({
                "position":"absolute",
                "height":"60px",
                "width":"20px",
                "left":"340px",
                "top":"100px",
                "border":"#AED0EA 1px solid"
            })
            .addClass("ui-widget-overlay ui-corner-tr ui-corner-br")
            .appendTo(body);

        d1 = $("<button>")
            .button({
                icons: {
                    primary: "ui-icon-circle-triangle-w"
                },
                text: false
            })
            .css({
                "border":"0px solid #000",
                "background":"none",
                "position":"absolute",
                "width":"16px",
                "height":"16px",
                "left":"2px",
                "top":"22px"
            })
            .appendTo(btn);

        resizeFunctions.push(function(height){
            btn.css({
                "top":((height-60)/2)+"px"
            });
        });
    }
    new A();
})()