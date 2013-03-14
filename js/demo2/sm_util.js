/**
 * Class: SuperMap.Bev.Menu
 * 图标按钮。
 */
(function () {
    SuperMap.Bev.Class.create(
        "SuperMap.Bev.DemoUtil",
        {
            isLeftHide:false,
            init:function () {
            },
            toolBarHideBtn:function(leftDiv,rightDiv){
                var a, b, h, t,me=this;

                leftDiv.css({
//                    "background":"#fff",
                    "z-index":5
                });

                a = $("<div id='hideBtn'>")
                    .css({
                        "position":"absolute",
                        "width":"20px",
                        "height":"60px",
                        "right":"-22px",
//                        "border":"1px solid #ddd",
//                        "background":"#fff",
                        "z-index":-5,
                        "cursor":"pointer"
                    })
                    .addClass("ui-corner-right ui-state-default");

                h = SuperMap.Bev.Util.getSize(leftDiv).h;
                t = (h/2 - 30) + "px";
                a.css("top",t);

                b = $("<button>")
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
                    .appendTo(a);

                a.appendTo(leftDiv);

                a.click(function(){
                    if(me.isLeftHide){
                        show();
                    }
                    else{
                        hide();
                    }
                });

                if(window.resizeFunctions){
                    window.resizeFunctions.push(resizeHide)
                }
                resizeHide();

                function resizeHide(){
                    if(document.body.clientWidth<=950&&!me.isLeftHide){
                        leftDiv.css({
                            "left":"-340px"
                        });
                        rightDiv.css({
                            "margin-left":"0px"
                        });
                        b.button( "option", "icons" ,{
                            primary: "ui-icon-circle-triangle-e"
                        });
                        me.isLeftHide = true;
                    }
                }

                function hide(){
                    leftDiv.animate({
                        "left":"-340px"
                    }, "fast", "linear", function(){
//                        $("#left_menu").css({
//                            "display":"none"
//                        });
                        rightDiv.css({
                            "margin-left":"0px"
                        });
                        changeIcon();
                        me.isLeftHide = true;
                        map.updateSize();
                    });
                }

                function show(){
                    leftDiv.animate({
                        "left":"0px"
                    }, "fast", "linear", function(){
//                        $("#left_menu").css({
//                            "display":"none"
//                        });
                        rightDiv.css({
                            "margin-left":"341px"
                        });
                        changeIcon();
                        me.isLeftHide = false;
                        map.updateSize();
                    });
                }

                function changeIcon(){
                    b.button( "option", "icons" ,{
                        primary: !me.isLeftHide?"ui-icon-circle-triangle-e":"ui-icon-circle-triangle-w"
                    });
                }
            }
        },
        null,                        //父类
        true,                       //是否是静态类
        [
            "js/ui/jquery.ui.widget.js",
            "js/ui/jquery.ui.button.js",
            "js/sm_util.js"
        ]
    );
})();