  $(function() {
      $(".addNewProduct").show();
      var searchObj = undefined;
      judgeIsLogin();
      loadDataToType("add");
      $(".components dd").click(function(e) {
          var dataType = $(this).attr("data-type");
          $(".tab-header h2").html($(".components dd[data-type=" + dataType + "]").find("a").text());

          loadDataToType(dataType);
          console.log(dataType);
      })
      layui.use('form', function() {
          var form = layui.form;
          form.on('select(search_type)', function(data) {
              var type = $(".components dd.layui-this").attr("data-type");
              if (data.value == "all") {
                  $(".searchData").val("");
                  loadDataToType(type);
              }
              console.log(data.elem); //得到select原始DOM对象
              console.log(data.value); //得到被选中的值
              console.log(data.othis); //得到美化后的DOM对象
          });
          form.on('submit(search_btn)', function(data) {
              var type = $(".components dd.layui-this").attr("data-type");
              var string = data.field.dataString;
              searchObj = {
                  type: data.field.row,
                  value: string
              }
              // var string = data.field.row + '=' + data.field.dataString;
              // if (data.field.row == "all") {
              //     string = undefined
              // }
              loadDataToType(type, searchObj);
              return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
          });
      });
      $(".refresh_btn").click(function() {
          var type = $(".components dd.layui-this").attr("data-type");
          refreshData(type);
      })



  })
  /*刷新数据*/
  function refreshData(type) {
      loadDataToType(type);
  }
  // $(".components dd").click(function(e) {
  //     var dataType = $(this).attr("data-type");
  //     loadDataToType(dataType);
  //     console.log(dataType);
  // })
  /*更新数据*/
  function loadDataToType(type, searchObj, status) {
      $("#selectData").empty();
      var token = getSession("token");
      var scope = getSession("scope");
      var componentsSelect = '<option value="proName">项目名称</option>' +
          '<option value="buildingInfo">楼层号</option>' +
          '<option value="componentName">构件名称</option>';
      var inboundCarsSelect = '<option value="inboundCars">入库车辆</option>';
      var outboundCarsSelect = '<option value="outboundCars">出库车辆</option>';
      // var outboundCarsSelect = '<option value="outboundCars">出库车辆</option>';
      var opt = {
          "token": token,
          "status": status
      }
      console.log(type)
      switch (type) {
          case "add":
          case "update":
          case "inbound":
              opt.status = undefined;
              // $(".select").show();
              // $(".addNewProduct").show();
              // $(".addAccount").hide();
              break
          case "inboundCars":
              // $(".select").show();
              // $(".addNewProduct").hide();
              // $(".addAccount").hide();
              opt.status = "inbound";
              searchObj = { type: type, value: "" }
              break;
          case "outboundCars":
          case "outbound":
              // $(".select").show();
              // $(".addNewProduct").hide();
              // $(".addAccount").hide();
              opt.status = "outbound";
              searchObj = { type: "outboundCars", value: "" }
              break;
          case "admin":
          case "operator":
              delete opt.status;
              opt["scope"] = scope;
              opt["scope"] = scope;
              opt["type"] = type;
              // $(".select").hide();
              // $(".addAccount").show();
              // $(".addNewProduct").hide();
              break;
              // var scope = getSession("scope")
      }
      switch (type) {
          case "add":
          case "update":
          case "inbound":
              $(".select").show();
              $(".addNewProduct").show();
              $(".addAccount").hide();
              $("#selectData").append(componentsSelect);
              break;
          case "outbound":
              $(".select").show();
              $(".addNewProduct").hide();
              $(".addAccount").hide();
              $("#selectData").append(componentsSelect);
              break;
          case "inboundCars":
              $(".select").show();
              $(".addNewProduct").hide();
              $(".addAccount").hide();
              $("#selectData").append(inboundCarsSelect)
              break;
          case "outboundCars":
              $(".select").show();
              $(".addNewProduct").hide();
              $(".addAccount").hide();
              $("#selectData").append(outboundCarsSelect)
              break;
          case "admin":
          case "operator":
              $(".select").hide();
              $(".addAccount").show();
              $(".addNewProduct").hide();
              break;
      }
      layui.use('form', function() {
          var form = layui.form;
          form.render();

          //do something

      });
      // form.render();


      var URL = "http://ymzg.gxajl.com/getList"

      if (!!searchObj) {
          opt[searchObj.type] = searchObj.value;
          // Object.assign(opt,{})
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
      var options = [ //标题栏
          { title: '序号', templet: '#indexTpl', width: 80, fixed: 'left', align: "center" },
          { field: 'id', title: '产品ID', width: 80, sort: true, align: "center", },
          { field: 'proName', title: '项目名称', sort: true, align: "center", event: 'proName' },
          { field: 'buildingInfo', title: '楼层号', align: "center", event: 'buildingInfo' },
          { field: 'componentName', title: '构件名称', align: "center", event: 'componentName' },
          { field: 'size', title: '尺寸', align: "center", event: 'size' },
          { field: 'volume', title: '混凝土方量', sort: true, align: "center", event: 'volume' },
          { field: 'weight', title: '构件重量', sort: true, align: "center", event: 'weight' },
          { field: 'level', title: '混凝土等级', sort: true, align: "center", event: 'level' },
          { field: 'productDate', title: '生产日期', sort: true, align: "center", event: 'productDate' },
          { field: 'inboundDate', title: '入库日期', sort: true, align: "center" },
          { field: 'outboundDate', title: '出库日期', sort: true, align: "center" },
          { field: 'location', title: '区域', sort: true, align: "center" },
          { field: 'inboundCars', title: '入库车辆', align: "center" },
          { field: 'outboundCars', title: '出库车辆', align: "center" },
          { field: 'status', title: '状态', align: "center" },
          // { field: 'picPath', title: '二维码地址', align: "center" },
          { field: 'right', title: '操作', width: 150, toolbar: "#components", align: "center", fixed: 'right' }
      ]
      switch (type) {
          case "inboundCars":
              options = [ //标题栏
                  { title: '序号', templet: '#indexTpl', width: 80, fixed: 'left', align: "center" },
                  // { field: 'id', title: '产品ID', width: 80, sort: true, align: "center", },
                  { field: 'proName', title: '项目名称', sort: true, align: "center" },
                  { field: 'buildingInfo', title: '楼层号', align: "center" },
                  { field: 'componentName', title: '构件名称', align: "center" },
                  { field: 'size', title: '尺寸', align: "center" },
                  { field: 'volume', title: '混凝土方量', sort: true, align: "center" },
                  { field: 'weight', title: '构件重量', sort: true, align: "center" },
                  { field: 'level', title: '混凝土等级', sort: true, align: "center" },
                  { field: 'productDate', title: '生产日期', sort: true, align: "center" },
                  { field: 'inboundDate', title: '入库日期', sort: true, align: "center" },
                  // { field: 'outboundDate', title: '出库日期', sort: true, align: "center" },
                  { field: 'location', title: '区域', sort: true, align: "center" },
                  { field: 'inboundCars', title: '入库车辆', align: "center" },
                  // { field: 'outboundCars', title: '出库车辆', align: "center" },
                  // { field: 'status', title: '状态', align: "center" },
                  // { field: 'picPath', title: '二维码地址', align: "center" },
                  // { field: 'right', title: '操作', width: 150, toolbar: "#components", align: "center", fixed: 'right' }
              ]
              break;
          case "outboundCars":
              options = [ //标题栏
                  { title: '序号', templet: '#indexTpl', width: 80, fixed: 'left', align: "center" },
                  // { field: 'id', title: '产品ID', width: 80, sort: true, align: "center", },
                  { field: 'proName', title: '项目名称', sort: true, align: "center" },
                  { field: 'buildingInfo', title: '楼层号', align: "center" },
                  { field: 'componentName', title: '构件名称', align: "center" },
                  { field: 'size', title: '尺寸', align: "center" },
                  { field: 'volume', title: '混凝土方量', sort: true, align: "center" },
                  { field: 'weight', title: '构件重量', sort: true, align: "center" },
                  { field: 'level', title: '混凝土等级', sort: true, align: "center" },
                  { field: 'productDate', title: '生产日期', sort: true, align: "center" },
                  // { field: 'inboundDate', title: '入库日期', sort: true, align: "center" },
                  { field: 'outboundDate', title: '出库日期', sort: true, align: "center" },
                  { field: 'location', title: '区域', sort: true, align: "center" },
                  // { field: 'inboundCars', title: '入库车辆', align: "center" },
                  { field: 'outboundCars', title: '出库车辆', align: "center" },
                  // { field: 'status', title: '状态', align: "center" },
                  // { field: 'picPath', title: '二维码地址', align: "center" },
                  // { field: 'right', title: '操作', width: 150, toolbar: "#components", align: "center", fixed: 'right' }
              ]
              break;
          case "admin":
          case "operator":
              options = [ //标题栏
                  { title: '序号', templet: '#indexTpl', width: 80, fixed: 'left', align: "center" },
                  // { field: 'id', title: '产品ID', width: 80, sort: true, align: "center", },
                  { field: 'user', title: '用户名', sort: true, align: "center" },
                  { field: 'password', title: '密码', align: "center" },
                  { field: 'scope', title: '权限',toolbar: "#accountScope", align: "center", fixed: 'right' },
                  // { field: 'scopr', title: '权限', align: "center" },
                  { field: 'do', title: '操作人', align: "center" },
              ]
              break;
      }
      layui.use('table', function() {
          var table = layui.table;
          //展示已知数据
          table.render({
              elem: '#demo',
              cellMinWidth: 100,
              loading: true,
              cols: [options],
              height: 'full-200',
              id: 'testReload',
              data: data,
              even: true,
              page: true, //是否显示分页
              limits: [50, 100, 200],
              limit: 50, //每页默认显示的数量
              done: function(res, curr, count) {
                  var $ = layui.$;
                  // $("[data-field='id']").css('display', 'none');
                  $("[data-field='status']").css('display', 'none');
              }
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
          $('#demo .layui-btn.search_btn').on('click', function() {
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
          //监听单元格事件
          table.on('tool(quote)', function(obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
              var data = obj.data //获得当前行数据
                  ,
                  layEvent = obj.event; //获得 lay-event 对应的值
              if (layEvent === 'detail') {
                  // console.log(data)
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
              } else if (layEvent === 'download') {
                  layer.msg('正在下载中...');
                  downloadQRcode(data);
              }

              switch (layEvent) {
                  case "proName":
                      editValue("", obj.event, "项目名", obj)
                      break;
                  case "buildingInfo":
                      editValue("", obj.event, "楼层号", obj)
                      break;
                  case "componentName":
                      editValue("", obj.event, "构件名称", obj)
                      break;
                  case "size":
                      editValue("", obj.event, "尺寸", obj)
                      break;
                  case "volume":
                      editValue("", obj.event, "混凝土方量", obj)
                      break;
                  case "weight":
                      editValue("", obj.event, "构件重量", obj)
                      break;
                  case "level":
                      editValue("", obj.event, "混凝土等级", obj)
                      break;
                  case "productDate":
                      editValue("", obj.event, "生产日期", obj)
                      break;
              }
          });
          table.reload('testReload', {
              page: {
                  curr: 1 //重新从第 1 页开始
              }
          });
      });

  };

  function editValue(type, name, title, obj) {
      layer.prompt({
          formType: 2,
          title: "修改" + title,
          value: obj.data[name]
      }, function(value, index) {
          layer.close(index);
          obj.data[name] = value;
          var opt = {};
          opt[name] = value;
          updataOrderData(obj, opt)
      });
  }

  function updataOrderData(obj, opt) {
      var datas = obj.data;
      var token = getSession("token");
      if (datas.status == "inbound") {
          layer.confirm('该构件已入库，不可再修改！', {
              btn: ['确定'] //按钮
          })
          return;
      } else if (datas.status == "outbound") {
          layer.confirm('该构件已出库，不可再修改！', {
              btn: ['确定'] //按钮
          })
          return;
      }
      Object.assign(datas, { "token": token, "status": "update" });
      delete datas.LAY_TABLE_INDEX
      // http://ymzg.gxajl.com/saveOrUpdateComponent
      // var url = 'http://www.zjgymzg.com:9111/saveOrUpdate?dataType=' + type
      $.ajax({
          type: "post",
          url: "http://ymzg.gxajl.com/saveOrUpdateComponent",
          contentType: "application/json",
          dataType: "json",
          data: JSON.stringify(datas),
          beforeSend: function() {
              layer.msg('正在更新数据', {
                  icon: 16,
                  time: 3000000,
                  shade: [0.1, '#fff']
              });
          },
          success: function(json) {
              console.log(json)
              if (json.status == 200) {
                  layer.msg("更新成功！")
                  obj.update(opt);
              } else {
                  $("#msg").remove();
                  layer.msg(json.message)
                  return false;
              }
          }
      });
  };

  /*查看详情*/
  function showModel(data) {
      $('.ms ul').empty();
      $('.ms .contents .qcode img').removeAttr("src");
      var HTML = '<li><label for="">项目名称:</label><span>' + data.proName + '</span></li>' +
          '<li><label for="">楼层号:</label><span>' + data.buildingInfo + '</span></li>' +
          '<li><label for="">构件名称:</label><span>' + data.componentName + '</span></li>' +
          '<li><label for="">尺寸:</label><span>' + data.size + '</span></li>' +
          '<li><label for="">混凝土方量:</label><span>' + data.volume + '</span></li>' +
          '<li><label for="">构件重量:</label><span>' + data.weight + '</span></li>' +
          '<li><label for="">混凝土等级:</label><span>' + data.level + '</span></li>' +
          '<li><label for="">生产日期:</label><span>' + data.productDate + '</span></li>' +
          '<li><label for="">入库车辆:</label><span>' + data.inboundCars + '</span></li>' +
          '<li><label for="">出库车辆:</label><span>' + data.outboundCars + '</span></li>' +
          '<li><label for="">区域:</label><span>' + data.location + '</span></li>' +
          '<li><label for="">入库日期:</label><span>' + data.inboundDate + '</span></li>' +
          '<li><label for="">出库日期:</label><span>' + data.outboundDate + '</span></li>' +
          '<li><label for="">构件状态:</label><span>' + data.status + '</span></li>'
      $('.ms ul').append(HTML);
      loaderQRcodeImg(data)
      layer.open({
          type: 1,
          title: data.componentName,
          skin: 'layui-layer-rim', //加上边框
          area: ['600px', '580px'], //宽高
          content: $('.ms')
      });
  }
  /*操作二维码*/
  function downloadQRcode(data) {
      var imgName = data.proName + data.componentName;
      makeCode(data);
      // downloadClick(data);
      var url = productQrcodeImg(data);
      downloadClick(url, imgName);
  }
  // 生成二维码
  function makeCode(ms) {
      var opts = {
          "id": ms.id,
          "proName": ms.proName,
          "buildingInfo": ms.buildingInfo,
          "componentName": ms.componentName,
          "productDate": ms.productDate,
      }
      var data = JSON.stringify(opts)
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