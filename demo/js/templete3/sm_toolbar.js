/**
 * Class: SuperMap.Bev.ToolBar
 * 模板三顶部工具栏。
 */
(function () {
    SuperMap.Bev.Class.create(
        "SuperMap.Bev.ToolBar",
        {
            /**
             * APIProperty: body
             * {HTMLElement} 父容器
             */
            body:null,
            /**
             * APIProperty: map
             * {SuperMap.Map} map对象
             */
            map:null,
            /**
             * Constructor: SuperMap.Bev.ToolBar
             * 实例化 ToolBar 类。
             *
             * Parameters:
             * body - {HTMLElement} 父容器
             * map - {SuperMap.Map} map对象
             * tree - {Array<Object>} 目录结构
             *
             * Examples:
             * (code)
             * var myToolBar = new SuperMap.Bev.ToolBar($("#toolbar"));
             * (end)
             */
            init:function (body,map,tree) {
                var bg,d1,tr;

                if(map)this.map = map;

                bg = $("<div>")
                    .css({
                        "position":"absolute",
                        "width":"100%",
                        "height":"100%"
                    })
                    .addClass("ui-widget-header ui-corner-right")//ui-widget-header
                    .appendTo(body);

                d1 = this.completeMapBtn(body);
                d1 = this.zoomOutInBtn(body,true);
                d1.css({
                    "margin-left":"60px"
                });
                var b = $.browser;
                if(b.msie&&b.version=="7.0"){
                    d1.css({
                        "left":"60px"
                    });
                }
                d1 = this.zoomOutInBtn(body,false);
                d1 = $("<span>")
                    .css({
                        "display":"inline-block",
                        "margin":"0px 10px 0px 10px",
                        "position":"relative",
                        "height":"100%",
                        "border-top":"0px solid",
                        "border-right":"0px solid",
                        "border-bottom":"0px solid"
                    })
                    .addClass("ui-state-default")
                    .appendTo(body);
                if(tree){
                    for(var i=0;i<tree.length;i++){
                        tr = tree[i];

                        d1 = this.iconLabelBtn(body,tr.icon,tr.title,tr.menu);
                        if(i!=tree.length-1){
                            d1 = this.separateLine(body);
                        }
                    }
                }
//                d1 = this.iconLabelBtn(body,"demo/img/mesure_t3.png","量算");
//                d1 = this.separateLine(body);
//                d1 = this.iconLabelBtn(body,"demo/img/geolocate_t3.png","定位");
//                d1 = this.separateLine(body);
//                d1 = this.iconLabelBtn(body,"demo/img/draw_t3.png","绘制");
                body.css({
                    "padding-right":"10px"
                });
            },
            /**
             * APIMethod: setMap
             * 设置map对象。
             *
             * Parameters:
             * map - {SuperMap.Map} map对象
             *
             * Returns:
             * {HTMLElement}  返回 Dom 对象。
             */
            setMap:function(map){
                if(map)this.map = map;
            },
            /**
             * Method: completeMapBtn
             * 创建全副显示按钮。
             *
             * Returns:
             * {HTMLElement}  返回 Dom 对象。
             */
            completeMapBtn:function(container){
                var btn,icon,t = this;

                btn = $("<span>")
                    .css({
                        "height":"54px",
                        "width":"54px",
                        "position":"absolute",
                        "left":"-9px",
                        "top":"-9px",
                        "-moz-border-radius": "6px",
                        "-webkit-border-radius": "6px",
                        "-khtml-border-radius": "6px",
                        "border-radius": "28px",
                        "cursor":"pointer"
                    })
                    .addClass("ui-state-default")//ui-corner-all
                    .attr({
                        "title":"全副显示"
                    })
                    .click(function(){
                        if(t.map)t.map.zoomToMaxExtent();
                    })
                    .appendTo(container);

                icon = $("<img>")
                    .attr({
                        "src":"demo/img/resizemap.png"
                    })
                    .css({
                        "height":"39px",
                        "width":"39px",
                        "position":"absolute",
                        "top":"7px",
                        "left":"7px"
                    })
                    .appendTo(btn);

                return btn;
            },

            /**
             * Method: completeMapBtn
             * 创建放大缩小按钮。
             *
             * Returns:
             * {HTMLElement}  返回 Dom 对象。
             */
            zoomOutInBtn:function(container,isZoomOut){
                var btn,icon,t=this;

                btn = $("<span>")
                    .css({
                        "height":"28px",
                        "width":"34px",
                        "display":"inline-block",
                        "position":"relative",
                        "margin-top":"4px",
                        "vertical-align":"top",
                        "cursor":"pointer"
                    })
                    .addClass("ui-state-default")//ui-corner-all
                    .attr({
                        "title":isZoomOut?"放大":"缩小"
                    })
                    .mouseover(function(){
                        $(this).addClass("ui-state-active");
                    })
                    .mouseout(function(){
                        $(this).removeClass("ui-state-active");
                    })
                    .appendTo(container);

                if(isZoomOut){
                    btn.css({
                        "-moz-border-top-left-radius": "14px",
                        "-webkit-border-top-left-radius": "14px",
                        "-khtml-border-top-left-radius": "14px",
                        "border-top-left-radius": "14px",
                        "-moz-border-bottom-left-radius": "14px",
                        "-webkit-border-bottom-left-radius": "14px",
                        "-khtml-border-bottom-left-radius": "14px",
                        "border-bottom-left-radius": "14px"
                    }).click(function(){
                            if(t.map)t.map.zoomIn();
                        });
                }
                else{
                    btn.css({
                        "-moz-border-top-right-radius": "14px",
                        "-webkit-border-top-right-radius": "14px",
                        "-khtml-border-top-right-radius": "14px",
                        "border-top-right-radius": "14px",
                        "-moz-border-bottom-right-radius": "14px",
                        "-webkit-border-bottom-right-radius": "14px",
                        "-khtml-border-bottom-right-radius": "14px",
                        "border-bottom-right-radius": "14px"
                    }).click(function(){
                            if(t.map)t.map.zoomOut();
                        });
                }

                icon = $("<img>")
                    .attr({
                        "src":isZoomOut?"demo/img/zoomout_t3.png":"demo/img/zoomin_t3.png"
                    })
                    .css({
                        "height":"14px",
                        "width":"14px",
                        "position":"absolute",
                        "top":"7px",
                        "left":"10px"
                    })
                    .appendTo(btn);

                return btn;
            },
            /**
             * Method: iconLabelBtn
             * 符号文字按钮。
             *
             * Returns:
             * {HTMLElement}  返回 Dom 对象。
             */
            iconLabelBtn:function(container,iconSrc,title,menu){
                var btn,icon,t1,mb;

                btn = $("<span>")
                    .css({
                        "height":"28px",
                        "display":"inline-block",
                        "position":"relative",
                        "margin-top":"4px",
                        "margin-left":"1px",
                        "margin-right":"1px",
                        "vertical-align":"top",
                        "padding":"0px 5px 0px 5px",
                        "border-width":"0px",
                        "background":"none",
                        "cursor":"pointer",
                        "overflow":"visible"
                    })
                    .addClass("ui-state-default")//ui-corner-all
                    .click(function(){})
                    .mouseover(function(menu){
                        return function(){
                            //$(this).addClass("ui-state-active");

                            var b = $.browser;
                            if(!b.msie||b.version!="7.0"){
                                $(this).css({
                                    "margin-left":"0px",
                                    "margin-right":"0px",
                                    "border-width":"1px",
                                    "margin-top":"3px"
                                });
                            }

                            if(menu){
                                log.print("mouseover btn");
                                menu.body.css({
                                    "display":"block"
                                });
                                if(menu.hiddenTimeout)window.clearTimeout(menu.hiddenTimeout);
                            }
                        }
                    }(menu))
                    .mouseout(function(){
                        //$(this).removeClass("ui-state-active");
                        var b = $.browser;
                        if(!b.msie||b.version!="7.0"){
                            $(this).css({
                                "margin-left":"1px",
                                "margin-right":"1px",
                                "border-width":"0px",
                                "margin-top":"4px"
                            });
                        }

                        if(menu){
                            log.print("mouseout from btn");
                            menu.hiddenTimeout = window.setTimeout(function(menu){
                                return function(){
                                    log.print("hide menu by btn");
                                    menu.body.css({
                                        "display":"none"
                                    });
                                    menu.hiddenTimeout = null;
                                }
                            }(menu),300);
                        }
                    })
                    .appendTo(container);

                icon = $("<img>")
                    .attr({
                        "src":iconSrc
                    })
                    .css({
                        "height":"20px",
                        "width":"20px",
                        "position":"relative",
                        "display":"inline-block",
                        "margin-top":"4px",
                        "vertical-align":"top"
                    })
                    .appendTo(btn);

                t1 = $("<span>")
                    .css({
                        "height":"20px",
                        "line-height":"20px",
                        "font-size":"16px",
                        "-webkit-text-size-adjust":"none",
                        "display":"inline-block",
                        "margin":"4px 0px 0px 5px",
                        "vertical-align":"top"
                    })
                    .html(title)
                    .appendTo(btn);

                if(menu){
                    mb = $("<div>")
                        .css({
                            "position":"absolute",
                            "top":"38px",
                            "display":"none",
                            "width":"80px",
                            "left":"0px"
                        })
                        .append(menu.menuBody)
                        .appendTo(btn);
                    menu.body = mb;

//                    menu.body.mousemove(function(menu){
//                        return function(){
//                            log.print("mouseover menu");
//                            if(menu.hiddenTimeout)window.clearTimeout(menu.hiddenTimeout);
//                        }
//                    }(menu))
//                        .mouseout(function(menu){
//                            return function(){
//                                log.print("mouseout menu");
//                                menu.hiddenTimeout = window.setTimeout(function(){
//                                    log.print("hide menu by menu");
//                                    menu.body.css({
//                                        "display":"none"
//                                    });
//                                    menu.hiddenTimeout = null;
//                                },300)
//                            }
//                        }(menu));
                }

                return btn;
            },
            /**
             * Method: separateLine
             * 创建分隔线。
             *
             * Returns:
             * {HTMLElement}  返回 Dom 对象。
             */
            separateLine:function(body){
                var d1;

                d1 = $("<span>")
                    .css({
                        "height":"28px",
                        "margin":"4px 2px 0px 2px",
                        "border-right-width":"0px",
                        "border-top-width":"0px",
                        "border-bottom-width":"0px",
                        "vertical-align":"top",
                        "display":"inline-block",
                        "position":"relative",
                        "width":"0px"
                    })
                    .addClass("ui-state-default")
                    .appendTo(body);

                return d1;
            }

//            createBtn:function(container,imgSrc,click,title){
//                var btn,icon,t1;
//
//                btn = $("<span>")
//                    .css({
//                        "display":"inline-block",
//                        "height":"70px",
//                        "width":"54px",
//                        "position":"relative",
//                        "margin":"10px 5px 0px 5px"
//                    })
//                    //.addClass("ui-state-default")
//                    .attr({
//                        "title":title
//                    })
//                    .click(click)
//                    .appendTo(container);
//
//                icon = $("<img>")
//                    .attr({
//                        "src":imgSrc
//                    })
//                    .css({
//                        "height":"54px",
//                        "width":"54px",
//                        "position":"absolute"
//                    })
//                    .appendTo(btn);
//
//                t1 = $("<div>")
//                    .css({
//                        "position":"absolute",
//                        "bottom":"0px",
//                        "font-size":"10px",
//                        "width":"100%",
//                        "text-align":"center",
//                        "vertical-align":"bottom",
//                        "-webkit-text-size-adjust":"none"
//                    })
//                    .html(title)
//                    .appendTo(btn);
//
//                return btn;
//            }
        },
        null,                              //父类
        false,                             //是否是静态类
        [                                  //初始化该类之前需要加载的js文件
            "demo/js/ui/jquery.ui.widget.js"
        ]
    );
})();
