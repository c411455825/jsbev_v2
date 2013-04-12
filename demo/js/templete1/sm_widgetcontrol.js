﻿/**
 * Class: SuperMap.Bev.WidgetControl
 *窗口管理控件(仅供模板一使用)。
 */
(function () {
    SuperMap.Bev.Class.create(
        "SuperMap.Bev.WidgetControl",
        {
            /**
             * APIProperty: body
             * {HTMLElement} 父容器
             */
            body:null,
            body_r:null,
            body_l:null,
            /**
             * Property: widgetsContainer
             * {HTMLElement} 放置widgets的容器
             */
            widgetsContainer:null,
            /**
             * Property: widgetsArray
             * {Array<Object>} 放置widgets的数组
             */
            widgetsArray:[],
            /**
             * Property: isHide
             * {Boolean} widgets是否隐藏
             */
            isHide:false,
            /**
             * APIProperty: top
             * {Number} 控件的上偏移量
             */
            top:60,
            /**
             * Property: hideWidgetsBtn
             * {HTMLElement} 按钮，用于控制widgets是否显示
             */
            hideWidgetsBtn:null,
            /**
             * Property: scorllTopBtn
             * {HTMLElement} 按钮，用于上翻widgets列表
             */
            scorllTopBtn:null,
            /**
             * Property: scorllBottomBtn
             * {HTMLElement} 按钮，用于下翻widgets列表
             */
            scorllBottomBtn:null,
            /**
             * Property: isIe7
             * {Boolean} 当前浏览器是否是ie7
             */
            isIe7:false,
            /**
             * Constructor: SuperMap.Bev.WidgetControl
             * 实例化 WidgetControl 类。
             *
             * Parameters:
             * body - {HTMLElement} 父容器
             *
             * Examples:
             * (code)
             * var myWidgetControl = new SuperMap.Bev.WidgetControl("#widgetControl");
             * (end)
             */
            init:function (body) {
                var bd, bdl, bdr, wsc, br;
                br = $.browser;
                this.isIe7 = (br.msie && br.version == "7.0") ? true : false;
                bd = this.body = $(body);
                //bd.css("width","400px");
                bd.html("");
                bd.attr("onselectstart", "return false");

                bdl = this.body_l = $("<span class=\"widgetControl_l\"></span>");
                wsc = this.widgetsContainer = $("<div class=\"widgetsCon\"></div>");
                bdl.append(wsc);
                bdr = this.body_r = $("<span class=\"widgetControl_r\"></span>");
                bdl.css("display", "none");
                bd.append(bdl).append(bdr);

                this.createbtn(bdr);
            },
            /**
             * APIMethod: addWidget
             * 往其中添加窗口。
             *
             *Parameters:
             *widget <SuperMap.Bev.Dialog>  dialog对象
             */
            addWidget:function (widget) {
                widget = widget.body;
                var wcs = this.widgetsContainer, me = this;
                this.body_l.css("display", "inline-block");
                var widget_container = this.createWidgetContainer(wcs);
                widget_container.append(widget);
                var option_default = {
                    "body":widget_container,
                    "position":{my:"left top", at:"[0,0]", "of":widget_container, "using":function () {
                    }},
                    "draggable":false
                };
                var option_out = {
                    "body":"body",
                    "position":{
                        my:"center",
                        at:"center",
                        of:window,
                        using:function (pos) {
                            var topOffset = $(this).css(pos).offset().top;
                            if (topOffset < 0) {
                                $(this).css("top", pos.top - topOffset);
                            }
                        }
                    },
                    "draggable":true
                };

                var removeoutbtn = $("<a href='#'></a>")
                    .addClass("widget_removeoutbtn  ui-corner-all")
                    .attr("role", "button")
                    .attr("title", "移出")
                    .click(function (widget, widget_container) {
                    return function () {
                        addtionbtn_clic_out(widget, this, widget_container);
                    }
                }(widget, widget_container)).append($("<span>").addClass("ui-icon ui-icon-pin-w"));

                var minimizebtn = $("<a href='#'></a>")
                    .addClass("widget_minusbtn  ui-corner-all")
                    .attr("role", "button")
                    .attr("title", "最小化")
                    .click(function (widget) {
                    return function () {
                        var target = widget.dialog("option", "uiDialog");
                        minimizeWidget(target, $(this), widget);
                    }
                }(widget)).append($("<span>").addClass("ui-icon ui-icon-minus"));

                widget.dialog(this.concatOption({
                    "notFocuse":true,
                    "addtionbtn":$("<div></div>").append(removeoutbtn).append(minimizebtn)
                }, option_default))
                widget.isDialog = true;
                widget.removeoutbtn = removeoutbtn;
                widget.minimizebtn = minimizebtn;
                //var height = widget.dialog("option","height" );
                //widget_container.css("height",height);
                widget_container.children().css("position", "relative");
                widget.dialog("option", "notFocuse", false);
                widget.on("dialogclose", function (widget, widget_container) {
                    return function (event, ui) {
                        if (widget.isInList) {
                            widget.dialog("option", "uiDialog").css("display", "block");
                            me.reduceWidget(widget_container, 1, function (widget) {
                                return function () {
                                    widget.dialog("destroy");
                                    me.removeWidget(widget.sm_index);
                                    me.disableScorllWidgetBtn();
                                    me.disableHideWidgetsBtn();
                                    me.modifyWidgetsHeight();
                                }
                            }(widget));
                        }
                        else {
                            widget.dialog("option", "uiDialog").remove();
                        }
                    }
                }(widget, widget_container));
                widget.isInList = true;
//        window.setTimeout(function(){
//            $(".widget_container .ui-dialog").css("position","relative");
//        },30);

                this.pushWidget(widget_container, widget);
                window.setTimeout(function () {
                    if (me.modifyWidgetsHeight()) {
                        me.moveWidgets("bottom", true);
                    }
                    me.disableHideWidgetsBtn();
                }, 300)
                return widget;
                /**
                 * Method: addtionbtn_clic_out
                 * 从widget列表中移除一个widget。
                 *
                 * Parameters:
                 * widget {<SuperMap.Bev.Dialog>}  要移除的widget对象
                 * btn {HTMLElement} 移除按钮
                 * widget_container {HTMLElement} 放置widget列表的容器
                 */
                function addtionbtn_clic_out(widget, btn, widget_container) {
                    me.reduceWidget(widget_container, 1, function (widget, btn, widget_container) {
                        return function () {
                            widget_container.css("margin", "0px");
                            widget.dialog(option_out);
                            widget.isInList = false;
                            widget.removeoutbtn.attr("title", "移入");
                            $(btn).children().removeClass("ui-icon-pin-w").addClass("ui-icon-pin-s");
                            $(btn).unbind("click");
                            $(btn).click(function (widget, btn) {
                                return function () {
                                    addtionbtn_clic_in(widget, btn);
                                }
                            }(widget, btn));
                            widget.dialog("option", "uiDialog").css("position", "absolute");
                            window.setTimeout(function (widget) {
                                return function () {
                                    me.removeWidget(widget.sm_index);
                                    me.modifyWidgetsHeight();
                                    me.disableScorllWidgetBtn();
                                    me.disableHideWidgetsBtn();
                                }
                            }(widget), 300)
                        }
                    }(widget, btn, widget_container));
                }
                /**
                 * Method: addtionbtn_clic_in
                 * 往widget列表中加入一个widget。
                 *
                 * Parameters:
                 * widget {<SuperMap.Bev.Dialog>}  要加入的widget对象
                 * btn {HTMLElement} 按钮
                 */
                function addtionbtn_clic_in(widget, btn) {
                    var widget_container = me.createWidgetContainer(me.widgetsContainer);
                    widget.dialog(me.concatOption(option_default, {
                        "body":widget_container,
                        "position":{my:"left top", at:"[0,0]", "of":widget_container, "using":function () {
                        }}
                    }));
                    widget.isInList = true;
                    widget.dialog("option", "uiDialog").css("position", "relative");
                    me.pushWidget(widget_container, widget);
                    widget.removeoutbtn.attr("title", "移出");
                    $(btn).children().removeClass("ui-icon-pin-s").addClass("ui-icon-pin-w");
                    $(btn).unbind("click");
                    $(btn).click(function (widget, btn, widget_container) {
                        return function () {
                            addtionbtn_clic_out(widget, btn, widget_container);
                        }
                    }(widget, btn, widget_container));
                    widget_container.children().css({
                        "left":"0px",
                        "top":"0px"
                    });
                    if (me.isIe7) {
                        var bdstyle = window.document.body.style;

                        bdstyle.zoom = bdstyle.zoom == 2 ? 1 : 2;
                    }
                    window.setTimeout(function () {
                        if (me.modifyWidgetsHeight())me.moveWidgets("bottom", true);
                        me.disableHideWidgetsBtn();
                    }, 300);
                }
                /**
                 * Method: minimizeWidget
                 * 将widget最小化。
                 *
                 * Parameters:
                 * target {<SuperMap.Bev.Dialog>}  widget对象
                 * btn {HTMLElement} 按钮
                 */
                function minimizeWidget(target, btn) {
                    me.reduceWidget(target, 30, function (btn) {
                        return function (oldHeight) {
                            btn.unbind("click");
                            btn.click(function (target, btn, oldHeight) {
                                return function () {
                                    restoreWidget(target, btn, oldHeight);
                                }
                            }(target, btn, oldHeight));
                            btn.attr("title", "还原");
                            $(btn).children().removeClass("ui-icon-minus").addClass("ui-icon-newwin");
                            me.disableScorllWidgetBtn();
                            me.modifyWidgetsHeight();
                        }
                    }(btn))
                }
                /**
                 * Method: restoreWidget
                 * 将widget从最小化状态还原。
                 *
                 * Parameters:
                 * target {<SuperMap.Bev.Dialog>}  widget对象
                 * btn {HTMLElement} 按钮
                 * oldHeight {String} widget原先的高度
                 */
                function restoreWidget(target, btn, oldHeight) {
                    me.reduceWidget(target, oldHeight, function (btn) {
                        return function () {
                            btn.unbind("click");
                            btn.click(function (target, btn) {
                                return function () {
                                    minimizeWidget(target, btn);
                                }
                            }(target, btn));
                            btn.attr("title", "最小化");
                            $(btn).children().removeClass("ui-icon-newwin").addClass("ui-icon-minus");
                            me.disableScorllWidgetBtn();
                            me.modifyWidgetsHeight()
                        }
                    }(btn))
                }
            },
            /**
             * Method: modifyWidgetsHeight
             * 随着widget的增减，修改其容器的高度，已经做一些其他处理。
             */
            modifyWidgetsHeight:function () {
                var allHeight, widgetsHeight, top, bufferHeight, widgetsTop, wsc = this.widgetsContainer;

                allHeight = $(window).height();
                widgetsHeight = wsc.height();
                top = this.top;
                bufferHeight = 10;
                widgetsTop = wsc.position().top;
                if ((widgetsHeight + top + bufferHeight + widgetsTop) > allHeight) {
                    this.body.css({
                        "height":"100%"
                    });
                    this.body_l.css({
                        "overflow":"hidden",
                        "height":"100%"
                    });
                    return true;
                }
                else {
                    this.body.css({
                        "height":"auto"
                    });
                    this.body_l.css({
                        "overflow":"visible",
                        "height":"auto"
                    });
                    return false;
                }
            },
            /**
             * Method: reduceWidget
             * 减小widget的高度。
             *
             * Parameters:
             * target {<SuperMap.Bev.Dialog>}  widget对象
             * height {Number} 高度值
             * callback {Function} 高度减小完成后的回调函数
             */
            reduceWidget:function (target, height, callback) {
                var h = Math.floor(target.height());
                target.css({
                    "height":h + "px",
                    "overflow":"hidden"
                });
                window.setTimeout(function (target, height, callback, oldHeight) {
                    return function () {
                        target.animate({
                            "height":height
                        }, "fast", "linear", function (cb) {
                            return function () {
                                if (cb) {
                                    cb(oldHeight);
                                }
                            }
                        }(callback));
                    }
                }(target, height, callback, h), 300)
            },
            /**
             * Method: pushWidget
             * 将widget加入列表。
             *
             * Parameters:
             * widget_container {HTMLElement}  widget容器
             * widget {SuperMap.Bev.Dialog} widget对象
             */
            pushWidget:function (widget_container, widget) {
                var obj = {
                    "widget":widget,
                    "container":widget_container
                };
                this.widgetsArray.push(obj);
                widget.sm_index = this.widgetsArray.length - 1;
            },
            /**
             * Method: removeWidget
             * 删除widget。
             *
             * Parameters:
             * index {Number}  widget在列表中的索引值
             */
            removeWidget:function (index) {
                var wa = this.widgetsArray;
                var obj = wa.splice(index, 1);
                $(obj[0].container).remove();
                for (var i = index; i < wa.length; i++) {
                    var obj = wa[i];
                    obj.widget.sm_index = i;
                }
            },
            /**
             * Method: concatOption
             * 克隆参数。
             *
             * Parameters:
             * source {Object}  源参数对象
             * target {Object}  目标参数对象
             */
            concatOption:function (source, target) {
                for (var key in target) {
                    source[key] = target[key];
                }
                return source;
            },
            /**
             * Method: createWidgetContainer
             * 创建widget列表容器。
             *
             * Parameters:
             * con {HTMLElement}  父容器
             */
            createWidgetContainer:function (con) {
                var html = "<div class=\"widget_container\"></div>";
                var widget_container = $(html);
                con.append(widget_container);

                return widget_container;
            },
            /**
             * Method: createbtn
             * 创建一个按钮。
             *
             * Parameters:
             * con {HTMLElement}  父容器
             */
            createbtn:function (con) {
                var btn1, btn2, btn3, me = this;
                this.hideWidgetsBtn = btn1 = $("<button class=\"widgetControl_btn\">&nbsp;</button>")
                    .attr("title", "隐藏窗口")
                    .css({"border":"1px solid #fff"});
                this.scorllTopBtn = btn2 = $("<button class=\"widgetControl_btn\">往下滚动</button>")
                    .css({"border":"1px solid #fff"});
                this.scorllBottomBtn = btn3 = $("<button class=\"widgetControl_btn\">往上滚动</button>")
                    .css({"border":"1px solid #fff"});
                var html = "<div class=\"ui-corner-all widgetControl\">";
                html += "</div>";
                $(con).append($(html).append(btn1).append(btn2).append(btn3));

                //右上角widget控制按钮
                btn1.button({
                    icons:{
                        primary:"ui-icon-circle-arrow-e"
                    },
                    text:false,
                    "disabled":true
                }).click(function (me) {
                    return function () {
                        me.hideOrShowWidgets(function () {
                            var btn = $(".widgetControl_btn:first");
                            btn.button({
                                icons:{
                                    primary:btn.button("option", "icons").primary == "ui-icon-circle-arrow-e" ? "ui-icon-circle-arrow-w" : "ui-icon-circle-arrow-e"
                                },
                                text:false
                            })
                        });
                    }
                }(this));
                btn2.button({
                    icons:{
                        primary:"ui-icon-circle-triangle-n"
                    },
                    text:false,
                    "disabled":true
                }).click(function (me) {
                    return function () {
                        me.moveWidgets("top");
                    }
                }(this));
                btn3.button({
                    icons:{
                        primary:"ui-icon-circle-triangle-s"
                    },
                    text:false,
                    "disabled":true
                }).click(function (me) {
                    return function () {
                        me.moveWidgets("bottom");
                    }
                }(this));
                this.removeCss([btn1, btn2, btn3]);
            },
            /**
             * Method: removeCss
             * mouseover/mouseout按钮状态变化。
             *
             * Parameters:
             * doms {HTMLElement}  按钮
             */
            removeCss:function (doms) {
                for (var i = 0; i < doms.length; i++) {
                    doms[i].mouseout(function () {
                        $(this).removeClass("ui-state-focus");
                    })
                }
            },
            /**
             * Method: disableScorllWidgetBtn
             * 当放置在列表中的widget不足够多时，使得上下翻widget列表的按钮失效
             *
             */
            disableScorllWidgetBtn:function () {
                var widgetList, height, top, allHeight;

                widgetList = this.widgetsContainer;
                top = widgetList.position().top;
                if (top >= this.top) {
                    this.scorllTopBtn.button("option", "disabled", true);
                    this.scorllTopBtn.button("option", "buttonElement").removeClass("ui-state-hover").removeClass("ui-state-focus");
                }
                else {
                    this.scorllTopBtn.button("option", "disabled", false);
                }
                height = widgetList.height();
                allHeight = $(window).height();
                if (top + height <= allHeight) {
                    this.scorllBottomBtn.button("option", "disabled", true);
                    this.scorllBottomBtn.button("option", "buttonElement").removeClass("ui-state-hover").removeClass("ui-state-focus");
                }
                else {
                    this.scorllBottomBtn.button("option", "disabled", false);
                }
            },
            /**
             * Method: disableHideWidgetsBtn
             * 当列表中没有widget时，使得隐藏列表的按钮失效
             */
            disableHideWidgetsBtn:function () {
                var btn = this.hideWidgetsBtn;
                if (this.widgetsArray.length == 0) {
                    btn.button("option", "disabled", true);
                    return true;
                }
                else {
                    btn.button("option", "disabled", false);
                    return false;
                }
            },
            /**
             * Method: moveWidgets
             * 移动widget列表
             *
             * Parameters:
             * direction {String}  移动方向,bottom or top
             * isAdd {Boolean} 是否因为新加入widget而移动
             * callback {Function} 移动完毕后的回调函数
             */
            moveWidgets:function (direction, isAdd, callback) {
                var h1, h2, h3, h4, h7, offsetY, showWidget, tw, wa = this.widgetsArray, wh, wsc = this.widgetsContainer, wt,
                    me = this;
                h3 = Math.floor(wsc.position().top) * -1;
                if (direction == "bottom") {
                    h1 = Math.floor(this.body_l.height());
                    h4 = h1 + h3;
                    if (isAdd) {
                        tw = wa[wa.length - 1].container;
                        wt = Math.floor(tw.position().top);
                        wh = Math.floor(tw.height());
                        if (h4 < (wt + wh)) {
                            showWidget = tw;
                            h2 = wt + wh;
                        }
                    }
                    else {
                        for (var i = 0; i < wa.length; i++) {
                            tw = wa[i].container;
                            wt = Math.floor(tw.position().top);
                            wh = Math.floor(tw.height());
                            if (h4 >= wt && h4 < (wt + wh)) {
                                showWidget = tw;
                                h2 = wt + wh;
                                break;
                            }
                            else if (h4 <= wt) {
                                showWidget = tw;
                                h2 = wt + wh;
                                break;
                            }
                        }
                    }
                    if (showWidget) {
                        offsetY = (h2 - h4 + 15) * -1;
                    }
                }
                else if (direction == "top") {
                    for (var i = wa.length - 1; i >= 0; i--) {
                        tw = wa[i].container;
                        wt = Math.floor(tw.position().top) - this.top;
                        wh = Math.floor(tw.height());
                        if (h3 > wt && h3 < (wt + wh)) {
                            showWidget = tw;
                            h7 = wt;
                            break
                        }
                        else if (h3 > (wt + wh)) {
                            showWidget = tw;
                            h7 = wt;
                            break
                        }
                    }
                    if (showWidget) {
                        offsetY = h3 - h7;
                    }
                }
                if (showWidget) {
                    this.move(null, offsetY, this.widgetsContainer, function (callback) {
                        return function () {
                            me.disableScorllWidgetBtn();
                            if (callback)callback();
                        }
                    }(callback));
                }
            },
            /**
             * Method: hideOrShowWidgets
             * 隐藏或显示widgets列表
             *
             * Parameters:
             * callback {Function} 移动完毕后的回调函数
             */
            hideOrShowWidgets:function (callback) {
                var offsetX, me = this, isIe7, br;


                if (this.isHide) {
                    offsetX = -405;
                }
                else {
                    //isIe7&&me.body_l.css("overflow-x","hidden");
                    offsetX = 405;
                }

                this.move(offsetX, null, this.widgetsContainer, function (cb, isIe7) {
                    return function () {
                        me.isHide = !me.isHide;
                        me.hideWidgetsBtn.attr("title", me.isHide ? "显示窗口" : "隐藏窗口");
                        if (cb)cb();
                    }
                }(callback, isIe7))
            },
            /**
             * Method: move
             * 移动对象
             *
             * Parameters:
             * offsetX {Number} 水平偏移量
             * offsetY {Number} 垂直偏移量
             * target {HTMLElement} 待移动的dom元素
             * callback {Function} 移动完后的回调方法
             */
            move:function (offsetX, offsetY, target, callback) {
                var p, y, s = {}, x;

                p = target.position();
                if (offsetY) {
                    y = Math.floor(p.top);
                    y = y + offsetY;
                    s.top = y;
                }
                if (offsetX) {
                    x = Math.floor(p.left);
                    x = x + offsetX;
                    s.left = x;
                }
                target.animate(s, "fast", "linear", function (cb) {
                    return function () {
                        if (cb) {
                            cb();
                        }
                    }
                }(callback));
            }
        },
        null,                              //父类
        false,                             //是否是静态类
        [                                  //初始化该类之前需要加载的js文件
            "demo/js/ui/jquery.ui.widget.js",
            "demo/js/ui/jquery.ui.button.js"
        ]
    );
})();
