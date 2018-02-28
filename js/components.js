  $(function() {
      loadDataToType("pc");
      $("#order dd").click(function(e) {
          var dataType = $(this).attr("data-type");
          loadDataToType(dataType);
          console.log(dataType);
      })
      layui.use('form', function() {
          var form = layui.form;
          form.on('select(search_type)', function(data) {
              var type = $("#order dd.layui-this").attr("data-type");
              if (data.value == "all") {
                  $(".searchData").val("");
                  loadDataToType(type);
              }
              console.log(data.elem); //得到select原始DOM对象
              console.log(data.value); //得到被选中的值
              console.log(data.othis); //得到美化后的DOM对象
          });
          form.on('submit(search_btn)', function(data) {
              var type = $("#order dd.layui-this").attr("data-type");
              var string = data.field.dataString;
              // var string = data.field.row + '=' + data.field.dataString;
              if (data.field.row == "all") {
                  string = undefined
              }
              loadDataToType(type, string);
              // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
              // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
              // console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
              return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
          });
      });



  })
  /*更新数据*/
  function loadDataToType(type, searchVal, status) {
      var token = "8f79bacb841642fd894bb0d2ea0f5c74";
      // var URL = search ? ("http://rainingjoy.xin:9111/getList?dataType=" + type + "&" + search) : ("http://rainingjoy.xin:9111/getList?token=" + token)
      var URL = "http://rainingjoy.xin:9112/getList"
      // var URL = search ? ("http://rainingjoy.xin:9111/getList?dataType=" + type + "&" + search) : ("http://rainingjoy.xin:9111/getAll?dataType=" + type)
      // var URL = "http://rainingjoy.xin:9111/getAll?dataType=" + type;

      var opt = {
          "token": token,
          "componentName": searchVal,
          "status": status || "add"
      }
      $.ajax({
          "url": URL,
          "type": "post",
          contentType: "application/json",
          "data": JSON.stringify(opt)
      }).done(function(data) {
          renderOrderTable(data.list, type)
      }).fail(function(e) {
          console.log(e)
      });

  }

  function renderOrderTable(data, type) {
      $(".tab-header h2").html($("#order dd[data-type=" + type + "]").find("a").text());
      layui.use('table', function() {
          var table = layui.table;
          //展示已知数据
          table.render({
              elem: '#demo',
              cellMinWidth: 100,
              cols: [
                  [ //标题栏
                      { field: 'id', title: 'ID', width: 80, sort: true, align: "center", fixed: 'left' },
                      { field: 'proName', title: '项目名称', sort: true, align: "center" },
                      { field: 'buildingInfo', title: '楼层号', align: "center" },
                      { field: 'componentName', title: '构件名称', align: "center" },
                      { field: 'size', title: '尺寸', align: "center" },
                      { field: 'volume', title: '混凝土方量', sort: true, align: "center" },
                      { field: 'weight', title: '构件重量', sort: true, align: "center" },
                      { field: 'level', title: '混凝土等级', sort: true, align: "center" },
                      { field: 'productDate', title: '生产日期', sort: true, align: "center" },
                      { field: 'inboundDate', title: '入库日期', sort: true, align: "center" },
                      { field: 'outboundDate', title: '出库日期', sort: true, align: "center" },
                      { field: 'location', title: '区域', sort: true, align: "center" },
                      { field: 'carsInfo', title: '车辆信息', align: "center" },
                      { field: 'status', title: '状态', align: "center" },
                      // { field: 'picPath', title: '二维码地址', align: "center" },
                      { field: 'right', title: '操作', width: 200, toolbar: "#components" }
                  ]
              ],
              height: 'full-200',
              id: 'testReload',
              data: data,
              even: true,
              page: true, //是否显示分页
              limits: [50, 100, 200],
              limit: 50 //每页默认显示的数量
          });
          var $ = layui.$,
              active = {
                  reload: function() {
                      var demoReload = $('#demoReload');

                      table.reload('testReload', {
                          where: {
                              keyword: demoReload.val()
                          }
                      });
                  }
              };
          //监听单元格编辑
          table.on('edit(quote)', function(obj) {
              updataOrderData(obj.data, type)
          });
          $('#demo .layui-btn').on('click', function() {
              var type = $(this).data('type');
              active[type] ? active[type].call(this) : '';
          });
          var $ = layui.$,
              active = {
                  getCheckData: function() { //获取选中数据
                      var checkStatus = table.checkStatus('idTest'),
                          data = checkStatus.data;
                      layer.alert(JSON.stringify(data));
                  },
                  getCheckLength: function() { //获取选中数目
                      var checkStatus = table.checkStatus('idTest'),
                          data = checkStatus.data;
                      layer.msg('选中了：' + data.length + ' 个');
                  },
                  isAll: function() { //验证是否全选
                      var checkStatus = table.checkStatus('idTest');
                      layer.msg(checkStatus.isAll ? '全选' : '未全选')
                  }
              };
          //监听工具条
          table.on('tool(quote)', function(obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
              var data = obj.data //获得当前行数据
                  ,
                  layEvent = obj.event; //获得 lay-event 对应的值
              if (layEvent === 'detail') {
                  console.log(data)
                  showModel(data)
                  // layer.msg('查看操作');
              } else if (layEvent === 'del') {
                  layer.confirm('真的删除行么', function(index) {
                      obj.del(); //删除对应行（tr）的DOM结构
                      layer.close(index);
                      //向服务端发送删除指令
                  });
              } else if (layEvent === 'edit') {
                  layer.msg('编辑操作');
              }else if (layEvent === 'download') {
                  layer.msg('编辑操作');
                  downloadQRcode(data);
              }
          });

      });

  };

  function updataOrderData(obj, type) {
      var url = 'http://rainingjoy.xin:9111/saveOrUpdate?dataType=' + type
      fetch(url, {
              method: 'POST',
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(obj)
          }).then((response) => response.text())
          .then((responseData) => { // 上面的转好的json
              console.log(responseData)
          })
  };

  /*查看详情*/
  function showModel(data) {
      $('.ms ul').empty();
      $('.ms .contents .qcode').empty();
      var img = '<img src="../images/ejwfdjef.png">'
      var HTML = '<li><label for="">项目名称:</label><span>' + data.proName + '</span></li>' +
          '<li><label for="">楼层号:</label><span>' + data.buildingInfo + '</span></li>' +
          '<li><label for="">构件名称:</label><span>' + data.componentName + '</span></li>' +
          '<li><label for="">尺寸:</label><span>' + data.size + '</span></li>' +
          '<li><label for="">混凝土方量:</label><span>' + data.size + '</span></li>' +
          '<li><label for="">构件重量:</label><span>' + data.weight + '</span></li>' +
          '<li><label for="">混凝土等级:</label><span>' + data.level + '</span></li>' +
          '<li><label for="">生产日期:</label><span>' + data.productDate + '</span></li>' +
          '<li><label for="">车辆信息:</label><span>' + data.carsInfo + '</span></li>' +
          '<li><label for="">区域:</label><span>' + data.location + '</span></li>' +
          '<li><label for="">入库日期:</label><span>' + data.inboundDate + '</span></li>' +
          '<li><label for="">出库日期:</label><span>' + data.outboundDate + '</span></li>' +
          '<li><label for="">构件状态:</label><span>' + data.status + '</span></li>'
      $('.ms ul').append(HTML);
      $('.ms .contents .qcode').append(img);
      layer.open({
          type: 1,
          title: data.componentName,
          skin: 'layui-layer-rim', //加上边框
          area: ['600px', '510px'], //宽高
          content: $('.ms')
      });
  }
  /*操作二维码*/
  function downloadQRcode(data) {
    var imgName = data.proName + data.componentName;
    makeCode(data);
    downloadClick(data);
    var url = productQrcodeImg(data);
    downloadClick(url,imgName);
  }
  // 生成二维码
  function makeCode(ms) {
      var opts ={
        "id":ms.id,
        "proName":ms.proName,
        "buildingInfo":ms.buildingInfo,
        "componentName":ms.componentName,
        "productDate":ms.productDate,
      }
      var data = JSON.stringify(opts)
      $("#qrcode").empty();
      $("#qrcode").qrcode({
          width: 400,
          height: 400,
          colorDark: "#000000",
          colorLight: "#ffffff",
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
  /*下载二维码*/
  function productQrcodeImg(data){
      // var opts
      var id = data.id;
      var proName = data.proName;
      var buildingInfo = data.buildingInfo;
      var componentName = data.componentName;
      var productDate = data.productDate;
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

      canvas.getContext('2d').fillText('项目:' + proName, 10, 30);
      canvas.getContext('2d').fillText('楼层号:' + buildingInfo, 220, 30);
      canvas.getContext('2d').fillText('构件:' + componentName, 10, 60);
      canvas.getContext('2d').fillText('生产日期:' + productDate, 220, 60);
      return canvas.toDataURL('image/png')
  }
  function downloadClick(url,name) {
      // var id = data.id;
      // var proName = data.proName;
      // var buildingInfo = data.buildingInfo;
      // var componentName = data.componentName;
      // var productDate = data.productDate;
      // var c = document.createElement('canvas');
      // c.width = 600;
      // c.height = 520;
      // var ctx = c.getContext("2d");
      // ctx.fillStyle = "#FFFFFF";
      // ctx.fillRect(0, 0, 600, 500);

      // // 获取base64的图片节点
      // var img = $('#qrcode canvas')[0];
      // // 构建画布
      // var canvas = document.createElement('canvas');
      // canvas.width = 440;
      // canvas.height = 520;
      // canvas.getContext('2d').font = "22px Georgia";

      // canvas.getContext('2d').drawImage(c, 0, 0);
      // canvas.getContext('2d').drawImage(img, 20, 80);

      // canvas.getContext('2d').fillText('项目:' + proName, 10, 30);
      // canvas.getContext('2d').fillText('楼层号:' + buildingInfo, 220, 30);
      // canvas.getContext('2d').fillText('构件:' + componentName, 10, 60);
      // canvas.getContext('2d').fillText('生产日期:' + productDate, 220, 60);
      // 构造url
      // url = canvas.toDataURL('image/png');
      // return url;
      var rA = $('<a>');
      // 构造a标签并模拟点击
      var downloadLink = rA.attr("href", url).attr("download", name + ".png");
      console.log(downloadLink)
      downloadLink[0].click();
  }
  /*下载图片
  function DownLoadReportIMG(imgPathURL) {
        //如果隐藏IFRAME不存在，则添加
        if (!document.getElementById(“IframeReportImg”))
        $(‘‘).appendTo(“body”);
        
        if (document.all.IframeReportImg.src != imgPathURL) {
            //加载图片
            document.all.IframeReportImg.src = imgPathURL;
        }
        else {
            //图片直接另存为
            DoSaveAsIMG();
        }
    }
    function DoSaveAsIMG() {
        if (document.all.IframeReportImg.src != “about:blank”)
        document.frames(“IframeReportImg”).document.execCommand(“SaveAs”);
    }

  */


  /*.*/