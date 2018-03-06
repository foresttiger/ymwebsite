/*操作二维码*/
var opt = {
    type: "",
    value: ""
}

function getCode(type, name, num, other) {
    // var opt = {
    //     type: type,
    //     value: ""
    // }
    switch (type) {
        case "inboundCars":

            for (var i = 1; i <= num; i++) {
                var data = {
                    type: type,
                    title: "入库车",
                    value: i + "号车"
                }
                downloadQRcode(data)
            }
            break;
        case "outboundCars":
            for (var i = 1; i <= num; i++) {
                var data = {
                    type: type,
                    title: "出库车",
                    value: i + "号车"
                }
                downloadQRcode(data)
            }
            break;
        case "location":
            for (var i = 1; i <= num; i++) {
                var data = {
                    title: "",
                    type: type,
                    title: "区",
                    value: name + "-" + i
                }
                downloadQRcode(data)
            }
            break;
    }
}

function downloadQRcode(data) {
    var imgName = data.title + ":" + data.value;
    var opt = {};
    opt[data.type] = data.value;
    makeCode(opt);
    // downloadClick(data);
    var url = productQrcodeImg(data);
    downloadClick(url, imgName);
}
// 生成二维码
function makeCode(ms) {
    var data = JSON.stringify(ms)
    $("#qrcode").empty();
    $("#qrcode").qrcode({
        width: 400,
        height: 400,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: 0,
        text: utf16to8(data)
    });
}
/*转码*/
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
/*生成二维码*/
function productQrcodeImg(data) {
    // var opts
    var title = data.title;
    var value = data.value;
    var c = document.createElement('canvas');
    c.width = 600;
    c.height = 520;
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 600, 500);

    // 获取base64的图片节点
    var img = $('#qrcode canvas')[0];
    // 构建画布
    var canvas = document.createElement('canvas');
    canvas.width = 440;
    canvas.height = 520;
    canvas.getContext('2d').font = "60px Microsoft Yahei";
    canvas.getContext('2d').fillStyle = 'red';

    canvas.getContext('2d').drawImage(c, 0, 0);
    canvas.getContext('2d').drawImage(img, 20, 80);
    if (data.type == "location") {
        canvas.getContext('2d').fillText(value, 160, 60);
    } else {
        canvas.getContext('2d').fillText(title + ":" + value, 30, 60);
    }
    // canvas.getContext('2d').fillText('楼层号:' + buildingInfo, 220, 30);
    // canvas.getContext('2d').fillText('构件:' + componentName, 10, 60);
    // canvas.getContext('2d').fillText('生产日期:' + productDate, 220, 60);
    return canvas.toDataURL('image/png')
}
/*下载图片*/
function downloadClick(url, name) {
    var rA = $('<a>');
    // 构造a标签并模拟点击
    var downloadLink = rA.attr("href", url).attr("download", name + ".png");
    console.log(downloadLink)
    downloadLink[0].click();
}
/*得到二维码图片*/
function loaderQRcodeImg(data, files) {
    var imgName = data.proName + data.componentName;
    makeCode(data);
    var url = productQrcodeImg(data);
    $(".ms .contents .qcode img").attr("src", url);
    // };

}