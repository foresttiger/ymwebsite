var _title = undefined;
var _layer = undefined;
var _name = undefined;
var _date = undefined;
layui.use(['form', 'layedit', 'laydate'], function() {
    var form = layui.form,
        layer = layui.layer,
        layedit = layui.layedit,
        laydate = layui.laydate;

    //日期
    laydate.render({
        elem: '#date'
    });
    laydate.render({
        elem: '#date1'
    });

    //创建一个编辑器
    var editIndex = layedit.build('LAY_demo_editor');

    //自定义验证规则
    form.verify({
        title: function(value) {
            if (value.length < 1) {
                return '请输入项目名称';
            }
        },
        layer: function(value) {
            if (value.length < 1) {
                return '请输入楼号跟层号';
            }
        },
        name: function(value) {
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
        HNT: function(value) {
            if (value.length < 1) {
                return '请输入混凝土方量';
            }
        },
        weight: function(value) {
            if (value.length < 1) {
                return '请输入构件重量';
            }
        },
        grade: function(value) {
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
        layer.alert(JSON.stringify(data.field), {
            title: '最终的提交信息'
        })
        _title = data.field.title;
        _layer = data.field.layer;
        _name = data.field.name;
        _date = data.field.date;
        var ms = "title:" + _title + ", " + "layer:" + _layer + "," + "name:" + _name + "," + "date:" + data.field.date
        makeCode(ms);
        return false;
    });
});

function makeCode(ms) {
    $("#qrcode").qrcode({
        // render: "",
        width: 400,
        height: 400,
        colorDark: "#000000",
        colorLight: "#ffffff",
        text: utf16to8(ms)
    });
}


function utf16to8(str) { //转码 
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}

function downloadClick() {

    var c = document.createElement('canvas');
    c.width = 600;
    c.height = 520;
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 600, 500);

    // 获取base64的图片节点
    var img = $('#qrcode canvas')[0];
    // 构建画布
    var canvas = document.createElement('canvas');
    canvas.width = 440;
    canvas.height = 520;
    canvas.getContext('2d').font = "22px Georgia";

    canvas.getContext('2d').drawImage(c, 0, 0);
    canvas.getContext('2d').drawImage(img, 20, 80);
    // canvas.getContext('2d').text(img, 20, 0);
    // canvas.getContext('2d').fillText('项目:' + _title, 10, 30);
    // canvas.getContext('2d').fillText('楼层号:' + _layer, 220, 30);
    // canvas.getContext('2d').fillText('构件:' + _name, 10, 60);
    // canvas.getContext('2d').fillText('生产日期:' + _date, 220, 60);
    canvas.getContext('2d').fillText('项目:碧桂园碧桂园', 10, 30);
    canvas.getContext('2d').fillText('楼层号:17#19898', 220, 30);
    canvas.getContext('2d').fillText('构件:碧桂园碧桂园', 10, 60);
    canvas.getContext('2d').fillText('生产日期:2018-10-20', 220, 60);
    // 构造url
    url = canvas.toDataURL('image/png');
    // 构造a标签并模拟点击
    var downloadLink = $('#downloadLink').attr("href", url).attr("download", "二维码.png");
    downloadLink[0].click();
}