﻿function clears(id) {
    document.getElementById(id).value = "";
}

function searchtypechange(value) {
    if (value == "tiled" || value == "wms" || value == "arcgis") {
        $("#layerpara").show();
        $("#layername").val("Layer").removeAttr("readonly");
    } else {
        $("#layerpara").hide();
        if (value == "cloud") {
            $("#layername").val("CloudLayer").attr("readonly", "readonly");
        } else if (value == "tdtlayer") {
            $("#layername").val("TDTLayer").attr("readonly", "readonly");
        } else {
            $("#layername").val("Layer").removeAttr("readonly");
        }
    }

}

var skinTypeName="cupertino";
function skinSelected(value){
    skinTypeName=value;
}

var url = [];
var count = 1;
function add() {
    var a = document.getElementById("layername");
    var b = document.getElementById("layerurl");
    var c = document.getElementById("layertype");
    var strName = a.value;
    var strUrl = b.value;
    var type = c.value;
    if (!strName || strName == "") {
        strName = "map_" + count;
    }
    if ((type == "tiled" || type == "wms" || type == "arcgis") && (!strUrl || strUrl == "")) {
        alert("url路径不能为空");
        return false;
    }
    var danUrl = new Array();
    if (strName != "名称" && strUrl != "Url路径") {
        danUrl[0] = strName;
        danUrl[1] = strUrl;
        danUrl[2] = type;
        danUrl[3] = "layer_" + count;
        url.push(danUrl);
        var type1 = '';
        switch (type) {
            case "tiled":
                type1 = "iserver";
                break;
            case "cloud":
                type1 = "SuperMap CloudLayer";
                break;
            case "tdtlayer":
                $("#lon").val("0");
                $("#lat").val("0");
                $("#zoom").val("0");
                type1 = "天地图";
                break;
            case "wms":
                type1 = "WMS";
                break;
            case "google":
                type1 = "Google Maps";
                break;
            case "osm":
                type1 = "OpenStreet";
                break;
            case "arcgis":
                type1 = "ArcGIS online";
                break;
            case "baidu":
                $("#lon").val("70525979.08629");
                $("#lat").val("32095266.742313");
                $("#zoom").val("2");
                type1 = "百度地图";
                break;
            case "bing":
                $("#lon").val("0");
                $("#lat").val("0");
                $("#zoom").val("2");
                type1 = "bing地图";
                break;
        }
        showlayerinfo(strName, strUrl, type1, count);
        a.value = b.value = "";
        count++;
    }
}

function showlayerinfo(layername, layerurl, layertype, count) {
    var a, b;
    a = $("#layerinfo");
    a.css("display", "block");
    if (layerurl) {
        if (layerurl.length > 50) {
            layerurl = layerurl.substring(0, 50);
            layerurl += "..";
        }
        //layerurl = "，" + layerurl;
    }
    //var htmlsr = "<div style=\"margin:0px 0px 10px 10px;color:#fff;\"><span style=\"margin-left:10px;\">"+layername+"</span><span>"+layerurl+"</span></div>"
    var htmlstr = "<div id=\"layerlist_" + count + "\" style=\"margin:0px 0px 10px 10px;color:#000;\"><span style=\"display:inline-block;\"><span style=\"margin-left:10px;\">" + layertype + "，</span><span style=\"margin-left:10px;\">" + layername + "</span>"
    if (layerurl && layerurl != "") {
        htmlstr += "<span>，" + layerurl + "</span>";
    }
    htmlstr += "</span><span style=\"display:inline-block;margin-left:10px;\"><input type=\"button\" onclick=\"deleteLayer(" + count + ")\" value=\"删除\"></input></span></div>";
    b = $(htmlstr);
    a.append(b);
}

function deleteLayer(count) {
    var a;
    $("#layerlist_" + count).remove();
    for (var i = 0; i < url.length; i++) {
        var a = url[i];
        if (a && a[3] && a[3] == "layer_" + count) {
            url.splice(i, 1);
            break;
        }
    }
}

var controls = new Array();
function selectedControl(id) {
    var controlInfo = $("#" + id);
    if ($("#" + id).hasClass('btn-success2')) {
        $("#" + id).attr('class', 'btn express2');
        $("#" + id + "r").css("display", "block");
        controls.push(id);
    } else {
        $("#" + id).attr('class', 'btn btn-success2 express');
        $("#" + id + "r").css("display", "none");
        var index = indexof(controls, id);
        controls.splice(index, 1);
    }
}

var tools = new Array();
function selectedTool(id) {
    var controlInfo = $("#" + id);
    if ($("#" + id).hasClass('btn-success2')) {
        $("#" + id).attr('class', 'btn express2');
        $("#" + id + "r").css("display", "block");
        tools.push(id);
    } else {
        $("#" + id).attr('class', 'btn btn-success2 express');
        $("#" + id + "r").css("display", "none");
        var index = indexof(tools, id);
        tools.splice(index, 1);
    }
}
function indexof(array, value) {
    var index;
    for (var i = 0, len = array.length; i < len; i++) {
        if (array[i] === value) {
            index = i;
        }
    }
    return index;
}

function search(value) {
    var toolName;
    if (value === "查询") {
        toolName = "search";
    } else if (value === "量算") {
        toolName = "measure";
    } else if (value === "定位") {
        toolName = "geolocate";
    } else if (value === "绘制要素") {
        toolName = "drawFeature";
    } else if (value === "标注") {
        toolName = "markers";
    }
    return toolName;
}
function searchTwo(value) {
    var controlName;
    if (value === "比例尺") {
        controlName = "ScaleLine";
    } else if (value === "缩放控件") {
        controlName = "PanZoomBar";
    } else if (value === "导航控件") {
        controlName = "Navigation";
    } else if (value === "图例管理控件") {
        controlName = "LayerSwitcher";
    } else if (value === "鹰眼") {
        controlName = "OverviewMap";
    }
    return controlName;
}

function clears() {
    document.getElementById("layername").value = "";
    document.getElementById("layerurl").value = "";
    url = [];
    var a = $("#layerinfo");
    a.empty();
    a.css("display", "none");
}
function generate_custom() {
    $("#pic").css({"background":"url('./images/init/selectedpic.png') repeat-x", "padding-bottom":"15px"});
    var strXMLHeader = "<config>";
    var strLon = document.getElementById("lon").value.toString();
    var strLat = document.getElementById("lat").value.toString();
    var strzoom = document.getElementById("zoom").value.toString();
    var strMap = "<map LonLat=\"" + strLon + " , " + strLat + "\" Zoom=\"" + strzoom + "\">";
    var strLayer = "<BaseLayers>";
    for (var i = 0, len = url.length; i < len; i++) {
        var strlayertype = url[i][2];
        var strName = url[i][0];
        var strUrl = url[i][1];
        if (strlayertype == "tiled") {
            strLayer = strLayer + "<layer name=\"" + strName + "\" type=\"tiled\" url=\"" + strUrl + "\" />";
        } else if (strlayertype == "wms") {
            strLayer = strLayer + "<layer name=\"" + strName + "\" type=\"wms\" url=\"" + strUrl + "\" />";
        } else if (strlayertype == "arcgis") {
            strLayer = strLayer + "<layer name=\"" + strName + "\" type=\"arcgis\" url=\"" + strUrl + "\" />";
        }
        else {
            strLayer = strLayer + "<layer type=\"" + strlayertype + "\" />";
        }
    }
    if (url.length == 0) {
        alert("用户未添加地图服务，请点击上一步进行添加");
        return;
    }

    strLayer = strLayer + "</BaseLayers>";
    var strControl = "<Controls>";
    for (var i = 0, len = controls.length; i < len; i++) {
        controlsValue = searchTwo(document.getElementById(controls[i] + "t").innerHTML);
        strControl = strControl + "<" + controlsValue + "/>";
    }
    strControl = strControl + "</Controls>";
    strMap = strMap + strLayer + strControl + "</map>";

    var strTitle = document.getElementById("title").value;
    var strBase;
    var name = null;
    if (base == "base1") {
        name = "base";
    }
    else{
        name = base;
    }
    strBase = "<template name=\""+base+"\" src=\"./base/" + name + ".html\" />";
    var strservertype = document.getElementById("servertype").value;
    var strServerXML = "<server_use>Tomcat</server_use>";
    if (strservertype == "Tomcat") {
        strServerXML = "<server_use>Tomcat</server_use>";
    } else if (strservertype == "IIS") {
        strServerXML = "<server_use>IIS</server_use>";
    }
    else if (strservertype == "php") {
        strServerXML = "<server_use>php</server_use>";
    }

    var strPageName = document.getElementById("pagename").value;
    var panelManager = "<panelmanager id=\"panelmanager\">"
    for (var i = 0, len = tools.length; i < len; i++) {
        controlsValue = search(document.getElementById(tools[i] + "t").innerHTML);
        panelManager = panelManager + "<panel id=\"" + controlsValue + "\" path=\"./models/" + controlsValue + "/\" />";
    }
    panelManager = panelManager + "</panelmanager>";
    var strLayout = "<layout><page_name>" + strPageName + "</page_name><title>" + strTitle + "</title>" + strBase + strServerXML + panelManager + "</layout>";
    var strXML = strXMLHeader + strMap + strLayout + "</config>";
    var xmlDoc = null;
    try {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML(strXML);
    }
    catch (e) {
        try //Firefox, Mozilla, Opera, etc.
        {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(strXML, "text/xml");
        }
        catch (e) {
        }
    }
    var node = $(xmlDoc).find("template");
    var name = node.attr('name');
    var index = name.replace(/base([0-9]+)/,"$1");
    eval("generate_xml_"+index+"(xmlDoc)");
}

function generate_xml_1(xml) {
    var strControls = [];
    var strBaseLayers = [];
    var strPanelsJS = [];
    var strControlsMessage = "";
    var strMap;
    var strPosition;
    var strUrl;
    var strInsertscripts = "";

    //读取并添加控件 strControls
    strMap = getControlsStr(xml,strControls,strControlsMessage,strMap,16);

    //读取并添加图层 strBaseLayers
    var nCloudNumber = [];
    var strIServerLayer = [];
    var strInsertscript = [];
    getLayersStr(xml,strBaseLayers,nCloudNumber,strIServerLayer,strInsertscript);

    //读取并设置map的中心点和缩放级别
    strPosition = getCenterStr(xml,strPosition);

    //初始化地图方法的字符串拼接
    var strInitFun = getBanks(8)+"function init() {\n"+getBanks(12)+"SuperMap.Bev.Main.init(function(){\n"+getBanks(16)+"SuperMap.Bev.Theme.set('" + skinTypeName + "');\n"+getBanks(16)+"initDemo();" + strMap;

    for (var i = 0; i < strIServerLayer.length; i++) {
        strInitFun = strInitFun + getBanks(16)+strBaseLayers[strIServerLayer[i]] + "\n";
        strInitFun = strInitFun + getBanks(16)+"layer" + strIServerLayer[i] + ".events.on({ 'layerInitialized': addLayer });\n";
    }
    for (var i = 0; i < nCloudNumber.length; i++) {
        strInitFun = strInitFun + getBanks(16)+strBaseLayers[nCloudNumber[i]] + "\n";
        strInitFun = strInitFun + getBanks(16)+"map.addLayer(layer" + nCloudNumber[i] + ");\n";
    }
    for (var i = 0, length = strInsertscript.length; i < length; i++) {
        strInsertscripts += strInsertscript[i];
    }
    if (strIServerLayer.length == 0) {
        strInitFun = strInitFun + getBanks(16)+"map.setCenter(" + strPosition + "); \n";
    }
    strInitFun = strInitFun + getBanks(12)+"})\n"+getBanks(8)+"}\n";

    //用来定义一些变量的
    var strVar = getBanks(8)+"var map";
    for (var i = 0; i < strBaseLayers.length; i++) {
        strVar = strVar + ", " + "layer" + i;
    }
    strVar = strVar + ";\n";
    if (strUrl != "" && strUrl != null && strUrl != undefined) {
        if (strUrl.length != 0) {
            strVar = strVar + "var url = " + "\"" + strUrl + "\"" + ";\n"
        }
    }
    strInitFun = strVar + strInitFun;

    //添加图层函数的字符串
    var strLayer = "";
    var strAddLayerFun = "";
    if (strIServerLayer.length > 0) {
        strLayer = "map.addLayer(layer" + strIServerLayer[0] + ");\n";
        strAddLayerFun = " function addLayer() { \n" + strLayer + "\n map.setCenter(" + strPosition + "); \n}\n";
    }

    var objWidgets = {};
    $(xml).find("panelmanager").children().each(function (i) {
        //获取功能
        var strConfig = $(this).attr('id');
        var strUrl1 = "./models/demo1/" + strConfig + ".txt";
        $.ajax({
            async:false,
            url:strUrl1,
            success:function (data) {
                objWidgets[strConfig] = data;
            }});
    })

    var strItem = "";
    if (objWidgets) {
        var itemArray = [];
        for (var item in objWidgets) {
            //strItem += objWidgets[item] + ",\n"
            itemArray.push(objWidgets[item]);
        }
        //去掉最后一个逗号
        //strItem = strItem.substr(0, strItem.length - 1);
        strItem = itemArray.join(",\n")+"\n";
    }

    //添加控件代码字符串
    var strDemoVar = getBanks(8)+"var myWidgetControl,myMenuPanel,myMeasure,myNavigation,myGeolocate,myDrawFeature;";
    var strWidgetControl = getBanks(12)+'myWidgetControl = new SuperMap.Bev.WidgetControl("#widgetControl");';
    var strMenuPanel = "\n"+getBanks(12)+'myMenuPanel = new SuperMap.Bev.MenuPanel($("#toolbar"),{\n'+getBanks(16)+'"tree":[\n'+getBanks(20)+'{\n'+getBanks(24)+'"icon":"tool_icon",\n'+getBanks(24)+'"title":"基本操作",\n'+getBanks(24)+'"menu":new SuperMap.Bev.Menu(null,{\n'+getBanks(28)+'"tree":[\n' + strItem + '\n'+getBanks(28)+']\n'+getBanks(24)+'})\n'+getBanks(20)+'}\n'+getBanks(16)+']\n'+getBanks(12)+'});';
    var strInitDemoFun = strDemoVar + "\n"+getBanks(8)+"function initDemo(){\n" + strWidgetControl + strMenuPanel + "\n"+getBanks(8)+"}\n";
    //这里是生成新页面的地方
    var strTemplateFile = $(xml).find("template").attr("src");
    $.get(strTemplateFile, null, function (data) {
        data = unescape(data);
        var strTitle = $(xml).find("title").text();
        var str_page_name = $(xml).find("page_name").text();

        var strResult = strInsertscripts + getBanks(4)+"<" + "script" + ">" + "\n" + strInitFun + strAddLayerFun + strInitDemoFun + "\n";
        for (var j = 0; j < strPanelsJS.length; j++) {
            strResult = strResult + strPanelsJS[j] + "\n";
        }
        strResult = strResult + getBanks(4)+"</script" + ">\n";
        data = data.replace("<title></title>", "<title>" + strTitle + "</title>");

        //data = data.split("</body>")[0] + "\n" + strResult + "</body>" + "\n" + "</html>";
        data = data.replace(/{_initscript_}/,"\n"+strResult+"\n");

        var str_server_use = $(xml).find("server_use").text();
        var str_server = "jsp";
        if (str_server_use === "IIS") {
            str_server = "asp"
        } else if (str_server_use === "Tomcat") {
            str_server = "jsp";
        }
        else if (str_server_use === "php") {
            str_server = "php";
        }
        $.post("./index." + str_server,
            { text:unescape(data), page_name:str_page_name + ".html" },
            function (value) {
                window.location = "./" + str_page_name + ".html";
            });
    });
}

function generate_xml_2(xml) {
    var strControls = [];
    var strBaseLayers = [];
    var strPanelsJS = [];
    var strControlsMessage = "";
    var strMap;
    var strPosition;
    var strUrl;
    var strInsertscripts = "";

    //var varstr = "var map{_varstr_};";

    //读取并添加控件 strControls
    strMap = getControlsStr(xml,strControls,strControlsMessage,strMap,16);

    //读取并添加图层 strBaseLayers
    var nCloudNumber = [];
    var strIServerLayer = [];
    var strInsertscript = [];
    var layersCount = getLayersStr(xml,strBaseLayers,nCloudNumber,strIServerLayer,strInsertscript);
//    var varLayerStrArr = [];
//    for(var i=0;i<layersCount;i++){
//        varLayerStrArr.push("layer"+i);
//    }
//    var varLayerStr = varLayerStrArr.join(",");
//    varstr = ","+varstr.replace(/{_varstr_}/,varLayerStr+"{_varstr_}");

    //读取并设置map的中心点和缩放级别
    strPosition = getCenterStr(xml,strPosition);

    //初始化地图方法的字符串拼接
    var strInitFun = getBanks(8)+"function init() {\n"+getBanks(12)+"SuperMap.Bev.Main.init(function(){\n"+getBanks(16)+"SuperMap.Bev.Theme.set('" + skinTypeName + "');\n"+getBanks(16)+"initDemo();\n"+getBanks(16)+strMap;

    for (var i = 0; i < strIServerLayer.length; i++) {
        strInitFun = strInitFun +getBanks(16)+strBaseLayers[strIServerLayer[i]] + "\n";
        strInitFun = strInitFun +getBanks(16)+"layer" + strIServerLayer[i] + ".events.on({ 'layerInitialized': addLayer });\n";
    }
    for (var i = 0; i < nCloudNumber.length; i++) {
        strInitFun = strInitFun +getBanks(16)+strBaseLayers[nCloudNumber[i]] + "\n";
        strInitFun = strInitFun +getBanks(16)+"map.addLayer(layer" + nCloudNumber[i] + ");\n";
    }
    for (var i = 0, length = strInsertscript.length; i < length; i++) {
        strInsertscripts += strInsertscript[i];
    }
    if (strIServerLayer.length == 0) {
        strInitFun = strInitFun + getBanks(16)+"map.setCenter(" + strPosition + "); \n";
    }
    strInitFun = strInitFun + getBanks(12)+"})\n"+getBanks(8)+"}\n";

    //用来定义一些变量的
    var strVar = "        var map";
    for (var i = 0; i < strBaseLayers.length; i++) {
        strVar = strVar + ", " + "layer" + i;
    }
    strVar = strVar + ";\n";
    if (strUrl != "" && strUrl != null && strUrl != undefined) {
        if (strUrl.length != 0) {
            strVar = strVar + "var url = " + "\"" + strUrl + "\"" + ";\n"
        }
    }
    strInitFun = strVar + strInitFun;

    //添加图层函数的字符串
    var strLayer = "";
    var strAddLayerFun = "";
    if (strIServerLayer.length > 0) {
        strLayer = "map.addLayer(layer" + strIServerLayer[0] + ");\n";
        strAddLayerFun = "function addLayer() { \n" + strLayer + "\n map.setCenter(" + strPosition + "); \n}\n";
    }

    var controlNames = [];
    var objWidgets = {};

    $.ajax({
        async:false,
        url:"./models/demo2/accordion.txt",
        success:function (data) {
            objWidgets["accordion"] = data;
        }});

    $(xml).find("panelmanager").children().each(function (i) {
        //获取功能
        var strConfig = $(this).attr('id');
        controlNames.push(strConfig);
        var urls = [];
        if(strConfig=="measure"){
            urls = [
                {
                    "name":"measureIcon",
                    "url":"./models/demo2/measureIcon.txt"
                },
                {
                    "name":"getMeasure",
                    "url":"./models/demo2/getMeasure.txt"
                },
                {
                    "name":"getTooltip",
                    "url":"./models/demo2/getTooltip.txt"
                }
            ]
        }
        else if(strConfig=="geolocate"){
            urls = [
                {
                    "name":"geoLocateIcon",
                    "url":"./models/demo2/geoLocateIcon.txt"
                },
                {
                    "name":"getGeolocate",
                    "url":"./models/demo2/getGeolocate.txt"
                }
            ]
        }
        for(var j=0;j<urls.length;j++){
            $.ajax({
                async:false,
                url:urls[j].url,
                success:function (name) {
                    return function(data){
                        objWidgets[name] = data;
                    }
                }(urls[j].name)});
        }
    })

//    var strItem = "";
//    if (objWidgets) {
//        for (var item in objWidgets) {
//            strItem += objWidgets[item] + ","
//        }
//        //去掉最后一个逗号
//        strItem = strItem.substr(0, strItem.length - 1);
//    }

    //添加控件代码字符串
    var strDemoVar = getBanks(8)+"var myMeasure,myTooltip,myGeolocate,myDrawFeature;";
    //var strWidgetControl = 'myWidgetControl = new SuperMap.Bev.WidgetControl("#widgetControl");';
    //var strMenuPanel = 'myMenuPanel = new SuperMap.Bev.MenuPanel($("#toolbar"),{\n    "tree":[\n        {\n            "icon":"tool_icon",\n            "title":"基本操作",\n            "menu":new SuperMap.Bev.Menu(null,{\n               "tree":[' + strItem + ']\n})\n}\n]\n});';
    //var initDemoStr = objWidgets["accordion"] + "\n";
    var initDemoStr = "";
    var otherFunctionStr = "";
    for(var i=0;i<controlNames.length;i++){
        if(controlNames[i]=="measure"){
            initDemoStr += objWidgets["measureIcon"] + "\n";
            otherFunctionStr += objWidgets["getMeasure"] + "\n";
            otherFunctionStr += objWidgets["getTooltip"] + "\n";
        }
        else if(controlNames[i]=="geolocate"){
            initDemoStr += objWidgets["geoLocateIcon"] + "\n";
            otherFunctionStr += objWidgets["getGeolocate"] + "\n";
        }
        else if (controlNames[i]=="drawFeature"){
            var drawFeatureCode = "\n"+getBanks(20)+"{\n"+getBanks(24)+"\"title\":\"绘制\",\n"+getBanks(24)+"\"body\":drawFeatureBody\n"+getBanks(20)+"},";
            objWidgets["accordion"] = objWidgets["accordion"].replace(/{_firstAccordingItem_}/,drawFeatureCode);
            objWidgets["accordion"] = "\n"+getBanks(12)+"myDrawFeature = new SuperMap.Bev.DrawFeature($(\"<div>\"));\n"+getBanks(12)+"var drawFeatureBody = myDrawFeature.body;\n"+getBanks(12)+"window.setTimeout(function(){myDrawFeature.setMap(map);},30);\n"+objWidgets["accordion"];
        }
    }
    objWidgets["accordion"] = objWidgets["accordion"].replace(/{_firstAccordingItem_}/,"");
    initDemoStr += objWidgets["accordion"] + "\n";
    var strInitDemoFun = strDemoVar + "\n"+getBanks(8)+"function initDemo(){\n" + initDemoStr + "\n"+getBanks(12)+"SuperMap.Bev.DemoUtil.toolBarHideBtn($(\"#bd_left\"),$(\"#bd_right\"));\n"+getBanks(8)+"}\n";
    //这里是生成新页面的地方
    var strTemplateFile = $(xml).find("template").attr("src");
    $.get(strTemplateFile, null, function (data) {
        data = unescape(data);
        var strTitle = $(xml).find("title").text();
        var str_page_name = $(xml).find("page_name").text();

        var strResult = strInsertscripts + "    <" + "script" + ">" + "\n" + strInitFun + strAddLayerFun + strInitDemoFun + "\n";
        for (var j = 0; j < strPanelsJS.length; j++) {
            strResult = strResult + strPanelsJS[j] + "\n";
        }
        strResult+=otherFunctionStr+"\n";
        strResult = strResult + "    </script" + ">\n";
        data = data.replace("<title></title>", "<title>" + strTitle + "</title>");

        //data = data.split("</body>")[0] + "\n" + strResult + "</body>" + "\n" + "</html>";
        data = data.replace(/{_initscript_}/,"\n"+strResult+"\n");

        var str_server_use = $(xml).find("server_use").text();
        var str_server = "jsp";
        if (str_server_use === "IIS") {
            str_server = "asp"
        } else if (str_server_use === "Tomcat") {
            str_server = "jsp";
        }
        else if (str_server_use === "php") {
            str_server = "php";
        }
        $.post("./index." + str_server,
            { text:unescape(data), page_name:str_page_name + ".html" },
            function (value) {
                window.location = "./" + str_page_name + ".html";
            });
    });
}

function getControlsStr(xml,strControls,strControlsMessage,strMap,bankNums){
    strControlsMessage = "\n"+getBanks(bankNums+4)+"{\n"+getBanks(bankNums+8)+"controls:[\n";
    if(!bankNums)bankNums = 0;
    //读取并添加控件 strControls
    $(xml).find("Controls").children().each(function (i) {
        if (this.nodeName == "Navigation") {
            strControls[i] = getBanks(bankNums+12)+"new SuperMap.Control." + "Navigation({ dragPanOptions: { enableKinetic: true } })";
        }
        else {
            strControls[i] = getBanks(bankNums+12)+"new SuperMap.Control." + this.nodeName + "()";
        }
    });

    for (var i = 0; i < strControls.length; i++) {
        if (i == strControls.length - 1) {
            strControlsMessage = strControlsMessage + strControls[i];
        }
        else {
            strControlsMessage = strControlsMessage + strControls[i] + ",\n";
        }
    }
    strControlsMessage = strControlsMessage + "\n"+getBanks(bankNums+8)+"],\n"+getBanks(bankNums+8)+"units: 'm',\n"+getBanks(bankNums+8)+"projection: 'EPSG:3857'\n"+getBanks(bankNums+4)+"}";
    strMap = "\n"+getBanks(bankNums)+"map = new SuperMap.Map(\n"+getBanks(bankNums+4)+"'mapContainer',"+ strControlsMessage + "\n"+getBanks(bankNums)+");\n";

    return strMap;
}

function getLayersStr(xml,strBaseLayers,nCloudNumber,strIServerLayer,strInsertscript){
    var layersCount = 0;
    $(xml).find("BaseLayers").children().each(function (i) {
        layersCount = i;
        var strType, strName,strUrl;
        strType = $(this).attr('type');
        if (strType == "cloud") {
            strBaseLayers[i] = " layer" + i + " = new SuperMap.Layer.CloudLayer();\n";
            nCloudNumber.push(i);
        } else if (strType == "tiled") {
            strUrl = $(this).attr('url');
            strName = $(this).attr('name');

            strBaseLayers[i] = " layer" + i + " = new SuperMap.Layer.TiledDynamicRESTLayer(' " + strName + "','" + strUrl + "', { transparent: true, cacheEnabled: true }, { maxResolution: 'auto' });\n";
            strIServerLayer.push(i);
        } else if (strType == "tdtlayer") {
            strBaseLayers[i] = " layer" + i + " = new SuperMap.Layer.TDTLayer();\n";
            nCloudNumber.push(i);
            strInsertscript.push("<script src=\"./js/TDTLayer.js\" >" + "</script" + ">\n");
        } else if (strType == "google") {
            strBaseLayers[i] = " layer" + i + " = new SuperMap.Layer.Google();\n";
            nCloudNumber.push(i);
            strInsertscript.push("<script src='http://maps.google.com/maps/api/js?v=3.5&amp;sensor=false'>" + "</script" + ">\n");
            strInsertscript.push("<script src='./js/layer/SphericalMercator.js'>" + "</script" + ">\n");
            strInsertscript.push("<script src='./js/layer/EventPane.js'>" + "</script" + ">\n");
            strInsertscript.push("<script src='./js/layer/FixedZoomLevels.js'>" + "</script" + ">\n");
            strInsertscript.push("<script src='./js/layer/Google.js'>" + "</script" + ">\n");
            strInsertscript.push("<script src='./js/layer/v3.js'>" + "</script" + ">\n");
        } else if (strType == "osm") {
            strBaseLayers[i] = " layer" + i + " = new SuperMap.Layer.OSM('osmLayer');\n";
            nCloudNumber.push(i);
            strInsertscript.push("<script src='./js/layer/OSM.js'>" + "</script" + ">\n");

        } else if (strType == "wms") {
            strUrl = $(this).attr('url');
            strName = $(this).attr('name');
            strBaseLayers[i] = "layer" + i + " = new SuperMap.Layer.WMS('" + strName + "',\"" + strUrl + "\", {layers: 'basic'});\n";
            nCloudNumber.push(i);
        } else if (strType == "arcgis") {
            strUrl = $(this).attr('url');
            strName = $(this).attr('name');
            strBaseLayers[i] = "layer" + i + " = new SuperMap.Layer.ArcGIS93Rest('" + strName + "',\"" + strUrl+"\" );\n";
            nCloudNumber.push(i);
            strInsertscript.push("<script src='./js/layer/ArcGIS93Rest.js'>" + "</script" + ">\n");
        } else if (strType == "baidu") {
            strBaseLayers[i] = "layer" + i + " = new SuperMap.Layer.Baidu();\n";
            nCloudNumber.push(i);
            strInsertscript.push("<script src='./js/layer/Baidu.js'>" + "</script" + ">\n");
        }else if (strType == "bing") {
            var apiKey = "AqTGBsziZHIJYYxgivLBf0hVdrAk9mWO5cQcb8Yux8sW5M8c8opEC2lZqKR1ZZXf";
            strBaseLayers[i] = "layer" + i + " = new SuperMap.Layer.Bing("+'{\n                name: "Road",\n                key: "'+apiKey+'",                type: "Road"\n            }'+");\n";
            nCloudNumber.push(i);
            strInsertscript.push("<script src='./js/layer/Bing.js'>" + "</script" + ">\n");
        }

    });

    return layersCount;
}

function getCenterStr(xml,strPosition){
    $(xml).find("map").each(function () {
        var strLL, strZoom;
        $.each(this.attributes, function (i, attrib) {
            if (attrib.name == "LonLat") {
                strLL = "new SuperMap.LonLat(" + attrib.value + ")";
            }
            else if (attrib.name == "Zoom") {
                strZoom = attrib.value;
            }
        });

        if (strLL == undefined) {
            var strLon = document.getElementById("lon").value;
            var strLat = document.getElementById("lat").value;
            strLL = "new SuperMap.LonLat(" + strLon + "," + strLat + ")";
        }
        if (strZoom == undefined) {
            strZoom = document.getElementById("zoom").value;
        }

        strPosition = strLL + " , " + strZoom;
    });
    return strPosition;
}

function getBanks(num){
    var a = "";
    for(var i=0;i<num;i++){
        a+=" ";
    }
    return a;
}