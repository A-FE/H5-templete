// 定义一个全局变量store，直接暴露getItem、setItem 可能会污染全局变量
var store ={
    getItem: function (name) {
      return  localStorage.getItem(name)? JSON.parse(localStorage.getItem(name)):false;
    },
    setItem: function (name,val) {
        localStorage.setItem(name,JSON.stringify(val))
    },
    ajax: function (type,url,success,error) {
        $.ajax({
            type: type,
            url:url,
            dataType:'json',
            success: function (data) {
                success(data);
            },
            error: function () {
                error?error():false;
            }
        })
    }
}

$(function () {
    $("header .back:not(.noClick)").on("click", function () {
        history.go(-1)
    });
    /* 五星评价插件 */
    var myRatings=$(".my-rating");
    for(var i=0; i<myRatings.length; i++){
        var initialStars=myRatings[i].getAttribute("stars");
        var starSize=myRatings[i].getAttribute("starSize");
        var starsColor=myRatings[i].getAttribute("starsColor")||'#fecb0e';
        var readyOnly =myRatings[i].getAttribute("readyOnly");
        readyOnly=(readyOnly=='false')? false : true ;
        $(".my-rating:eq("+i+")").starRating({
            initialRating: initialStars,
            starSize: starSize||20,
            readOnly: readyOnly,  // 只读状态
            starGradient:{start: starsColor,end: starsColor}
        });
    }
});