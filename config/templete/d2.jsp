<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%
String theme = (String) request.getParameter("theme");
String x = (String) request.getParameter("x");
String y = (String) request.getParameter("y");
String z = (String) request.getParameter("z");
String layerType = (String) request.getParameter("layerType");
String url = (String) request.getParameter("url");
String mapCtrl = (String) request.getParameter("mapCtrl");
String bevCtrl = (String) request.getParameter("bevCtrl");
if(theme == null){
	theme = "cupertino";
}
if(x==""||x==null){
	x="0";
}
if(y==""||y==null){
	y="0";
}
if(z==""||z==null){
	z="0";
}
if(layerType==null)layerType="1";
if(mapCtrl==null)mapCtrl="";
if(bevCtrl==null)bevCtrl="1_2_3";
%>
<!DOCTYPE html> 
<html> 
	<head> 
	<title>supermap</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="lib/SuperMap.Include.js"></script>
	<script src="js/jquery-1.8.2.js"></script>
    <script src="js/demo2/bev_main.js"></script>
    <!--
     //初始化bev框架，
    SuperMap.Bev.Main.init(function(){
            //页面代码需要放入其回调函数中


            //设置主题，支持的主题有base，black-tie，blitzer，cupertino，dark-hive
            //dot-luv，eggplant，excite-bike，flick，hot-sneaks，humanity，le-frog，mint-choc，overcast，pepper-grinder
            //redmond，smoothness，south-street，start，sunny，swanky-purse，trontastic，ui-darkness，ui-lightness，vader
            SuperMap.Bev.Theme.set("dot-luv");

            //your code
        });
    -->
    
    
    <jsp:include page="initMap.jsp"> 
		<jsp:param name="theme" value="<%=theme%>"/>
		<jsp:param name="x" value="<%=x%>"/> 
		<jsp:param name="y" value="<%=y%>"/> 
		<jsp:param name="z" value="<%=z%>"/> 
		<jsp:param name="layerType" value="<%=layerType%>"/>
		<jsp:param name="url" value="<%=url%>"/>
		<jsp:param name="mapCtrl" value="<%=mapCtrl%>"/>
	</jsp:include>
	<script>
        var myMeasure,myTooltip,myGeolocate,myDrawFeature;
        function initDemo(){
			<%if(bevCtrl.indexOf("1")>=0){%>
            var myIcon1 = new SuperMap.Bev.Icon($("#bd_toolbar"),{
                "title":"面积量算",
                "img":"images/frameimages/measure2.png",
                "click":function(){
                    var m = getMesure();
                    m.measureArea();
                },
                "isDisplayTitle":true
            });

            var myIcon2 = new SuperMap.Bev.Icon($("#bd_toolbar"),{
                "title":"距离量算",
                "img":"images/frameimages/measure_16_16.png",
                "click":function(){
                    var m = getMesure();
                    m.measureDistance();
                },
                "isDisplayTitle":true
            });
			<%}%>
			<%if(bevCtrl.indexOf("2")>=0){%>
            var myIcon3 = new SuperMap.Bev.Icon($("#bd_toolbar"),{
                "title":"定位",
                "img":"images/frameimages/geolocate_16_16.png",
                "click":function(){
                    var g = getGeolocate();
                    g.geolocateMe();
                },
                "isDisplayTitle":true
            });
            var myIcon4 = new SuperMap.Bev.Icon($("#bd_toolbar"),{
                "title":"清除标记",
                "img":"images/frameimages/clear.png",
                "click":function(){
                    var g = getGeolocate();
                    g.clearGeoMarkers();
                },
                "isDisplayTitle":true
            });
			<%}%>
			<%if(bevCtrl.indexOf("3")>=0){%>
            myDrawFeature = new SuperMap.Bev.DrawFeature($("<div>"));
            var drawFeatureBody = myDrawFeature.body;
            window.setTimeout(function(){myDrawFeature.setMap(map);},30);
			<%}%>
            var myAccordion = new SuperMap.Bev.Accordion($("#left_menu"),
                [
                    <%if(bevCtrl.indexOf("3")>=0){%>
                    {
                        "title":"绘制",
                        "body":drawFeatureBody
                    },
					<%}%>
                    {
                        "title":"查询",
                        "body":$("<p>this is a examples</p><br><p>this is a examples</p><br><p>this is a examples</p>")
                    },
                    {
                        "title":"分析",
                        "body":$("<p>this is a examples</p><br><p>this is a examples</p><br><p>this is a examples</p>")
                    },
                    {
                        "title":"专题图",
                        "body":$("<p>this is a examples</p><br><p>this is a examples</p><br><p>this is a examples</p>")
                    },
                    {
                        "title":"公交查询",
                        "body":$("<p>this is a examples</p><br><p>this is a examples</p><br><p>this is a examples</p>")
                    }
                ]
            );

            SuperMap.Bev.DemoUtil.toolBarHideBtn($("#bd_left"),$("#bd_right"));
        }

        function getMesure(){
            if(!myMeasure){
                myMeasure = new SuperMap.Bev.Measure(null,map);
                myMeasure.showResult = function(txt){
                    var tooltip = getTooltip();
                    tooltip.show(txt);
                }

                myMeasure.clearResult = function(txt){
                    var tooltip = getTooltip();
                    tooltip.close();
                }
            }

            return myMeasure;
        }
        function getTooltip(){
            if(!myTooltip){
                myTooltip = new SuperMap.Bev.Tooltip($("#bd_right"),{
                    "position":["center","top"],
                    "offset":{"x":0,"y":40}
                });
            }
            return myTooltip;
        }
        function getGeolocate(){
            if(!myGeolocate){
                myGeolocate = new SuperMap.Bev.Geolocate(null, map);
            }

            return myGeolocate;
        }

    </script>


    </head>
<body onload="init()" style="position: absolute;width: 100%;height: 100%;">
<!--[if IE 7]><div style="position: absolute;width: 100%;height: 100%;overflow: hidden;"><![endif]-->
    <div id="head" class="background_1">
        <span id="logo" class="inline_block"></span>
    </div>
    <div id="bev_bd">
        <div id="bd_left" class="floatl">
            <div id="left_back"></div>
            <div class="bd_left_d0"><span id="left_menu" class="bdleft_d1 inline_block">test</span></div>
        </div>
        <div id="bd_right" class="">
            <div id="bd_toolbar" class="bd_toolbar">
                <div id="toolbar_back"></div>
            </div>
            <div id="mapContainer" class="bd_map" style="border: 0px solid #000;"></div>
        </div>
    </div>
<!--[if IE 7]></div><![endif]-->
</body>
<script type="text/javascript">
    (function(){
        window.resizeFunctions = [];
        var a = function(){
            var b = document.body;
            var a = b.clientHeight;
            var c = window.resizeFunctions;
            for(var i=0;i< c.length;c++){
                if(c[i]){
                    try{c[i]();}catch(e){}
                }
            }
            document.getElementById("bev_bd").style.height = (a - 65) + "px";
        }
        a();
        if(window.addEventListener){
            window.addEventListener("resize",a);
        }
        else{
            window.attachEvent("onresize",a);
        }
    })();
</script>
</html>
