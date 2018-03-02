judgeIsLogin();
layui.use(['form', 'layedit', 'laydate'], function() {
    var form = layui.form,
        layer = layui.layer,
        layedit = layui.layedit,
        laydate = layui.laydate;

    //日期
    laydate.render({
        elem: '#productDate'
    });
    laydate.render({
        elem: '#date1'
    });

    //创建一个编辑器
    var editIndex = layedit.build('LAY_demo_editor');

    //自定义验证规则
    form.verify({
        proName: function(value) {
            if (value.length < 1) {
                return '请输入项目名称';
            }
        },
        buildingInfo: function(value) {
            if (value.length < 1) {
                return '请输入楼号跟层号';
            }
        },
        componentName: function(value) {
            if (value.length < 1) {
                return '请输入构件名称';
            }
        },
        length_X: function(value) {
            if (value.length < 1) {
                return '请输入构件长度';
            }
        },
        length_Y: function(value) {
            if (value.length < 1) {
                return '请输入构件宽度';
            }
        },
        length_Z: function(value) {
            if (value.length < 1) {
                return '请输入构件高度';
            }
        },
        volume: function(value) {
            if (value.length < 1) {
                return '请输入混凝土方量';
            }
        },
        weight: function(value) {
            if (value.length < 1) {
                return '请输入构件重量';
            }
        },
        level: function(value) {
            if (value.length < 1) {
                return '请输入混凝土等级';
            }
        },
        pass: [/(.+){6,12}$/, '密码必须6到12位'],
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

    //监听提交
    form.on('submit(demo1)', function(data) {
        console.log(data.field)
        loaderData(data.field);
        return false;
    });
});

function loaderData(option) {
    var isLogin = getSession("token");
    if (!isLogin) {
        window.location.href = "../index.html";
        return
    }
    var token = getSession("token")
    var size = option.length_X + "x" + option.length_Y + "x" + option.length_Z;
    delete option.length_X;
    delete option.length_Y;
    delete option.length_Z;
    // Object.assign(option, { "token": "8f79bacb841642fd894bb0d2ea0f5c74", "size": size, "picPath":picPath,"status":"入库" });
    Object.assign(option, { "token": token, "size": size, "status": "add" });
    $.ajax({
        type: "post",
        url: "http://rainingjoy.xin:9112/saveOrUpdateComponent",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(option),
        beforeSend: function() {
            layer.msg('正在上传...', {
                icon: 16,
                time: 3000000,
                shade: [0.1, '#fff']
            });
        },
        success: function(json) {
            console.log(json)
            if (json.status == 200) {
                layer.msg("入库成功！")
                $("#form_reset").click();
            } else {
                $("#msg").remove();
                layer.msg(json.message)
                return false;
            }
        }
    });
}