/**
 * Class: SM_Tile
 * 界面的标题栏。
 */
(function(){
    function A(){
        var t = this;
        t.create();
    }
    var B = A.prototype;
    /**
     * Method: create
     * 创建title区域。
     */
    B.create = function(){
        var body = $("#sm_title"),d1,d2;
        if(body){
            body.css({
                "height":"80px",
                "background":"#fff",
                "border-bottom":"2px solid #29a3e2"
            });

            d1 = $("<div>")
                .css({
                    "margin":"0 auto",
                    "width":"960px"
                })
                .appendTo(body);

            d2 = $("<div>")
                .css({
                    "height":"48px",
                    "width":"311px",
                    "background": "url(../images/init/logo.png) no-repeat",
                    "position":"relative",
                    "top":"21px"
                })
                .appendTo(d1);
        }
    }
    new A();
})()