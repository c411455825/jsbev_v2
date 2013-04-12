/**
 * Class: SuperMap.Bev.Theme
 * 主题类。
 *(code)
 * SuperMap.Bev.Theme.set("dot-luv");
 * (end)
 */
(function(){
    function A(){
//        this.themes = {//[background_color,background_image,border_color,widgetControlBorder]
//            "base":["#3BAAE3","ui-bg_highlight-soft_75_cccccc_1x100","#AAA"],
//            "cupertino":["","","#AED0EA"],
//            "start":["#3BAAE3","ui-bg_glass_50_3baae3_1x400","#2694E8"]
//        }
        this.init();
    }
    var B = A.prototype;
    B.init = function(){
    }
    /**
     * Method: setFontColor
     * 对几个个别的主题的文字颜色做处理
     *
     * Parameters:
     * theme - {String} 主题名称
     */
    B.setFontColor = function(theme){
        var themesArr = "south-street,black-tie,eggplant,excite-bike,flick,pepper-grinder,vader";

        var para = {
            "black-tie":"#3472AC",
            "eggplant":"#3472AC",
            "vader":"#3472AC"
        };
        if(themesArr.indexOf(theme)>=0){
            var cssTxt = ".tab_txt,.menu_txt,.dialog_title_txt {" +
                "color: "+ (para[theme]||"#0D1314") +
                "}";
            this.createStyle(cssTxt);
        }
    }
    /**
     * Method: setStyle
     * 对一些样式做特别处理
     */
    B.setStyle = function(theme){
        var cssTxt,borderCss;

        //cssArr = this.themes[theme];
        $("#head").addClass("ui-widget-header").css({
            "opacity":0.9,
            "filter":"alpha(opacity=90)",
            "fontWeight":"normal"
        });
        $("#left_back").addClass("ui-widget-overlay");
        $("#toolbar_back").addClass("ui-widget-overlay");
        try{
            //var testbtn = document.getElementById("hideBtn");
            //var border = this.getStyleProperty(document.getElementById("hideBtn"),"border");//$("#hideBtn").css("border");
            $("#bd_left")
                .addClass("ui-state-default")
                .css({
                    "border-top":"0px solid",
                    "border-left":"0px solid",
                    "border-bottom":"0px solid",
                    "font-weight":"normal",
                    "background":"none repeat scroll 0 0 transparent",
                    "color":"transparent"
                });

            $("#bd_toolbar")
                .addClass("ui-state-default")
                .css({
                    "border-top":"0px solid",
                    "border-left":"0px solid",
                    "border-right":"0px solid",
                    "font-weight":"normal",
                    "background":"none repeat scroll 0 0 transparent",
                    "color":"transparent"
                });
//            $("#bd_toolbar").css({
//                "border-bottom":border
//            });
            $("#hideBtn").css({
                "opacity":0.8,
                "filter":"alpha(opacity=80)"
            })
        }catch(e){}
        borderCss = $(".ui-widget-header").css("border");
//        cssTxt = ".widgetControl {" +
//            "border: " + borderCss +
//            "}";
        //this.createStyle(cssTxt);
    }
    /**
     * APIMethod: createStyle
     * 动态创建css样式
     *
     * Parameters:
     * css - {String} css样式
     */
    B.createStyle = function(css){
        if(document.all){
            window.style=css;
            document.createStyleSheet("javascript:style");
        }else{
            var style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML=css;
            document.getElementsByTagName('head').item(0).appendChild(style);
        }
    }
//    B.getStyleProperty = function(obj, prop){
//        if (obj.currentStyle) //IE
//        {
//            return obj.currentStyle[prop];
//        }
//        else if (window.getComputedStyle) //非IE
//        {
//            propprop = prop.replace (/([A-Z])/g, "-$1");
//            propprop = prop.toLowerCase ();
//            return document.defaultView.getComputedStyle(obj,null)[propprop];
//        }
//        return null;
//    }
    /**
     * APIMethod: set
     * 设置主题
     *
     * Parameters:
     * themeName - {String} 主题名称
     */
    B.set = function(themeName){
        var path,me = this;
        path = ["demo/uithemes/" + themeName + "/jquery.ui.all.css"];
        path.push("demo/uithemes/" + themeName + "/jquery.ui.theme.css");//jquery.ui.theme
        SuperMap.Bev.Main.load("css",path,function(){
            me.setStyle(themeName);
            me.setFontColor(themeName);
        },null);
    }
    SuperMap.Bev.Class.register("SuperMap.Bev.Theme",A,null,true);
})()