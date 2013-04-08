<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%
String theme = (String) request.getParameter("theme");
if(theme == null){
	theme = "cupertino";
}
%>
<!DOCTYPE html> 
<html> 
	<head> 
	<title>supermap</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="js/SuperMap.Include.js"></script>
	<script src="js/jquery-1.8.2.js"></script>
    <script src="js/demo2/bev_main.js"></script>
    <!--
     //��ʼ��bev��ܣ�
    SuperMap.Bev.Main.init(function(){
            //ҳ�������Ҫ������ص�������


            //�������⣬֧�ֵ�������base��black-tie��blitzer��cupertino��dark-hive
            //dot-luv��eggplant��excite-bike��flick��hot-sneaks��humanity��le-frog��mint-choc��overcast��pepper-grinder
            //redmond��smoothness��south-street��start��sunny��swanky-purse��trontastic��ui-darkness��ui-lightness��vader
            SuperMap.Bev.Theme.set("dot-luv");

            //your code
        });
    -->
    
    <script>
        var map, layer0;
        function init() {
            SuperMap.Bev.Main.init(function(){
                SuperMap.Bev.Theme.set('<%=theme%>');
                initDemo();
                
                map = new SuperMap.Map(
                    'mapContainer',
                    {
                        controls:[
                            new SuperMap.Control.ScaleLine(),
                            new SuperMap.Control.PanZoomBar(),
                            new SuperMap.Control.Navigation({ dragPanOptions: { enableKinetic: true } }),
                            new SuperMap.Control.OverviewMap()
                        ],
                        units: 'm',
                        projection: 'EPSG:3857'
                    }
                );
                 layer0 = new SuperMap.Layer.CloudLayer();

                map.addLayer(layer0);
                map.setCenter(new SuperMap.LonLat(0 , 0) , 4); 
            })
        }
        var myMeasure,myTooltip,myGeolocate,myDrawFeature;
        function initDemo(){
            var myIcon1 = new SuperMap.Bev.Icon($("#bd_toolbar"),{
                "title":"�������",
                "img":"images/frameimages/measure2.png",
                "click":function(){
                    var m = getMesure();
                    m.measureArea();
                },
                "isDisplayTitle":true
            });

            var myIcon2 = new SuperMap.Bev.Icon($("#bd_toolbar"),{
                "title":"��������",
                "img":"images/frameimages/measure_16_16.png",
                "click":function(){
                    var m = getMesure();
                    m.measureDistance();
                },
                "isDisplayTitle":true
            });
            var myIcon3 = new SuperMap.Bev.Icon($("#bd_toolbar"),{
                "title":"��λ",
                "img":"images/frameimages/geolocate_16_16.png",
                "click":function(){
                    var g = getGeolocate();
                    g.geolocateMe();
                },
                "isDisplayTitle":true
            });

            var myIcon4 = new SuperMap.Bev.Icon($("#bd_toolbar"),{
                "title":"������",
                "img":"images/frameimages/clear.png",
                "click":function(){
                    var g = getGeolocate();
                    g.clearGeoMarkers();
                },
                "isDisplayTitle":true
            });

            myDrawFeature = new SuperMap.Bev.DrawFeature($("<div>"));
            var drawFeatureBody = myDrawFeature.body;
            window.setTimeout(function(){myDrawFeature.setMap(map);},30);
            var myAccordion = new SuperMap.Bev.Accordion($("#left_menu"),
                [
                    
                    {
                        "title":"����",
                        "body":drawFeatureBody
                    },
                    {
                        "title":"��ѯ",
                        "body":$("<p>this is a examples</p><br><p>this is a examples</p><br><p>this is a examples</p>")
                    },
                    {
                        "title":"����",
                        "body":$("<p>this is a examples</p><br><p>this is a examples</p><br><p>this is a examples</p>")
                    },
                    {
                        "title":"ר��ͼ",
                        "body":$("<p>this is a examples</p><br><p>this is a examples</p><br><p>this is a examples</p>")
                    },
                    {
                        "title":"������ѯ",
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
