<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%
String theme = (String) request.getParameter("theme");
String x = (String) request.getParameter("x");
String y = (String) request.getParameter("y");
String z = (String) request.getParameter("z");
String _layerType = (String) request.getParameter("layerType");
int layerType = Integer.parseInt(_layerType);
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
						new SuperMap.Control.ScaleLine(),
						new SuperMap.Control.PanZoomBar(),
						new SuperMap.Control.Navigation({ dragPanOptions: { enableKinetic: true } }),
						new SuperMap.Control.OverviewMap()
					],
					units: 'm'
				}
			);
			<%switch(layerType){
				case 1://cloud
				%>layers = [new SuperMap.Layer.CloudLayer()];<%
				break;
				case 2://iserver
				break;
				case 3://google
				%>
				//初始化google的四种图层
				layers.push(new SuperMap.Layer.Google(
					"Google Physical",
					{type: google.maps.MapTypeId.TERRAIN}
				));
				layers.push(new SuperMap.Layer.Google(
					"Google Streets", // the default
					{numZoomLevels: 20}
				));
				layers.push(new SuperMap.Layer.Google(
					"Google Hybrid",
					{type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20}
				));
				layers.push(new SuperMap.Layer.Google(
					"Google Satellite",
					{type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
				));
				<%
				break;
				case 4:
				%>layers.push(new SuperMap.Layer.OSM("osmLayer"));<%
				break;
				case 5:
				%>
				layers.push(new SuperMap.Layer.Tianditu({"layerType":"vec"}));//img,ter
				layers.push(new SuperMap.Layer.Tianditu({"layerType":"vec","isLabel":true}));
				<%
				break;
			}%>
			

			map.addLayers(layers);
			map.setCenter(new SuperMap.LonLat(<%=x%> , <%=y%>) , <%=z%>);
			window.SMLoaded = true;
		})
	}
</script>