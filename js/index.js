// var isLogin = getSession("token");
// if(!isLogin){
//     clearSession();
//     window.location.href = "index.html";
// }
$("#logo_out").click(function() {
    clearSession()
    window.location.href = "../index.html";
})
function judgeIsLogin() {
    var isLogin = getSession("token");
    if (!isLogin) {
        clearSession();
        window.location.href = "../index.html";
    }
}

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
/*设置Cookie*/
function addCookies(name, value, expiresHours) {
    // value = URLEncoder.encode(name, "utf-8");
    // value = decodeURI
    var cookieString = name + "=" + value;
    //判断是否设置过期时间 
    if (expiresHours > 0) {
        var date = new Date();
        date.setTime(date.getTime + expiresHours * 3600 * 1000);
        cookieString = cookieString + "; expires=" + date.toGMTString();
    }
    document.cookie = cookieString;
}
/*读取Cookie*/
function readCookies() {
    var has = false;
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr[0] == "QWpsbWFuYWdlcg") {
            has = true;
        };
    }
    return has;
}
/*设置session*/
function setSession(name, value) {
    $.session.set(name, value)
}
/*获取*/
function getSession(name) {
    var value = $.session.get(name);
    return value;
}
/*删除*/
function delSession(name) {
    $.session.remove(name);
}
/*清除*/
function clearSession() {
    $.session.clear();
}