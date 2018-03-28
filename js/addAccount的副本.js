judgeIsLogin();
var scope = getSession("scope");
if (scope != "1") {
    $('#admin').remove();
}
layui.use(['form', 'layedit', 'laydate'], function() {
    var form = layui.form,
        layer = layui.layer,
        layedit = layui.layedit,
        laydate = layui.laydate;
    //创建一个编辑器

    var editIndex = layedit.build('LAY_demo_editor');

    //自定义验证规则
    form.verify({
        phone: [/^[1][3,4,5,7,8][0-9]{9}$/, '请输入正确的手机号'],
        password: [/(.+){6,12}$/, '密码必须6到12位'],
        content: function(value) {
            layedit.sync(editIndex);
        }
    });

    //监听指定开关
    form.on('switch(switchTest)', function(data) {
        layer.msg('开关checked：' + (this.checked ? 'true' : 'false'), {
            offset: '6px'
        });
        layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis)
    });
    form.on('checkbox(admin)', function(data) {
        $('#inbound').removeAttr('checked');
        $('#outbound').removeAttr('checked');
        form.render();
    });
    form.on('checkbox(inbound)', function(data) {
        $('#admin').removeAttr('checked');
        form.render();
    });
    form.on('checkbox(outbound)', function(data) {
        $('#admin').removeAttr('checked');
        form.render();
    });
    //监听提交
    form.on('submit(demo1)', function(data) {
        console.log(data.field)
        var opt = data.field;
        switch (true) {
            case opt.admin && opt.admin == 'on':
                delete opt.admin;
                opt["scope"] = '2';
                opt["type"] = 'admin';
                submitAddAccountData(opt);
                break;
            case opt.inbound == 'on' && opt.outbound == 'on':
                opt["scope"] = '5';
                opt["type"] = 'operator';

                delete opt.inbound;
                delete opt.outbound;
                submitAddAccountData(opt);
                break;
            case opt.inbound == 'on':
                opt["type"] = 'operator';
                opt["scope"] = '3';
                delete opt.inbound;
                submitAddAccountData(opt);
                break;
            case opt.outbound == 'on':
                opt["scope"] = '4';
                opt["type"] = 'operator';
                delete opt.outbound;
                submitAddAccountData(opt);
                break;
        }

        // submitData(opt);

        return false;
    });
});

function submitAddAccountData(option) {
    var isLogin = getSession("token");
    if (!isLogin) {
        window.location.href = "../index.html";
        return
    }
    var token = getSession("token")
    console.log(option);
    Object.assign(option, { "token": token });
    $.ajax({
        type: "post",
        // url: "http://www.zjgymzg.com/saveOrUpdateCustomer",
        url: "http://www.zjgymzg.com/saveOrUpdateCustomer",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(option),
        beforeSend: function() {
            layer.msg('正在添加...', {
                icon: 16,
                time: 3000000,
                shade: [0.1, '#fff']
            });
        },
        success: function(json) {
            console.log(json)
            if (json.status == 200) {
                layer.msg("添加成功！")
                $("#form_reset").click();
            } else {
                $("#msg").remove();
                layer.msg(json.message)
                return false;
            }
        },
        error: function(e) {
            layer.msg("网络异常，请稍后再试！")
        }
    });
}