var base = new Base64();
// judgeIsLogin();
(function($) {
    var base = new Base64();
    $(".btn").on('click', function() {
        var user = base.encode($("#user").val());
        var pwd = base.encode($("#pwd").val());
        if (user == "") {
            layer.msg("用户名不能为空！")
            $("#user").focus();
            return false;
        }
        if (pwd == "") {
            layer.msg("密码不能为空！")
            $("#pwd").focus();
            return false;
        }
        var obj = { "phone": user, "password": pwd};
        $.ajax({
            type: "post",
            url: "http://RainingJoy.xin:9000/login",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(obj),
            beforeSend: function() {
                layer.msg('正在登录...', {
                    icon: 16,
                    time: 3000000,
                    shade: [0.1, '#fff']
                });
            },
            success: function(json) {
                console.log(json.token)
                if (json.status == 200) {
                    if (json.scope!="1"&&json.scope!="2") {
                        layer.msg("该账户无权限！")
                        return;
                    }
                    layer.msg("登录成功！")
                    setSession("token", json.token)
                    setSession("scope", json.scope)
                    setSession(user, pwd);
                    setTimeout(function() {
                        window.open("pages/manager.html", '_self')
                    }, 1000)
                } else {
                    $("#msg").remove();
                    layer.msg(json.message)
                    return false;
                }
            }
        });
    });
    document.onkeydown = function() {
        if (event.keyCode == 13) {
            $(".btn").click()
        }
    }
})(jQuery);