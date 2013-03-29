<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%
String theme = (String) request.getParameter("theme");
String x = (String) request.getParameter("x");
String y = (String) request.getParameter("y");
String z = (String) request.getParameter("z");
String layerType = (String) request.getParameter("layerType");
String url = (String) request.getParameter("url");
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
%>
<!DOCTYPE html>
<html>
<head>
    <title>supermap</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="./lib/SuperMap.Include.js"></script>
    <script src="./js/jquery-1.8.2.js"></script>
    <script src="./js/demo1/sm_bev_main.js"></script>
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
	</jsp:include>
	<script>
        var myWidgetControl,myMenuPanel,myMeasure,myNavigation,myGeolocate,myDrawFeature;
        function initDemo(){
            myWidgetControl = new SuperMap.Bev.WidgetControl("#widgetControl");
            myMenuPanel = new SuperMap.Bev.MenuPanel($("#toolbar"),{
                "tree":[
                    {
                        "icon":"tool_icon",
                        "title":"基本操作",
                        "menu":new SuperMap.Bev.Menu(null,{
                            "tree":[
                                {
                                    "icon":"measure_16_16",
                                    "text":"量&nbsp;&nbsp;&nbsp;&nbsp;算",
                                    "events":{
                                        "click":function () {
                                            if (!myMeasure) {//!myMeasure
                                                var dialog = new SuperMap.Bev.Dialog(myWidgetControl, null, {
                                                    "icon":"measure_16_16",
                                                    "text":"量&nbsp;&nbsp;&nbsp;&nbsp;算"
                                                });

                                                var contentBody = dialog.getContentBody();
                                                myMeasure = new SuperMap.Bev.Measure(contentBody, map);
                                                dialog.on("dialogclose", function () {
                                                    if (myMeasure) {
                                                        myMeasure.destroy();
                                                        myMeasure = null;
                                                    }
                                                })
                                            }
                                        }
                                    }
                                },
                                {
                                    "icon":"geolocate_16_16",
                                    "text":"定&nbsp;&nbsp;&nbsp;&nbsp;位",
                                    "events":{
                                        "click":function () {
                                            if (!myGeolocate) {
                                                var dialog = new SuperMap.Bev.Dialog(myWidgetControl, null, {
                                                    "icon":"geolocate_16_16",
                                                    "text":"定&nbsp;&nbsp;&nbsp;&nbsp;位"
                                                });

                                                var contentBody = dialog.getContentBody();
                                                myGeolocate = new SuperMap.Bev.Geolocate(contentBody, map);
                                                dialog.on("dialogclose", function () {
                                                    if (myGeolocate) {
                                                        myGeolocate.destroy();
                                                        myGeolocate = null;
                                                    }
                                                })
                                            }
                                        }
                                    }
                                },
                                {
                                    "icon":"draw_16_16",
                                    "text":"绘&nbsp;&nbsp;&nbsp;&nbsp;制",
                                    "events":{
                                        "click":function () {
                                            if (!myDrawFeature) {
                                                var dialog = new SuperMap.Bev.Dialog(myWidgetControl, null, {
                                                    "icon":"draw_16_16",
                                                    "text":"绘&nbsp;&nbsp;&nbsp;&nbsp;制"
                                                });

                                                var contentBody = dialog.getContentBody();
                                                myDrawFeature = new SuperMap.Bev.DrawFeature(contentBody, map);
                                                dialog.on("dialogclose", function () {
                                                    if (myDrawFeature) {
                                                        myDrawFeature.destroy();
                                                        myDrawFeature = null;
                                                    }
                                                })
                                            }
                                        }
                                    }
                                }

                            ]
                        })
                    }
                ]
            });
        }

    </script>


</head>
<body onload="init()">
<!--[if IE 7]>
<div style="position: absolute;width: 100%;height: 100%;overflow: hidden;"><![endif]-->
<div id="mapContainer"></div>
<div id="head" class="background_1">
    <span id="logo" class="head_child"></span>
    <span id="toolbar" class="head_child"></span>
</div>
<div id="widgetControl"></div>
<!--[if IE 7]></div><![endif]-->
</body>
</html>
