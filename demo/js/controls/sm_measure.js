/**
 * Class: SuperMap.Bev.Measure
 * 量算功能。
 */
(function () {
    SuperMap.Bev.Class.create(
        "SuperMap.Bev.Measure",
        {
            /**
             * APIProperty: body
             * {HTMLElement} 父容器
             */
            body:null,
            /**
             * APIProperty: map
             * {SuperMap.Map} map对象
             */
            map:null,
            /**
             * APIProperty: distanceIcon
             * {String} 距离量算图标的路径
             */
            distanceIcon:null,
            /**
             * APIProperty: distanceIconOffsetX
             * {Number} 距离量算图标x偏移量
             */
            distanceIconOffsetX:null,
            /**
             * APIProperty: distanceIconOffsetY
             * {Number} 距离量算图标y偏移量
             */
            distanceIconOffsetY:null,
            /**
             * APIProperty: areaIcon
             * {String} 面积量算图标路径
             */
            areaIcon:null,
            /**
             * APIProperty: areaIconOffsetX
             * {Number} 面积量算图标x偏移量
             */
            areaIconOffsetX:null,
            /**
             * APIProperty: areaIconOffsetY
             * {Number} 面积量算图标y偏移量
             */
            areaIconOffsetY:null,
            /**
             * APIProperty: resultDiv
             * {HTMLElement} 结果显示面板
             */
            resultDiv:null,
            /**
             * Property: measureControls
             * {Object} 量算控件
             */
            measureControls:null,
            /**
             * Constructor: SuperMap.Bev.Measure
             * 实例化 Measure 类。
             *
             * Parameters:
             * option -{Object} 参数对象
             * body - {DOMElement} 页面上装载该控件的容器
             * map - {SuperMap.Map} 地图对象。
             *
             * Examples:
             * (code)
             * var myMeasure = new SuperMap.Bev.Measure({
             *     "body":$("<div>"),   //{DOMElement} 页面上装载该控件的容器
             *     "map":map            //{SuperMap.Map} 地图对象。
             *     "distanceIcon":"distanceIcon"
             * });
             * (end)
             */
            init:function (option) {
                for(var key in option){
                    this[key] = option[key];
                }

                this.create();
                this.createControl();
            },
            /**
             * Method: create
             * 创建该控件的dom对象。
             */
            create:function () {
                var d1, d2, d3, me = this;
                if(this.body){
                    this.resultDiv = d1 = $("<p class='measureResult'></p>").appendTo(this.body);

                    d2 = $("<button>长度量算</button>").click(function () {
                            me.measureDistance();
                        }).appendTo(this.body)
                        .button({
                            icons:{
                                primary:"ui-icon-locked"
                            }
                        });

                    if(this.distanceIcon){
                        var btn1 = d2.button("option","buttonElement");
                        var icon = btn1.children(".ui-icon");
                        icon.css({
                            "background":"url("+this.distanceIcon+") "+(this.distanceIconOffsetX==null?0:this.distanceIconOffsetX)+"px "+(this.distanceIconOffsetY==null?0:this.distanceIconOffsetY)+"px"
                        });
                    }

                    d3 = $("<button>面积量算</button>").button({
                        icons:{
                            primary:"ui-icon-locked"
                        }
                    }).click(function () {
                            me.measureArea();
                        }).appendTo(this.body);

                    if(this.areaIcon){
                        var btn = d3.button("option","buttonElement");
                        var icon = btn.children(".ui-icon");
                        icon.css({
                            "background":"url("+this.areaIcon+") "+(this.areaIconOffsetX==null?0:this.areaIconOffsetX)+"px "+(this.areaIconOffsetY==null?0:this.areaIconOffsetY)+"px"
                        });
                    }

                    window.setTimeout(function(){
                        btn1[0].blur();
                    },30)
                }
            },
            /**
             * Method: createControl
             * 创建量算控件。
             */
            createControl:function () {
                var me = this;

                var sketchSymbolizers = {
                    "Point":{
                        pointRadius:3,
                        graphicName:"square",
                        fillColor:"#669933",
                        fillOpacity:1,
                        strokeWidth:2,
                        strokeOpacity:1,
                        strokeColor:"#aaee77"
                    },
                    "Line":{
                        strokeWidth:3,
                        strokeOpacity:1,
                        strokeColor:"#aaee77"
                    },
                    "Polygon":{
                        strokeWidth:2,
                        strokeOpacity:1,
                        strokeColor:"#aaee77",
                        fillColor:"white",
                        fillOpacity:0.3
                    }
                };
                var style = new SuperMap.Style();
                style.addRules([
                    new SuperMap.Rule({symbolizer:sketchSymbolizers})
                ]);
                var styleMap = new SuperMap.StyleMap({"default":style});
                this.measureControls = {
                    line:new SuperMap.Control.Measure(
                        SuperMap.Handler.Path, {
                            persist:true,
                            immediate:true,
                            handlerOptions:{
                                layerOptions:{
                                    styleMap:styleMap
                                }
                            }
                        }
                    ),
                    polygon:new SuperMap.Control.Measure(
                        SuperMap.Handler.Polygon, {
                            persist:true,
                            immediate:true,
                            handlerOptions:{
                                layerOptions:{
                                    styleMap:styleMap
                                }
                            }
                        }
                    )
                };

                for (var key in this.measureControls) {
                    var control = this.measureControls[key];
                    control.events.on({
                        "measure":function (event) {
                            me.measureCompleted(event);
                        }
                        //,"measurepartial": handleMeasurements
                    });
                    this.map.addControl(control);
                }
            },
            /**
             * APIMethod: measureDistance
             * 距离量算。
             */
            measureDistance:function () {
                if (this.measureControls["polygon"].active) {
                    this.measureControls["polygon"].deactivate();
                }
                this.measureControls["line"].activate();
                this.clearResult();
            },
            /**
             * APIMethod: measureArea
             * 面积量算。
             */
            measureArea:function () {
                if (this.measureControls["line"].active) {
                    this.measureControls["line"].deactivate();
                }
                this.measureControls["polygon"].activate();
                this.clearResult();
            },
            /**
             * Method: measureCompleted
             * 量算完成。
             */
            measureCompleted:function (event) {
                var geometry = event.geometry;
                var units = event.units;
                var order = event.order;
                var measure = event.measure;
                if (order == 1) {
                    this.showResult("长度：" + measure.toFixed(3) + units);
                } else {
                    this.showResult("面积：" + measure.toFixed(3) + units);
                }
                this.deactivate();
            },
            /**
             * Method: clearResult
             * 清除结果区。
             */
            clearResult:function(){
                if(this.resultDiv)this.resultDiv.html("");
            },
            /**
             * Method: showResult
             * 在结果区显示量算结果。
             *
             * Parameters:
             * txt - {String} 显示在结果区的内容
             */
            showResult:function(txt){
                if(this.resultDiv)this.resultDiv.html(txt);
            },
            /**
             * APIMethod: clearFeatures
             * 清除量算结果。
             */
            clearFeatures:function () {
                try {
                    this.deactivate();
                    this.clearResult();
                }
                catch (e) {
                }
            },
            /**
             * APIMethod: destroy
             * 销毁。
             */
            destroy:function () {
                this.clearFeatures();
                for (var key in this.measureControls) {
                    var control = this.measureControls[key];

                    this.map.removeControl(control);
                }
            },
            /**
             * APIMethod: deactivate
             * 注销该控件。
             */
            deactivate:function () {
                for(var key in this.measureControls) {
                    if(this.measureControls[key].activate)
                    {
                        this.measureControls[key].deactivate();
                    }
                }
            }
        },
        null,                                      //父类
        false,                                     //是否是静态类
        [                                          //初始化该类之前需要加载的js文件
            "demo/js/ui/jquery.ui.widget.js",
            "demo/js/ui/jquery.ui.button.js"
        ]
    );
})()