<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />

    <link rel="stylesheet" href="css/libs/weui.css">
    <link rel="stylesheet" href="css/libs/jquery-weui.min.css">
    <script src="js/libs/jquery-3.0.0.min.js"></script>
    <script src="js/libs/weui.js"></script>
    <script src="js/libs/jquery-weui.min.js"></script>

    <script src="js/libs/baidu/BMapLib.js"></script>
    <!-- 加载百度地图插件 -->
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=3tNmobyDXvMyo8xL8GTULduAoxWeAihe"></script>
	<title>百度地图鼠标绘制工具</title>
    <style type="text/css">
        body, html{width: 100%;height: 100%;margin:0;}
    </style>
</head>
<body>
	<div id="allmap" style="width: 100%; height:100%; overflow:hidden;zoom:1;position:relative;">
		<div id="map" style="height:100%;-webkit-transition: all 0.5s ease-in-out;transition: all 0.5s ease-in-out;"></div>
	</div>

	<script type="text/javascript">

        var usePoint = {x:113.392403, y:23.064887}; // 用户当前的坐标
        var arrPolygon = {                          // 商户送货范围区域坐标
            polygon1: [
                {x:113.395385, y:23.068013},
                {x:113.413998, y:23.067281},
                {x:113.405878, y:23.041942},
                {x:113.381731, y:23.04713},
                {x:113.383564, y:23.0597}
            ],
            polygon2: [
                {x:113.416226, y:23.085235},
                {x:113.360603, y:23.080846},
                {x:113.374257, y:23.068877}
            ]
        };

        map(usePoint,arrPolygon, function (rs) {
            console.log(rs); // 用户点击确定后，将返回用户选择的地址
        });

         /* 百度地图插件
          * @param usePoint 用户当前的坐标，json对象，格式 {x:233.12,y:12387}
          * @param arrPolygon 商户送货的区域，数组对象,格式 [polygon1:[{x:233.12,y:12387},{x:233.12,y:12387},{x:233.12,y:12387}],polygon2:[],]
          * @return none
          * */
        function map(usePoint, arrPolygon,callback) {
            // 百度地图API功能
            var map = new BMap.Map('map');
            var poi = new BMap.Point(usePoint.x, usePoint.y);           // 用户所在的坐标
            map.centerAndZoom(poi, 14);                                 // 定位中心点，放大倍数
            var aPolygon = [];
            var styleOptions = {
                strokeColor: "rgba(133, 165, 217, 1)",                  //边线颜色。
                fillColor: "rgba(133, 165, 217, 1)",                    //填充颜色。当参数为空时，圆形将没有填充效果。
                strokeWeight: 1,                                        //边线的宽度，以像素为单位。
                strokeOpacity: 0,	                                    //边线透明度，取值范围0 - 1。
                fillOpacity: 0.6,                                       //填充的透明度，取值范围0 - 1。
                strokeStyle: 'solid'                                    //边线的样式，solid或dashed。
            };
            // 商户送货范围区域
            for(var i in arrPolygon){
                var arrPoint = [];
                for(var j=0; j< arrPolygon[i].length; j++){
                    arrPoint.push(new BMap.Point(arrPolygon[i][j].x, arrPolygon[i][j].y));
                }
                var polygon = new BMap.Polygon(arrPoint, styleOptions);
                aPolygon.push(polygon);
                map.addOverlay(polygon);
            }


            map.enableScrollWheelZoom();
            map.addEventListener('click', add_overlay);

            function add_overlay(e) {
                deletePoint();
                var marker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat));  // 创建点
                map.addOverlay(marker);                                                  // 绘制点
                checkPoint(e);
            }

            // 判断点是否在区域内
            var geoc = new BMap.Geocoder();
            var checkPoint = function (e) {
                var pt = e.point;
                var point = new BMap.Point(e.point.lng, e.point.lat);
                var isTrue = false ;                    // 是否在区域内，默认不在
                for(var i=0; i<aPolygon.length; i++){
                    if(BMapLib.GeoUtils.isPointInPolygon(point, aPolygon[i])){
                        isTrue = true;
                        break;
                    }
                }
                if (isTrue) {
                    geoc.getLocation(pt, function (rs) {
                        var addComp = rs.addressComponents;
                        var adressText = addComp.province + "  " + addComp.city + "  " + addComp.district + "  " + addComp.street + "  " + addComp.streetNumber;
                        $.confirm({
                            title: '确认配送地址',
                            text: adressText,
                            onOK: function () {
                                //点击确认
                                callback(adressText);
                            },
                            onCancel: function () {
                            }
                        });
                    })
                } else {
                    $.toptip('抱歉,该区域不在配送范围', 'warning');
                    console.log('不在区域');
                }
            };

            // 删除点
            function deletePoint() {
                var allOverlay = map.getOverlays();
                for (var i = 0; i < allOverlay.length; i++) {
                    if (allOverlay[i].point) {
                        map.removeOverlay(allOverlay[i]);
                    }
                }
            }
        }
    </script>
</body>
</html>
