/**
 * Created by 28073 on 2017/3/28.
 */
 //轮播图
$(function () {
    var n =2;
    var t = setInterval(function(){
        if(n<5){
           $("#lunbo").attr("src","imgs/lunbo_"+n+".jpg");
           n++;
        }else {
            n=1;
        }
    },1000)
    }
);
//点击登录按钮进入登录界面
$("#dl").on("click",function(){
    $("#denglu_bgBan").show();
})
//点击关闭按钮登录
$("#dlclose").on("click",function(){
    $("#denglu_bgBan").hide();
})
//点击按钮城展开切换城市
$("#city_qh").on("click",function(){
    $("#citylist").show();
})
$("#city_qh_close").on("click",function(){
    $("#citylist").hide();
})
//点击地图模式弹出地图窗
 $("#dt").on("click",function(){
    $("#ditu").show();
    //点击地图按钮后显示坐标
   $.ajax("data/shopcity.json",{
        success:function(data){
            var shop_data = data.shop_data;
            for(var i in shop_data){
                    var maker = new AMap.Marker({
                    position:[shop_data[i].map_longitude,shop_data[i].map_latitude],
                    title:shop_data[i].shop_name,
                    map:map,
                    icon:"img/zuobiao.png"
                })
            }
            //地图中心
            map.setZoomAndCenter(12, [shop_data[0].map_longitude,shop_data[0].map_latitude]);
        }
    })
 });


 $(".close").on("click",function(){
    $("#ditu").hide();
})
// //创建地图地图
var map = new AMap.Map("tc",{
     resizeEnable: false,
    zoom:11,
    center: [116.397428, 39.90923]

});
//设置语言
map.setLang('zh_en');
//创建控件对象
var toolBar = new AMap.ToolBar(),
    overView = new AMap.OverView(),
    scale = new AMap.Scale();
//将控件添加到当前地图
map.addControl(toolBar);
map.addControl(overView);
map.addControl(scale);
//设置中心城市
// map.setCity();
//map.setZoom();
//map.setCenter();
var auto = new AMap.Autocomplete({
input:"SS"
});
//添加选中监听事件
AMap.event.addListener(auto, "select", function select(e){
      if (e.poi && e.poi.location) {
            map.setZoom(15);
            map.setCenter(e.poi.location);
        }
});
//翻页
$(function(){
    function pager(pageId, pageSize, totleNum, currentPage){
        var pageCount = Math.ceil(totleNum/pageSize),
            currentPage = currentPage || "1",
            barFrame =  '<li>首页</li>'+
                '<li style="width:102px;height:44px;">上一页</li>'+
                '<li style="width:102px;height:44px;">下一页</li>'+
                '<li style="width:102px;height:44px;">尾页&gt;&gt;</li>';
        //构建分页工具条主结构
        $("#"+pageId).html(barFrame);
        //构建页码
        //初始化起始页码
        var startIndex = currentPage <=5 ? 1 : currentPage-4;
        //console.log(startIndex);
        var str="";
        for(var i=0;i<10 && startIndex<=pageCount;i++){
            str+= startIndex == currentPage?"<li class='cur'>"+startIndex+"</li>":"<li>"+startIndex+"</li>";
            startIndex++;

        }
        $("#yenum li:eq(2)").before(str);
    }
    pager("yenum",5,100,1);
    //翻页事件
    $("#yenum").on("click","li",function(){
        var curIndex = $("#yenum").attr("val");
        var newIndex = $(this).text();
        switch(newIndex){
            case "首页":
                pager("yenum",5,100,1);
                $("#yenum").attr("val",1);
                break;
            case "上一页":
                if(parseInt(curIndex)==1){return}
                pager("yenum",5,100,parseInt(curIndex)-1);
                $("#yenum").attr("val",parseInt(curIndex)-1);
                break;
            case "下一页":
                if(parseInt(curIndex)>=Math.ceil(100/5)){return}
                pager("yenum",5,100,parseInt(curIndex)+1);
                $("#yenum").attr("val",parseInt(curIndex)+1);
                break;
            case "尾页>>":
                pager("yenum",5,100,Math.ceil(100/5));
                $("#yenum").attr("val",Math.ceil(100/5));
                break;
            default:
                pager("yenum",5,100,parseInt(newIndex));
                $("#yenum").attr("val",newIndex);
                break;
        }

    })
});
//请求修手机数据
$.ajax({
    url:"data/repairPad.json",
    type:"get",
    dataType:"json",
    success:function(data){
        //渲染数据
        $(".repair").load("mb/rephone.html",function(){
            var htmlstr = baidu.template("rephone_baidu",data);
            $(this).html(htmlstr);
        })
    }
});

//请求卖手机数据
$.ajax({
    url:"data/Phone_num.json",
    type:"get",
    dataType:"json",
    success:function(data){
        //渲染数据
        $(".sell_phone").load("mb/sellphone.html",function(){
            var htmlstr = baidu.template("sellphone_baidu",data);
            $(this).html(htmlstr);
        })
    }
});
//请求买手机数据
$.ajax({
    url:"data/buyPhone.json",
    type:"get",
    dataType:"json",
    success:function(data){
        //渲染数据
        $(".buy_phone").load("mb/buyphone.html",function(){
            var htmlstr = baidu.template("buyphone_baidu",data);
            $(this).html(htmlstr);
        })
    }
});
//请求热门手机回收数据
$.ajax({
    url:"data/hotphone.json",
    type:"get",
    dataType:"json",
    success:function(data){
        //渲染数据
            $(".main_middle_bottom_two_").load("mb/hotphone.html",function(){
                var htmlstr = baidu.template("hotphone",data);
                $(this).html(htmlstr);
            })
    }
});
//请求二手良品手机
$.ajax({
    url:"data/ershou.json",
    type:"get",
    dataType:"json",
    success:function(data){
    //渲染数据

    $(".main_middle_second_two_").load("mb/ershou.html",function(){
        var htmlstr = baidu.template("ershou",data);
        $(this).html(htmlstr);
    })
    }
});
//获取城市列表信息
$.ajax({
    url:"data/shopcity.json",
    type:"get",
    dataType:"json",
    success:function(data){
        //渲染数据
        $(".stor_left_3").load("mb/shopcity.html",function(){
            var htmlstr = baidu.template("shopcity",data);
            $(this).html(htmlstr);
        })
    }

});
//全国城市
$.ajax("data/city.json",{
    success:function(data){
        $("#city").load("mb/mbcity.html",function(){
            var htmlstr = baidu.template("Mcity",data);
            $(this).html(htmlstr);
        })
    }
});
//点击字母切换城市列表
$(".citylist_pinyin a").on("click",function(){
    $(this).css({
        "border": "1px solid #d9d9d9",
       "border-bottom": "1px solid #fff",
        // console.log("点击按钮")
    })
});
//回到顶部
$(".fix1").on("click",function(){
    $("body").scrollTop(0);
    console.log("回顶部");
});
//二维码
$(".fix2 a").on("mouseenter",function(){
    $(this).css({
        background:"url(imgs/line.png) no-repeat left -56px"
    })
});
$(".fix2 a").on("mouseleave",function(){
    $(this).css({
        background:""
    })
});
