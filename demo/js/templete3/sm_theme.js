/**
 * Class: SuperMap.Bev.Theme
 * 主题类。
 *(code)
 * SuperMap.Bev.Theme.set("dot-luv");
 * (end)
 */
(function(){
    function A(){
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