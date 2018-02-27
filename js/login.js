var base = new Base64();
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
        if (arr[0] == "QWpsbWFuYWdlcg"){
            has = true;
        };
    }
    return has;
}
if (readCookies()) {
    window.open("pages/manager.html", '_self')
}
(function($) {
    var base = new Base64();
    $(".btn").on('click', function() {
        var user = base.encode($("#user").val());
        var pwd = base.encode($("#pwd").val());
        if (user == "") {
            layer.msg("用户名不能为空！")
            // $('<div id="msg" />').html("用户名不能为空！").appendTo('.sub').fadeOut(2000);
            $("#user").focus();
            return false;
        }
        if (pwd == "") {
            layer.msg("密码不能为空！")
            // $('<div id="msg" />').html("密码不能为空！").appendTo('.sub').fadeOut(2000);
            $("#pwd").focus();
            return false;
        }
        var obj = { "phone": user, "password": pwd, "type":null };
        $.ajax({
            type: "post",
            url: "http://rainingjoy.xin:9112/login",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(obj),
            beforeSend: function() {
                layer.msg('正在登录...', {
                  icon: 16,
                  time: 3000000,
                  shade: [0.1,'#fff']
                });
                // $('<div id="msg" />').addClass("loading").html("正在登录...").css("color", "#999").appendTo('.sub');
            },
            success: function(json) {
                addCookies(user, pwd, 168)
                if (json.status == 200) {
                    layer.msg("登录成功！")
                    setTimeout(function() {
                        window.open("pages/manager.html", '_self')
                    }, 1000)
                } else {
                    $("#msg").remove();
                    layer.msg(json.msg)
                    // $('<div id="errmsg" />').html(json.msg).css("color", "#999").appendTo('.sub').fadeOut(2000);
                    return false;
                }
            }
        });
    });
     document.onkeydown=function(){
          if (event.keyCode == 13){
            $(".btn").click()
          }
       }
})(jQuery);