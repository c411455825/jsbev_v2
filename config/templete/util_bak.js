/**
 * Class: CF_Util
 * 配置页面基础函数类。
 */
var CF_Util = {};
/**
 * Method: getLayer
 * 获取layer。
 */
CF_Util.getLayer = function(type){
    var layer = [];

    switch(type){
        case "cloud":
            layer = [new SuperMap.Layer.CloudLayer()];
            break;
        case "google":

    }

    return layer;
}