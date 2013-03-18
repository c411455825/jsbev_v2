/**
 * Class: CF_Main
 * 配置界面。
 */
(function(){
    function A(){
        var t = this;
        t.toolBarBd = null;
        t.isToolBarShow = true;
        t.toolBarButtonIcon = null;
        t.toolBarContent = null;
        t.mapFrame = null;
        t.confParam = {
            "templete":"d1",
            "theme":"cupertino"
        }
        t.createToolbar();
        t.createStep1();
        t.createStep2();
    }
    var B = A.prototype;
    /**
     * Method: createToolbar
     * 创建配置工具栏。
     */
    B.createToolbar = function(){
        var body,bk,ct,btn,d1,t = this;

        t.toolBarBd = body = $("#toolbar");
        bk = $("<div>")
            .css({
                "position":"absolute",
                "height":"100%",
                "width":"100%",
                "opacity":0.8,
                "filter":"alpha(opacity=80)",
                "border-right": "1px solid #aed0ea",
                "z-index":-5
            })
            .addClass("ui-widget-overlay")
            .appendTo(body);

        t.toolBarContent = ct = $("<div>")
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
                "left":"370px",
                "top":"100px",
                "border":"#AED0EA 1px solid"
            })
            .addClass("ui-widget-overlay ui-corner-tr ui-corner-br")
            .click(function(){
                if(t.isToolBarShow){
                    t.hideToolBar();
                }
                else{
                    t.showToolBar();
                }
            })
            .appendTo(body);

        t.toolBarButtonIcon = d1 = $("<button>")
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
    B.hideToolBar = function(){
        var t = this;

        this.toolBarBd.css({
            "left":"0px"
        });

        this.toolBarBd.animate({left:'-370px'},"fast",function(){
            t.isToolBarShow = false;
            t.toolBarButtonIcon.button({
                icons: {
                    primary: "ui-icon-circle-triangle-e"
                }
            });
        });
    }
    B.showToolBar = function(){
        var t = this;
        this.toolBarBd.css({
            "left":"-370px"
        });

        this.toolBarBd.animate({left:'0px'},"fast",function(){
            t.isToolBarShow = true;
            t.toolBarButtonIcon.button({
                icons: {
                    primary: "ui-icon-circle-triangle-w"
                }
            });
        });
    }
    B.createStep1 = function(){
        var d1, b,t = this;

        var templeteArr = [
            {
                "name":"模板一",
                "value":"d1"
            }
            ,
            {
                "name":"模板二",
                "value":"d2"
            }
        ];

        b = t.toolBarContent;

        d1 = $("<div>")
            .html("1.选择模板")
            .css({
                "margin":"20px 0px 0px 10px"
            })
            .appendTo(b);

        d1 = $("<div>")
            .css({
                "margin":"10px 0px 0px 10px"
            })
            .appendTo(b);

        this.createSelectBar(d1,templeteArr,function(txt){
            t.confParam.templete = txt;

            t.setDemoPara(t.confParam);
        },30,150);
    }
    B.createSelectBar = function(div,txtArr,onSelect,height,width){
        var s1,o1;

        s1 = $("<select>")
            .css({
                "height":height+"px",
                "width":width+"px"
            })
            .change(function(onSelect){
                return function(){
                    onSelect($(this).attr("value"));
                }
            }(onSelect))
            .appendTo(div);

        for(var i=0;i<txtArr.length;i++){
            o1 = $("<option>")
                .html(txtArr[i].name||txtArr[i])
                .attr("value",txtArr[i].value||txtArr[i])
                .appendTo(s1);
        }
    }
    B.createStep2 = function(){
        var d1, b,t = this;

        var skinArr = [
            "cupertino",
            "base",
            "black-tie",
            "blitzer",
            "dark-hive",
            "dot-luv",
            "eggplant",
            "excite-bike",
            "flick",
            "hot-sneaks",
            "humanity",
            "le-frog",
            "mint-choc",
            "overcast",
            "pepper-grinder",
            "redmond",
            "smoothness",
            "south-street",
            "start",
            "sunny",
            "swanky-purse",
            "trontastic",
            "ui-darkness",
            "ui-lightness",
            "vader"
        ];
        b = t.toolBarContent;
        d1 = $("<div>")
            .html("2.选择主题")
            .css({
                "margin":"20px 0px 0px 10px"
            })
            .appendTo(b);

        d1 = $("<div>")
            .css({
                "margin":"10px 0px 0px 10px"
            })
            .appendTo(b);

        this.createSelectBar(d1,skinArr,function(txt){
            t.confParam.theme = txt;

            t.setDemoPara(t.confParam);
        },30,150);
    }
    B.setDemoPara = function(param){
        var url = "../demo.jsp?";
        var txtArr = [],paramStr;
        if(!this.mapFrame){
            this.mapFrame = document.getElementById("mapFrame");
        }

        for(var key in param){
            txtArr.push(key+"="+param[key]);
        }
        paramStr = txtArr.join("&");
        url += paramStr;

        this.mapFrame.src = url;
    }
    new A();
})()