/**
 * Class: SuperMap.Bev.Theme
 * 主题类,设置框架的主题。
 */
(function(){
    function A(){
        this.init();
    }
    var B = A.prototype;
    B.init = function(){
    }
    /**
     * APIMethod: set
     * 设置主题
     *
     * Parameters:
     * themeName - {String} 主题名称
     *
     * Examples:
     * (code)
     * SuperMap.Bev.Theme.set("dot-luv");
     * (end)
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
    B.setStyle = function(){
        var cssTxt,cssArr,borderCss;

        //cssArr = this.themes[theme];
        $("#head").addClass("ui-widget-header").css({
            "opacity":0.9,
            "filter":"alpha(opacity=90)",
            "fontWeight":"normal"
        });
        borderCss = $(".ui-widget-header").css("border");
//        cssTxt = ".background_1 {" +
//            "border: 1px solid "+cssArr[2]+";" +
//            "background: "+cssArr[0]+" url(theme/bevThemes/"+theme+"/images/"+cssArr[1]+".png) 50% 59% repeat-x;" +
//            "opacity: 0.9;" +
//            "filter: alpha(opacity=90);" +
//            "}";
        cssTxt = ".widgetControl {" +
            "border: " + borderCss +
            "}";
        this.createStyle(cssTxt);
    }
    SuperMap.Bev.Class.register("SuperMap.Bev.Theme",A,null,true);
})()