$("#logo_out").click(function() {
    // delCookie();
    // $.cookie('QWpsbWFuYWdlcg',null);
    delAllCookie();
    // window.location.href = "http://www.gxajl.com/manager/index.html"
    window.location.href = "../index.html"
})

function getCookie($name) {
    var data = document.cookie;
    var dataArray = data.split("; ");
    for (var i = 0; i < dataArray.length; i++) {
        var varName = dataArray[i].split("=");
        if (varName[0] == $name) {
            return decodeURI(varName[1]);
        }

    }
}
//删除cookie中所有定变量函数    
function delAllCookie() {
    var myDate = new Date();
    myDate.setTime(-1000); //设置时间    
    var data = document.cookie;
    var dataArray = data.split("; ");
    for (var i = 0; i < dataArray.length; i++) {
        var varName = dataArray[i].split("=");
        document.cookie = varName[0] + "=''; expires=" + myDate.toGMTString();
    }

}