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
        t.lonInput = null;
        t.latInput = null;
        t.levelInput = null;
        t.iserverLayerInfoBody = null;
        t.requestsObj = {};
        //t.isReLoadDemo = false;
        t.createToolbar();
        t.createStep1();
        t.createStep2();
        t.createStep3();

        t.setMapStatus();
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
        var url = "../demo.jsp?",me=this;
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
        //this.isReLoadDemo = true;
        window.setTimeout(function(){
            me.setMapStatus();
        },300);
    }
    B.createStep3 = function(){
        var b,d1,d2,t = this;

        b = t.toolBarContent;
        d1 = $("<div>")
            .html("3.设置地图参数")
            .css({
                "margin":"20px 0px 0px 10px"
            })
            .appendTo(b);

        d1 = $("<div>")
            .css({
                "margin":"10px 0px 0px 10px"
            })
            .appendTo(b);

        t.createInput(d1,"地图名称:","SuperMap");

        d1 = $("<div>")
            .html("选择地图服务:")
            .css({
                "margin":"20px 0px 0px 10px"
            })
            .appendTo(b);

        d1 = $("<div>")
            .css({
                "margin":"10px 0px 0px 10px"
            })
            .appendTo(b);

        var serviceTypes = [
            {"name":"SuperMap云服务","value":1},//1
            {"name":"SuperMap iServer Java 6R服务","value":2},//2
            {"name":"Google地图","value":3},//3
            {"name":"OpenStreet Map","value":4},//4
            {"name":"天地图","value":5},//5
            {"name":"ArcGis Online","value":6},//6
            {"name":"百度地图","value":7},//7
            {"name":"Bing 地图","value":8}//8
        ];

        this.createSelectBar(d1,serviceTypes,function(txt){
            if(txt==2){
                t.getIServerLayersInfo();
            }
            else{
                t.confParam.layerType = txt;
                t.confParam.x = "";
                t.confParam.y = "";
                t.confParam.z = "";
                t.setDemoPara(t.confParam);
            }
        },30,205);

        this.iserverLayerInfoBody = $("<div>")
            .css({
                "margin":"10px 0px 0px 10px",
                "display":"none"
            })
            .appendTo(b);

        d1 = $("<div>")
            .html("地图中心点:")
            .css({
                "margin":"20px 0px 0px 10px"
            })
            .appendTo(b);

        d1 = $("<div>")
            .css({
                "margin":"10px 0px 0px 10px",
                "height":"26px"
            })
            .appendTo(b);

        d2 = t.createInput(d1,"经度","","40px","100px",true);
        t.lonInput = d2[1];
        d2 = t.createInput(d1,"纬度","","40px","100px",true);
        t.latInput = d2[1];

        d1 = $("<div>")
            .css({
                "margin":"10px 0px 0px 10px"
            })
            .appendTo(b);

        d2 = t.createInput(d1,"地图级别:","",null,"40px",true);
        t.levelInput = d2[1];
    }
    B.createInput = function(container,title,defaultContent,width1,width2,isDisable){
        var d0,d1;

        d0 = $("<span>")
            .css({
                "display":"inline-block",
                "vertical-align":"top",
                "width":width1||"100px",
                "padding-top":"5px"
            })
            .html(title)
            .appendTo(container);

        d1 = $("<input>")
            .attr({
                "value":defaultContent||"",
                "type":"text"
            })
            .css({
                "vertical-align":"top",
                "width":width2||"200px",
                "margin-right":"5px"
            })
            .appendTo(container);
        if(isDisable)d1.attr({
            "disabled":"disabled"
        });

        return [d0,d1];
    }
    B.setMapStatus = function(){
        var me = this;
        var frame = document.getElementById("mapFrame");
        //var frameWindow = frame.contentWindow;
        checkMapLoaded();

        function checkMapLoaded(){
            if(frame.contentWindow.SMLoaded){
                me.frameMap = frame.contentWindow.map;
//                if(me.isReLoadDemo){
//                    moveMap();
//                }
//                else{
//                    setStatus();
//                }
                setStatus();
                frame.contentWindow.map.events.register("moveend", me, setStatus);
                //me.isReLoadDemo = false;
                frame.contentWindow.SMLoaded = false;
                return;
            }
            window.setTimeout(checkMapLoaded,1000);
        }

        function setStatus(){
            var center = me.frameMap.getCenter();
            var lon = center.lon;
            var lat = center.lat;
            var level = me.frameMap.getZoom();

            me.lonInput.attr("value",lon);
            me.latInput.attr("value",lat);
            me.levelInput.attr("value",level);

            me.confParam.x = lon;
            me.confParam.y = lat;
            me.confParam.z = level;
        }

//        function moveMap(){
//            var lon = parseFloat(me.lonInput.attr("value"));
//            var lat = parseFloat(me.latInput.attr("value"));
//            var level = parseFloat(me.levelInput.attr("value"));
//            me.frameMap.setCenter(new SuperMap.LonLat(lon , lat) , level);
//        }
    }
    B.getIServerLayersInfo = function(){
        var url = window.location.host,t=this;
        url = "http://"+url+"/iserver/services.jsonp";

//        $.ajax({
//            "dataType":"jsonp",
//            "error":function(){},
//            "success":function(data){
//                var layerInfo = [];
//                if(data&&data.length){
//                    for(var i=0;i<data.length;i++){
//                        var obj = data[i];
//                        var name = obj.name;
//                        if(name.match(/map-[A-z0-9]*\/rest/)){
//                            layerInfo.push({
//                                "name":name,
//                                "value":obj.url
//                            });
//                        }
//                    }
//                    create(layerInfo);
//                }
//            },
//            "type":"GET",
//            "url":url
//        });

        this.request(url,function(data){
            var urls = [];
            if(data&&data.length){
                for(var i=0;i<data.length;i++){
                    var obj = data[i];
                    var name = obj.name;
                    if(name.match(/map-[A-z0-9]*\/rest/)){
                        urls.push(obj.url + "/maps.jsonp");
                    }
                }
                t.requests(urls,function(datas){
                    var layerInfo = [];
                    if(datas&&datas.length){
                        for(var i=0;i<datas.length;i++){
                            for(var j=0;j<datas[i].length;j++){
                                var tpob = datas[i][j];
                                layerInfo.push({
                                    "name":tpob.name,
                                    "value":tpob.path
                                });
                            }
                        }
                        create(layerInfo);
                    }
                })
                //create(layerInfo);
            }
        })

        function create(layerInfo){
            var body = t.iserverLayerInfoBody;
            if(body){
                body.css({
                    "display":"block"
                });

                if(body.html()||body.html()==""){
                    var d1 = $("<div>")
                        .html("选择iServer服务:")
                        .css({
                            "margin":"20px 0px 0px 10px"
                        })
                        .appendTo(body);

                    d1 = $("<div>")
                        .css({
                            "margin":"10px 0px 0px 10px"
                        })
                        .appendTo(body);

                    t.createSelectBar(d1,layerInfo,function(txt){
                        t.confParam.layerType = 2;
                        t.confParam.url = escape(txt);
                        t.confParam.x = "";
                        t.confParam.y = "";
                        t.confParam.z = "";
                        t.setDemoPara(t.confParam);
                    },30,205);
                }
            }
        }
    }
    B.request = function(url,callback){
        $.ajax({
            "dataType":"jsonp",
            "error":function(callback){return function(){callback();}}(callback),
            "success":function(callback){return function(data){callback(data);}}(callback),
            "type":"GET",
            "url":url
        });
    }
    B.requests = function(urls,callback){
        var key = new Date().getTime() + "_request",me = this;
        for(var i=0;i<urls.length;i++){
            this.request(urls[i],function(key,length,cur,callback){
                return function(data){
                    if(!me.requestsObj[key]){
                        me.requestsObj[key] = [];
                    }

                    me.requestsObj[key].push(data);

                    if(me.requestsObj[key].length == length){
                        var res = me.requestsObj[key];
                        me.requestsObj[key] = null;
                        callback(res);
                    }
                }
            }(key,urls.length,i,callback));
        }
    }
    new A();
})()