
/**
 * @requires SuperMap/Layer/CanvasLayer.js
 * @requires SuperMap/Layer/Grid.js
 * @requires SuperMap/Tile/Image.js
 */

/**
 * Class: SuperMap.Layer.Baidu
 * Baidu服务图层类。
 *     用于显示Baidu的地图，使用<SuperMap.Layer.Baidu>的
 *     构造函数可以创建Baidu图层，更多信息查看：
 *
 *
 *
 * Inherits from:
 *  - <SuperMap.Layer.CanvasLayer>
 */
SuperMap.Layer.Baidu = SuperMap.Class(SuperMap.CanvasLayer, {

    offsetXY:null,

    /**
     * Property: attribution
     * {String} The layer attribution.
     */
    attribution: "Data by <a style='white-space: nowrap' target='_blank' href='http://map.baidu.com/'>Baidu</a>",

    /**
     * Constructor: SuperMap.Layer.Baidu
     * 创建Baidu图层
     *
     * Example:
     * (code)
     *
     * var baiduLayer = new SuperMap.Layer.Baidu();
     * (end)
     */
    initialize: function (options) {
        var me = this;
        me.name = "Baidu";
        me.url = "http://q${num}.baidu.com/it/u=x=${x};y=${y};z=${z};v=014;type=web&fm=44";

        offsetXY = [];
        offsetXY.push({x:-3,y:1});//3
        offsetXY.push({x:-6,y:3});//4
        offsetXY.push({x:-12,y:7});//5
        offsetXY.push({x:-24,y:15});//6
        offsetXY.push({x:-48,y:31});//7
        offsetXY.push({x:-96,y:63});//8
        offsetXY.push({x:-192,y:127});//9
        offsetXY.push({x:-384,y:255});//10
        offsetXY.push({x:-768,y:511});//11
        offsetXY.push({x:-1536,y:1023});//12
        offsetXY.push({x:-3072,y:2047});//13
        offsetXY.push({x:-6144,y:4095});//14
        offsetXY.push({x:-12288,y:8191});//15
        offsetXY.push({x:-24576,y:16383});//16
        offsetXY.push({x:-49152,y:32767});//17
        offsetXY.push({x:-98304,y:65535});//18
        offsetXY.push({x:-196608,y:131071});//19
/*
        var minX = 6291456;
        var minY = 0;
        var maxX= minX + Math.pow(2, 14) * 256 * 5;
        var maxY= minY + Math.pow(2, 14) * 256 * 4;
*/

        var minX = -2.0037508342789244E7*4;
        var minY = -2.003750834278914E7*4;
        var maxX= 2.0037508342789244E7*5;
        var maxY= 2.00375083427891E7*4;


        var res = Math.pow(2,17);
        var resAry= [];
        for (var i = 0; i < 17; i++)
        {
            resAry[i] = res;
            res *= 0.5;
        }

        options = SuperMap.Util.extend({
            maxExtent: new SuperMap.Bounds(
                minX, minY, maxX, maxY
            ),
            tileOrigin:new SuperMap.LonLat(minX, maxY),
            resolutions:resAry
        }, options);

        SuperMap.CanvasLayer.prototype.initialize.apply(me, [me.name, me.url, null, options]);

        me.units = "m";
        me.projection = "EPSG:900913";
    },

    getTileUrl:function(xyz){
        var me = this,
            url = me.url;

        var x = xyz.x + offsetXY[xyz.z].x;
        var y = offsetXY[xyz.z].y - xyz.y;

        var z = xyz.z + 3;
        var num = Math.abs((xyz.x + xyz.y) % 8);
        num++;

        url = SuperMap.String.format(url, {
            num: num,
            x: x,
            y: y,
            z: z
        });
        url = url.replace(/-/g,"M");
        return url;
    },

    CLASS_NAME: 'SuperMap.Layer.Baidu'

});