<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%
String theme = (String) request.getParameter("theme");
String x = (String) request.getParameter("x");
String y = (String) request.getParameter("y");
String z = (String) request.getParameter("z");
String _layerType = (String) request.getParameter("layerType");
int layerType = Integer.parseInt(_layerType);
String url = (String) request.getParameter("url");
%>
<%switch(layerType){
	case 3://google
%>
	<script src="http://maps.google.com/maps/api/js?v=3.5&amp;sensor=false"></script>
	<script src="lib/extend/SphericalMercator.js"></script>
	<script src="lib/extend/EventPane.js"></script>
	<script src="lib/extend/FixedZoomLevels.js"></script>
	<script src="lib/extend/Google.js"></script>
	<script src="lib/extend/Google.v3.js"></script>
<%
	break;
	case 4://openstreet
%>
	<script src="lib/extend/OSM.js"></script>
<%
	break;
	case 5://tianditu
%>
	<script src="lib/extend/Tianditu.js"></script>
<%
	case 6://arcgis
%>
	<script src="lib/extend/ArcGIS93Rest.js"></script>
<%
	break;
	case 7://baidu
%>
	<script src="lib/extend/Baidu.js"></script>
<%
	break;
	case 8://bing
%>
	<script src="lib/extend/Bing.js"></script>
<%
	break;
  }
%>
<script>
	var map, layers=[];
	function init() {
		SuperMap.Bev.Main.init(function(){
			SuperMap.Bev.Theme.set('<%=theme%>');
			initDemo();
			map = new SuperMap.Map(
				'mapContainer',
				{
					controls:[
						//new SuperMap.Control.LayerSwitcher(),
						new SuperMap.Control.ScaleLine(),
						new SuperMap.Control.PanZoomBar(),
						new SuperMap.Control.Navigation({ dragPanOptions: { enableKinetic: true } })//,
						//new SuperMap.Control.OverviewMap()
					],
					units: 'm',
					allOverlays:true
				}
			);
			var pos = new SuperMap.LonLat(<%=x%> , <%=y%>);
			var level = <%=z%>;
			<%switch(layerType){
				case 1://cloud
				%>layers = [new SuperMap.Layer.CloudLayer()];<%
				break;
				case 2://iserver
				%>
					var layer = new SuperMap.Layer.TiledDynamicRESTLayer("iserver", "<%=url%>", {transparent: true, cacheEnabled: true, redirect: true}, {maxResolution:"auto"}); 
					layer.events.on({"layerInitialized": addLayer});
					layers.push(layer);
				<%
				break;
				case 3://google
				%>
				//初始化google的四种图层
				//layers.push(new SuperMap.Layer.Google(
				//	"Google Physical",
				//	{type: google.maps.MapTypeId.TERRAIN}
				//));
				layers.push(new SuperMap.Layer.Google(
					"Google Streets", // the default
					{numZoomLevels: 20}
				));
				//layers.push(new SuperMap.Layer.Google(
				//	"Google Hybrid",
				//	{type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20}
				//));
				//layers.push(new SuperMap.Layer.Google(
				//	"Google Satellite",
				//	{type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
				//));
				<%
				break;
				case 4://openstreet
				%>layers.push(new SuperMap.Layer.OSM("osmLayer"));<%
				break;
				case 5://tianditu
				%>
				if(pos.lon==0&&pos.lat==0&&level==0){
					pos = new SuperMap.LonLat(108.07567641634,36.855795258955);
					level = 3;
				}
				layers.push(new SuperMap.Layer.Tianditu({"layerType":"vec","useCanvas":false}));//img,ter
				layers.push(new SuperMap.Layer.Tianditu({"layerType":"vec","isLabel":true,"useCanvas":false}));
				<%
				break;
				case 6://arcgis
				%>
				var url = "http://www.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/export";
				layers.push(new SuperMap.Layer.ArcGIS93Rest("World", url, {layers:"show:0,1,2,4"}, {projection:"EPSG:3857",useCanvas:true}));
				<%
				break;
				case 7://baidu
				%>
				layers.push(new SuperMap.Layer.Baidu());
				<%
				break;
				case 8://bing
				if(x.equals("0")&&y.equals("0")&&z.equals("0")){
				%>
					pos =  new SuperMap.LonLat(103.31, 36.03).transform(
						new SuperMap.Projection("EPSG:4326"),
						new SuperMap.Projection("EPSG:3857")
					);
					level = 4;
				<%
				}
				%>
				var apiKey = "AqTGBsziZHIJYYxgivLBf0hVdrAk9mWO5cQcb8Yux8sW5M8c8opEC2lZqKR1ZZXf";
				layers.push(new SuperMap.Layer.Bing({
					name: "Road",
					key: apiKey,
					type: "Road"
				}));
				//layers.push(new SuperMap.Layer.Bing({
				//	name: "Hybrid",
				//	key: apiKey,
				//	type: "AerialWithLabels"
				//}));
				//layers.push(new SuperMap.Layer.Bing({
				//	name: "Aerial",
				//	key: apiKey,
				//	type: "Aerial"
				//}));
				<%
				break;
			}%>
			
			<%if(layerType!=2){%>
				map.addLayers(layers);
				map.setCenter(pos , level);
				window.SMLoaded = true;
			<%}
			else{%>
				function addLayer() {
					map.addLayers(layers);
					map.setCenter(pos , level);
					window.SMLoaded = true;
				}
			<%}%>
		})
	}
</script>