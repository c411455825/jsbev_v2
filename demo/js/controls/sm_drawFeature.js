/**
 * Class: SuperMap.Bev.DrawFeature
 * 绘制要素功能。
 */
(function () {
    SuperMap.Bev.Class.create(
        "SuperMap.Bev.DrawFeature",
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
             * APIProperty: pointIcon
             * {String} 绘制点按钮图标路径
             */
            pointIcon:null,

            /**
             * APIProperty: pointIconOffsetX
             * {Number} 绘制点按钮图标X偏移量
             */
            pointIconOffsetX:null,

            /**
             * APIProperty: pointIconOffsetY
             * {Number} 绘制点按钮图标Y偏移量
             */
            pointIconOffsetY:null,

            /**
             * APIProperty: lineIcon
             * {String} 绘制线按钮图标路径
             */
            lineIcon:null,

            /**
             * APIProperty: lineIconOffsetX
             * {Number} 绘制线按钮图标X偏移量
             */
            lineIconOffsetX:null,

            /**
             * APIProperty: lineIconOffsetY
             * {Number} 绘制线按钮图标Y偏移量
             */
            lineIconOffsetY:null,

            /**
             * APIProperty: areaIcon
             * {String} 绘制面按钮图标路径
             */
             areaIcon:null,

            /**
             * APIProperty: areaIconOffsetX
             * {Number} 绘制面按钮图标X偏移量
             */
            areaIconOffsetX:null,

            /**
             * APIProperty: areaIconOffsetY
             * {Number} 绘制面按钮图标Y偏移量
             */
            areaIconOffsetY:null,

            /**
             * APIProperty: clearIcon
             * {String} 清除按钮图标路径
             */
            clearIcon:null,

            /**
             * APIProperty: clearIconOffsetX
             * {Number} 清除按钮图标X偏移量
             */
            clearIconOffsetX:null,

            /**
             * APIProperty: clearIconOffsetY
             * {Number} 清除按钮图标Y偏移量
             */
            clearIconOffsetY:null,

            /**
             * Property: geoMarker_bev
             * {SuperMap.Layer.Vector} 矢量要素图层
             */
            drFeVector_bev:new SuperMap.Layer.Vector("drFeVector_bev"),

            /**
             * Property: geolocateControl
             * {Object} 要素绘制控件
             */
            drawFeatureControls:null,

            /**
             * Constructor: SuperMap.Bev.DrawFeature
             * 实例化 DrawFeature 类。
             *
             * Parameters:
             * option - {Object} 参数对象
             *
             * Examples:
             * (code)
             *  myDrawFeature = new SuperMap.Bev.DrawFeature({
             *      "body":$("<div>"),        //{DOMElement} 页面上装载该控件的容器
             *      "map":map                 //{SuperMap.Map} 地图对象。
             *  });
             * (end)
             */
            init:function (option) {
                for(var key in option){
                    this[key] = option[key];
                }
                this.setMap(this.map);
                this.create();
                //this.createControl();
            },

            /**
             * APIMethod: setMap
             * 设置map参数
             */
            setMap:function(map){
                if(map){
                    this.map = map;
                    this.map.addLayer(this.drFeVector_bev);
                    this.createControl();
                }
            },

            /**
             * Method: create
             * 创建该控件的dom对象。
             */
            create:function () {
                var me = this,b1,b2,b3,b4;
                b1 = $("<button id='point'>绘制点</button>").button({
                    icons:{
                        primary:"ui-icon-locked"
                    }
                }).click(function (e) {
                        me.drawFeature(e);
                    }).appendTo(this.body);

                if(this.pointIcon){
                    var btn1 = b1.button("option","buttonElement");
                    var icon = btn1.children(".ui-icon");
                    icon.css({
                        "background":"url("+this.pointIcon+") "+(this.pointIconOffsetX==null?0:this.pointIconOffsetX)+"px "+(this.pointIconOffsetY==null?0:this.pointIconOffsetY)+"px"
                    });
                }

                b2 = $("<button id='line'>绘制线</button>").button({
                    icons:{
                        primary:"ui-icon-locked"
                    }
                }).click(function (e) {
                        me.drawFeature(e);
                    }).appendTo(this.body);

                if(this.lineIcon){
                    var btn = b2.button("option","buttonElement");
                    var icon = btn.children(".ui-icon");
                    icon.css({
                        "background":"url("+this.lineIcon+") "+(this.lineIconOffsetX==null?0:this.lineIconOffsetX)+"px "+(this.lineIconOffsetY==null?0:this.lineIconOffsetY)+"px"
                    });
                }

                b3 = $("<button id='polygon'>绘制面</button>").button({
                    icons:{
                        primary:"ui-icon-locked"
                    }
                }).click(function (e) {
                        me.drawFeature(e);
                    }).appendTo(this.body);

                if(this.areaIcon){
                    var btn = b3.button("option","buttonElement");
                    var icon = btn.children(".ui-icon");
                    icon.css({
                        "background":"url("+this.areaIcon+") "+(this.areaIconOffsetX==null?0:this.areaIconOffsetX)+"px "+(this.areaIconOffsetY==null?0:this.areaIconOffsetY)+"px"
                    });
                }

                b4 = $("<button id='clearFeatures'>清除绘制</button>").button({
                    icons:{
                        primary:"ui-icon-locked"
                    }
                }).click(function () {
                        me.clearFeatures();
                    }).appendTo(this.body);

                if(this.clearIcon){
                    var btn = b4.button("option","buttonElement");
                    var icon = btn.children(".ui-icon");
                    icon.css({
                        "background":"url("+this.clearIcon+") "+(this.clearIconOffsetX==null?0:this.clearIconOffsetX)+"px "+(this.clearIconOffsetY==null?0:this.clearIconOffsetY)+"px"
                    });
                }


                window.setTimeout(function(){
                    btn1[0].blur();
                },30)
            },

            /**
             * Method: createControl
             * 创建绘制控件。
             */
            createControl:function () {
                var me = this;
                me.drawFeatureControls = {
                    point:new SuperMap.Control.DrawFeature(me.drFeVector_bev, SuperMap.Handler.Point, {featureAdded:this.featureAdded}),
                    line:new SuperMap.Control.DrawFeature(me.drFeVector_bev, SuperMap.Handler.Path, {featureAdded:this.featureAdded}),
                    polygon:new SuperMap.Control.DrawFeature(me.drFeVector_bev, SuperMap.Handler.Polygon, {featureAdded:this.featureAdded})
                };

                for (var key in me.drawFeatureControls) {
                    me.map.addControl(me.drawFeatureControls[key]);
                }
            },

            /**
             * Method: drawFeature
             * 激活绘制要素控件。
             */
            drawFeature:function (e) {
                var me = this;
                var value = e.currentTarget.id;
                for (key in me.drawFeatureControls) {
                    var control = me.drawFeatureControls[key];
                    if (value == key) {
                        control.activate();
                    } else {
                        control.deactivate();
                    }
                }
            },

            /**
             * Method: featureAdded
             * 要素添加后取消控件激活。
             */
            featureAdded:function () {
                this.deactivate();
            },

            /**
             * APIMethod: clearFeatures
             * 清除要素。
             */
            clearFeatures:function () {
                this.map.getLayersByName("drFeVector_bev")[0].removeAllFeatures();
            },
            /**
             * APIMethod: destroy
             * 在地图上移除控件。
             */
            destroy:function () {
                this.clearFeatures();
                for (var key in this.drawFeatureControls) {
                    var control = this.drawFeatureControls[key];
                    if (control.activate) {
                        control.deactivate();
                    }
                    this.map.removeControl(control);
                }
            },

            /**
             * APIMethod: deactivate
             * 注销该控件。
             */
            deactivate:function () {
                var me = this;
                for (var key in me.drawFeatureControls) {
                    if (me.drawFeatureControls[key].activate) {
                        me.drawFeatureControls[key].deactivate();
                    }
                }
            }
        }
    );
})()