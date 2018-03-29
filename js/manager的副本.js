  /*时间戳转时间*/
  function timestampToTime(dateNum) {
      // var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var date = new Date(dateNum * 1000);
      return date.getFullYear() + "-" + fixZero(date.getMonth() + 1, 2) + "-" + fixZero(date.getDate(), 2) + " " + fixZero(date.getHours(), 2) + ":" + fixZero(date.getMinutes(), 2) + ":" + fixZero(date.getSeconds(), 2);

      function fixZero(num, length) {
          var str = "" + num;
          var len = str.length;
          var s = "";
          for (var i = length; i-- > len;) {
              s += "0";
          }
          return s + str;
      }
  }
  /*时间转时间戳*/
  function timeToTimestamp(time) {
      var date = new Date(time);
      var time1 = date.getTime(); //精确到毫秒
      var time2 = date.valueOf(); //精确到毫秒
      var time3 = Date.parse(date); //精确到秒
      return time3 * 0.001;
  }
  /*是否是时间*/
  function isDate(str) {
      var reg = /^(\d+)-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
      var r = str.match(reg);
      if (r == null) return false;
      r[2] = r[2] - 1;
      var d = new Date(r[1], r[2], r[3], r[4], r[5], r[6]);
      if (d.getFullYear() != r[1]) return false;
      if (d.getMonth() != r[2]) return false;
      if (d.getDate() != r[3]) return false;
      if (d.getHours() != r[4]) return false;
      if (d.getMinutes() != r[5]) return false;
      if (d.getSeconds() != r[6]) return false;
      return true;
  }
  var startTime = 0;
  var endTime = 0;
  $(function() {
      var scope = getSession("scope");
      if (scope == "1") {
          $("#accountName").text("超级管理员")
          // $(".components dd[data-type=admin]").show();
      } else if (scope == "2") {
          $("#accountName").text("管理员")
          $(".components dd[data-type=admin]").remove();

      }
      $(".addNewProduct").show();
      var searchObj = undefined;
      judgeIsLogin();
      loadDataToType("add");
      $(".components dd").click(function(e) {
          var dataType = $(this).attr("data-type");
          $("#selectMoreTwoCode").hide();
          $(".tab-header h2").html($(".components dd[data-type=" + dataType + "]").find("a").text());
          startTime = 0;
          endTime = 0;
          loadDataToType(dataType);
          // console.log(dataType);
      })
      layui.use(['form', 'layedit', 'laydate'], function() {
          function renderData() {
              laydate.render({
                  elem: '#beginDate', //指定元素
                  type: 'datetime',
                  // zIndex: 99999999,
                  calendar: true,
                  done: function(value, date, endDate) { //监听日期被切换
                      var dataNum = timeToTimestamp(value)
                      startTime = dataNum;
                      if ((endTime != 0) && (startTime > endTime)) {
                          layer.open({
                              zIndex: 99999999,
                              title: '提示',
                              content: '开始时间不能超过结束时间！'
                          });

                      }
                  }
              });
              laydate.render({
                  elem: '#offDate', //指定元素
                  type: 'datetime',
                  done: function(value, date, endDate) { //监听日期被切换
                      var dataNum = timeToTimestamp(value)
                      endTime = dataNum;
                      if ((startTime != 0) && (startTime > endTime)) {
                          layer.open({
                              zIndex: 99999999,
                              title: '提示',
                              content: '结束时间不能小于开始时间！'
                          });

                      }
                  }
              });
              laydate.render({
                  elem: '#outboundCarsBeginDate', //指定元素
                  type: 'datetime',
                  done: function(value, date, endDate) { //监听日期被切换
                      var dataNum = timeToTimestamp(value)
                      startTime = dataNum;
                      if ((endTime != 0) && (startTime > endTime)) {
                          layer.open({
                              zIndex: 99999999,
                              title: '提示',
                              content: '开始时间不能超过结束时间！'
                          });

                      }
                  }
              })
              laydate.render({
                  elem: '#outboundCarsOffDate', //指定元素
                  type: 'datetime',
                  // value: new Date(),
                  zIndex: 99999999,
                  done: function(value, date, endDate) { //监听日期被切换
                      var dataNum = timeToTimestamp(value)
                      endTime = dataNum;
                      if ((startTime != 0) && (startTime > endTime)) {
                          layer.open({
                              zIndex: 99999999,
                              title: '提示',
                              content: '结束时间不能小于开始时间！'
                          });

                      }
                  }
              });
              laydate.render({
                  elem: '#inboundCarsBeginDate', //指定元素
                  type: 'datetime',
                  // value: new Date(),
                  zIndex: 99999999,
                  done: function(value, date, endDate) { //监听日期被切换
                      var dataNum = timeToTimestamp(value)
                      startTime = dataNum;
                      if ((endTime != 0) && (startTime > endTime)) {
                          layer.open({
                              zIndex: 99999999,
                              title: '提示',
                              content: '开始时间不能超过结束时间！'
                          });

                      }
                  }
              });
              laydate.render({
                  elem: '#inboundCarsOffDate', //指定元素
                  type: 'datetime',
                  // value: new Date(),
                  zIndex: 99999999,
                  done: function(value, date, endDate) { //监听日期被切换
                      var dataNum = timeToTimestamp(value)
                      endTime = dataNum;
                      if ((startTime != 0) && (startTime > endTime)) {
                          layer.open({
                              zIndex: 99999999,
                              title: '提示',
                              content: '结束时间不能小于开始时间！'
                          });

                      }
                  }
              });
          }
          var form = layui.form,
              layer = layui.layer,
              layedit = layui.layedit,
              laydate = layui.laydate;
          renderData();
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
              var string = $(".searchData").val().trim();
              var searchObj = {};
              // var searchString = $(".searchData").val().trim();
              // searchObj = {
              //     type: data.field.row,
              //     value: string
              // }
              if (startTime == 0) {
                  startTime = undefined;
              } else if (startTime && !isDate(String(startTime))) {
                  startTime = timestampToTime(startTime);
              } else {
                  startTime = $("#beginDate").val();
              }
              if (endTime == 0) {
                  endTime = undefined;
              } else if (endTime && !isDate(String(endTime))) {
                  endTime = timestampToTime(endTime);
              } else {
                  endTime = $("#offDate").val();
              }
              // if (startTime == 0 || !isDate(startTime)) {
              //     startTime = undefined;
              // } else {
              //     startTime = timestampToTime(startTime);
              // }
              // if (endTime == 0 || !isDate(endTime)) {
              //     endTime = undefined;
              // } else {
              //     endTime = timestampToTime(endTime);
              // }
              // endTime = timestampToTime(endTime);
              switch (type) {
                  case "inbound":
                      searchObj[data.field.row] = string;
                      // searchObj[]
                      break;
                  case "outbound":
                      searchObj[data.field.row] = string;
                      break;
                  case "inboundCars":
                      startTime = $("#inboundCarsBeginDate").val();
                      endTime = $("#inboundCarsOffDate").val();
                      string = $(".searchData[name=" + type + "]").val().trim();
                      (string != "") && (searchObj[data.field.row] = string);
                      searchObj["beginInboundDate"] = startTime;
                      searchObj["endInboundDate"] = endTime;

                      // searchObj["status"] = "inbound";
                      break;
                  case "outboundCars":
                      startTime = $("#outboundCarsBeginDate").val();
                      endTime = $("#outboundCarsOffDate").val();
                      string = $(".searchData[name=" + type + "]").val().trim();
                      (string != "") && (searchObj[data.field.row] = string);
                      searchObj["beginOutboundDate"] = startTime;
                      searchObj["endOutboundDate"] = endTime;
                      // searchObj["status"] = "outbound";
                      break;
                  case "adminlog":
                      startTime = $("#beginDate").val();
                      endTime = $("#offDate").val();
                      string = $(".searchData[name=proName]").val().trim();
                      (string != "") && (searchObj["proName"] = string);
                      searchObj["beginDate"] = startTime;
                      searchObj["endDate"] = endTime;
                      // searchObj["status"] = type;
                      break;
                  case "inboundlog":
                      startTime = $("#beginDate").val();
                      endTime = $("#offDate").val();
                      string = $(".searchData[name=proName]").val().trim();
                      (string != "") && (searchObj["proName"] = string);
                      searchObj["beginDate"] = startTime;
                      searchObj["endDate"] = endTime;
                      // searchObj["status"] = type;
                      break;
                  case "outboundlog":
                      startTime = $("#beginDate").val();
                      endTime = $("#offDate").val();
                      string = $(".searchData[name=proName]").val().trim();
                      (string != "") && (searchObj["proName"] = string);
                      searchObj["beginDate"] = startTime;
                      searchObj["endDate"] = endTime;
                      // searchObj["status"] = type;
                      break;
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
      // $('.selectMore').on('click', function() {
      //     var type = $(this).data('type');
      //     active[type] ? active[type].call(this) : '';
      // });



  })
  /*刷新数据*/
  function refreshData(type) {
      var t = type;
      if (t == "inbound") {
          t = "pc";
      }
      loadDataToType(t);
  }
  /*加载数据*/
  function loadDataToType(type, searchObj, status) {
      var loadingLayerIndex = 0;
      $("#selectData").empty();
      var token = getSession("token");
      var scope = getSession("scope");
      // var componentsSelect = '<option value="proName">项目名称</option>' +
      //     '<option value="buildingInfo">楼层号</option>' +
      //     '<option value="componentName">构件名称</option>';
      var componentsSelect = '<option value="company">公司名</option>' +
          '<option value="proName">项目名称</option>' +
          '<option value="componentName">构件名称</option>';
      var inboundCarsSelect = '<option value="inboundCars">入库车辆</option>';
      var outboundCarsSelect = '<option value="outboundCars">出库车辆</option>';
      // www.zjgymzg.com/search
      var URL = "http://www.zjgymzg.com/searchComponents";
      // var outboundCarsSelect = '<option value="outboundCars">出库车辆</option>';
      var opt = {
          "token": token,
          "status": status
      }
      console.log(type)
      switch (type) {
          case "add":
          case "pc":
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
              opt.status = undefined;
              if (!!!searchObj) {
                  opt["inboundCars"] = ""
              }
              // searchObj = { type: type, value: searchObj }
              break;
          case "outboundCars":
          case "outbound":
              if (!!!searchObj) {
                  opt["inboundCars"] = ""
              }
              // $(".select").show();
              // $(".addNewProduct").hide();
              // $(".addAccount").hide();
              opt.status = "outbound";
              // searchObj = { type: "outboundCars", value: "" }
              break;
          case "admin":
              delete opt.status;
              opt["type"] = "admin";
              break;
          case "operator":
              delete opt.status;
              opt["type"] = type;
              break;
              // case "adminlog":
              // case "inboundlog":
              // case "outboundlog":
              // case "accountlog":
              //     opt["type"] = "adminlog";
              //     break;
              // case "inboundlog":
              //     opt["type"] = "inboundlog";
              //     break;
          default:
              opt["type"] = type;
              break;
      }
      $(".select").hide();
      switch (type) {
          case "pc":
          case "add":
          case "update":
          case "inbound":
              $(".select.inboundSearch").css("display", "flex");
              $(".addNewProduct").show();
              $(".addAccount").hide();
              $("#selectData").append(componentsSelect);
              $(".tab-header .components").show();
              $(".tab-header .outbound").hide();
              break;
          case "outbound":
              $(".select.inboundSearch").css("display", "flex");
              // $(".select").show();
              $(".addNewProduct").hide();
              $(".addAccount").hide();
              $("#selectData").append(componentsSelect);
              $(".tab-header .components").hide();
              $(".tab-header .outbound").show();
              break;
          case "inboundCars":
              $(".select.inboundCarsSearch").css("display", "flex");
              // $(".select").show();
              $(".addNewProduct").hide();
              $(".addAccount").hide();
              $("#selectData").append(inboundCarsSelect)
              $(".tab-header .components").hide();
              $(".tab-header .outbound").hide();
              break;
          case "outboundCars":
              // $(".select").show();
              $(".select.outboundCarsSearch").css("display", "flex");
              $(".addNewProduct").hide();
              $(".addAccount").hide();
              $("#selectData").append(outboundCarsSelect)
              $(".tab-header .components").hide();
              $(".tab-header .outbound").hide();
              break;
          case "admin":
          case "operator":
              // $(".select").hide();
              $(".addAccount").show();
              $(".addNewProduct").hide();
              $(".tab-header .components").hide();
              $(".tab-header .outbound").hide();
              break;
          case "adminlog":
          case "inboundlog":
          case "outboundlog":
          case "accountlog":
              if ((["inboundlog", "outboundlog", "adminlog"]).indexOf(type) != -1) {
                  $(".select.logSearch").css("display", "flex");
              }
              // $(".select").hide();
              $(".addNewProduct").hide();
              $(".addAccount").hide();
              $(".tab-header .components").hide();
              $(".tab-header .outbound").hide();
              break;
      }
      layui.use('form', function() {
          var form = layui.form;
          form.render();
          layer = layui.layer,
              loadingLayerIndex = layer.load(0, { shade: 0.3 });
      });
      // form.render();
      // var URL = "http://www.zjgymzg.com/getList";
      switch (type) {
          case "add":
          case "update":
          case "outbound":
          case "inboundCars":
          case "outboundCars":
              URL = "http://www.zjgymzg.com/searchComponents"
              // URL = "http://www.zjgymzg.com/getComponents"
              break;
          case "admin":
          case "operator":
              URL = "http://www.zjgymzg.com/getCustomers"
              // URL = "http://www.zjgymzg.com/getCustomers"
              break;
          case "adminlog":
          case "inboundlog":
          case "outboundlog":
          case "accountlog":
              URL = "http://www.zjgymzg.com/searchLog"
              break;

      }
      // var URL = "http://www.zjgymzg.com/getList"

      if (!!searchObj) {
          for (x in searchObj) {
              opt[x] = searchObj[x];
          }
          // opt[searchObj.type] = searchObj.value;
          // // Object.assign(opt,{})
      }

      $.ajax({
          "url": URL,
          "type": "post",
          contentType: "application/json",
          "data": JSON.stringify(opt)
      }).done(function(data) {
          layer.close(loadingLayerIndex);
          renderOrderTable(data.list, type)
      }).fail(function(e) {
          layer.close(loadingLayerIndex);
          console.log(e)
          layer.msg("网络异常，请稍后再试！")
      });

  }

  function renderOrderTable(data, type) {
      var options = [ //标题栏
          { title: 'checkbox', type: "checkbox", width: 80, fixed: 'left', },
          { title: '序号', templet: '#indexTpl', width: 80, fixed: 'left', align: "center" },
          {
              field: 'id',
              title: '产品ID',
              width: 80,
              sort: true,
              align: "center",
              templet: "#idTpl"
          },
          {
              field: 'company',
              title: '公司名',
              align: "center",
              event: 'company',
              templet: "#companyTpl"
          },
          {
              field: 'proName',
              title: '项目名称',
              align: "center",
              event: 'proName',
              templet: "#proNameTpl"
          },
          // {
          //     field: 'plant',
          //     title: '厂区',
          //     align: "center",
          //     event: "plant",
          //     templet: "#plantTpl"
          // },
          {
              field: 'buildingNum',
              title: '楼号',
              align: "center",
              event: "buildingNum",
              templet: "#buildingNumTpl"
          },
          {
              field: 'floorNum',
              title: '层号',
              align: "center",
              event: "floorNum",
              templet: "#floorNumTpl"
          },
          {
              field: 'category',
              title: '构件类别',
              align: "center",
              event: 'category',
              templet: "#categoryTpl"
          },
          {
              field: 'componentName',
              title: '构件名称',
              align: "center",
              event: 'componentName',
              templet: "#componentNameTpl"
          },
          {
              field: 'size',
              title: '尺寸',
              align: "center",
              event: 'size',
              templet: "#sizeTpl"
          },
          {
              field: 'volume',
              title: '混凝土方量',
              align: "center",
              event: 'volume',
              templet: '#volumeTpl'
          },
          {
              field: 'weight',
              title: '构件重量',
              align: "center",
              event: 'weight',
              templet: '#weightTpl'
          },
          {
              field: 'level',
              title: '混凝土等级',
              align: "center",
              event: 'level',
              templet: '#levelTpl'
          },
          {
              field: 'productDate',
              title: '生产日期',
              align: "center",
              event: 'productDate',
              templet: 'productDateTpl'
          },
          {
              field: 'inboundDate',
              title: '入库日期',
              width: 160,
              align: "center",
              templet: '#inboundDateTpl'
          },
          {
              field: 'outboundDate',
              title: '出库日期',
              width: 160,
              align: "center",
              templet: '#outboundDateTpl'
          },
          {
              field: 'location',
              title: '区域',
              align: "center",
              templet: "#locationTpl"
          },
          {
              field: 'inboundCars',
              title: '入库车辆',
              align: "center",
              templet: "#inboundCarsTpl"
          },
          {
              field: 'outboundCars',
              title: '出库车辆',
              align: "center",
              templet: "#outboundCarsTpl"
          },
          // { field: 'status', title: '状态', align: "center", templet: '#reasonTpl' },
          // { field: 'picPath', title: '二维码地址', align: "center" },
          { field: 'right', title: '操作', width: 150, toolbar: "#components", align: "center", fixed: 'right' }
      ]
      switch (type) {
          case "outbound":
              options = [ //标题栏
                  { title: '序号', templet: '#indexTpl', width: 80, fixed: 'left', align: "center" },
                  { field: 'id', title: '产品ID', width: 80, align: "center", },
                  { field: 'company', title: '公司名称', align: "center" },
                  { field: 'proName', title: '项目名称', align: "center" },
                  { field: 'buildingNum', title: '楼号', align: "center" },
                  { field: 'floorNum', title: '层号', align: "center" },
                  { field: 'category', title: '构件类别', align: "center" },
                  { field: 'componentName', title: '构件名称', align: "center" },
                  { field: 'size', title: '尺寸', align: "center", event: 'size' },
                  { field: 'volume', title: '混凝土方量', align: "center" },
                  { field: 'weight', title: '构件重量', align: "center" },
                  { field: 'level', title: '混凝土等级', align: "center" },
                  { field: 'productDate', title: '生产日期', align: "center" },
                  { field: 'inboundDate', title: '入库日期', width: 160, align: "center" },
                  { field: 'outboundDate', title: '出库日期', width: 160, align: "center" },
                  { field: 'location', title: '区域', align: "center" },
                  { field: 'inboundCars', title: '入库车辆', align: "center" },
                  { field: 'outboundCars', title: '出库车辆', align: "center" },
                  // { field: 'status', title: '状态', align: "center" },
              ]
              break;
          case "inboundCars":
              options = [ //标题栏
                  { title: '序号', templet: '#indexTpl', width: 80, fixed: 'left', align: "center" },
                  { field: 'company', title: '公司名称', align: "center" },
                  { field: 'inboundCars', title: '入库车辆', align: "center" },
                  // { field: 'id', title: '产品ID', width: 80, sort: true, align: "center", },
                  { field: 'proName', title: '项目名称', align: "center" },
                  { field: 'buildingNum', title: '楼号', align: "center" },
                  { field: 'floorNum', title: '层号', align: "center" },
                  { field: 'category', title: '构件类别', align: "center" },
                  { field: 'componentName', title: '构件名称', align: "center" },
                  { field: 'size', title: '尺寸', align: "center" },
                  { field: 'volume', title: '混凝土方量', align: "center" },
                  { field: 'weight', title: '构件重量', align: "center" },
                  { field: 'level', title: '混凝土等级', align: "center" },
                  { field: 'productDate', title: '生产日期', align: "center" },
                  { field: 'inboundDate', title: '入库日期', width: 160, align: "center" },
                  // { field: 'outboundDate', title: '出库日期', sort: true, align: "center" },
                  { field: 'location', title: '区域', align: "center" },

              ]
              break;
          case "outboundCars":
              options = [ //标题栏
                  { title: '序号', templet: '#indexTpl', width: 80, fixed: 'left', align: "center" },
                  { field: 'outboundCars', title: '出库车辆', align: "center" },
                  // { field: 'id', title: '产品ID', width: 80, sort: true, align: "center", },
                  { field: 'proName', title: '项目名称', align: "center" },
                  { field: 'buildingNum', title: '楼号', align: "center" },
                  { field: 'floorNum', title: '层号', align: "center" },
                  { field: 'category', title: '构件类别', align: "center" },
                  { field: 'componentName', title: '构件名称', align: "center" },
                  { field: 'size', title: '尺寸', align: "center" },
                  { field: 'volume', title: '混凝土方量', align: "center" },
                  { field: 'weight', title: '构件重量', align: "center" },
                  { field: 'level', title: '混凝土等级', align: "center" },
                  { field: 'productDate', title: '生产日期', align: "center" },
                  // { field: 'inboundDate', title: '入库日期', sort: true, align: "center" },
                  { field: 'outboundDate', title: '出库日期', width: 160, align: "center" },
                  { field: 'location', title: '区域', align: "center" },
                  // { field: 'inboundCars', title: '入库车辆', align: "center" },

                  // { field: 'status', title: '状态', align: "center" },
                  // { field: 'picPath', title: '二维码地址', align: "center" },
                  // { field: 'right', title: '操作', width: 150, toolbar: "#components", align: "center", fixed: 'right' }
              ]
              break;
          case "admin":
          case "operator":
              options = [ //标题栏
                  { title: '序号', templet: '#indexTpl', width: 80, fixed: 'left', align: "center" },
                  // { field: 'id', title: '账户ID', sort: true, align: "center" },
                  { field: 'phone', title: '用户名', align: "center" },
                  { field: 'password', title: '密码', align: "center", event: 'password' },
                  { field: 'scope', title: '权限', align: "center", event: 'scope', templet: '#scopeTpl' },
                  { field: 'date', title: '日期', width: 160, align: "center" },
                  { field: 'operator', title: '操作人', align: "center" },
              ]
              break;
          case "adminlog":
          case "inboundlog":
          case "outboundlog":
          case "accountlog":
              options = [ //标题栏
                  { title: '序号', templet: '#indexTpl', width: 80, fixed: 'left', align: "center" },

                  // { field: 'id', title: '日志ID', width: 120, sort: true, align: "center", },
                  { field: 'message', title: '详情', align: "left" },
                  { field: 'date', title: '日期', width: 160, align: "center" },
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
              id: 'testReload2',
              data: data,
              even: true,
              page: true, //是否显示分页
              limits: [50, 100, 200],
              limit: 50, //每页默认显示的数量
              done: function(res, curr, count) {
                  var $ = layui.$;
                  // $("[data-field='id']").css('display', 'none');
                  // $("[data-field='status']").css('display', 'none');
              }
          });
          var $ = layui.$,
              active = {
                  getCheckData: function() { //获取选中数据
                      var checkStatus = table.checkStatus('testReload2'),
                          data = checkStatus.data;
                      console.log(data.length);
                      console.log(data);
                      data.forEach(function(item) {
                          downloadQRcode(item)
                      })
                      // downloadQRcode(data)
                      // layer.alert(JSON.stringify(data));
                  }
              };
          table.on('checkbox(quote)', function(obj) {
              // console.log(obj.checked); //当前是否选中状态
              // if (obj.checked) {}
              // console.log(obj.data); //选中行的相关数据
              // console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one
              if (obj.checked) {
                  $(".selectMore").show();
              }
              var length = $("table input[type=checkbox]:checked").length;
              if (length == 0) {
                  $(".selectMore").hide();
              }
          });
          $('.selectMore').on('click', function() {
              var type = $(this).data('type');
              active[type] ? active[type].call(this) : '';
          });

          $('#demo .layui-btn.search_btn').on('click', function() {
              var type = $(this).data('type');
              active[type] ? active[type].call(this) : '';
          });
          // var $ = layui.$,
          //     active = {
          //         getCheckData: function() { //获取选中数据
          //             var checkStatus = table.checkStatus('idTest'),
          //                 data = checkStatus.data;
          //             layer.alert(JSON.stringify(data));
          //         },
          //         getCheckLength: function() { //获取选中数目
          //             var checkStatus = table.checkStatus('idTest'),
          //                 data = checkStatus.data;
          //             layer.msg('选中了：' + data.length + ' 个');
          //         },
          //         isAll: function() { //验证是否全选
          //             var checkStatus = table.checkStatus('idTest');
          //             layer.msg(checkStatus.isAll ? '全选' : '未全选')
          //         }
          //     };
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
              var type = $(".components dd.layui-this").attr("data-type");
              if (!(["inbound", "admin", "operator"].indexOf(type) != -1)) {
                  return;
              }
              switch (layEvent) {
                  case "company":
                      editValue("", obj.event, "公司名", obj)
                      break;
                  case "proName":
                      editValue("", obj.event, "项目名", obj)
                      break;
                  case "buildingInfo":
                      editValue("", obj.event, "楼层号", obj)
                      break;
                  case "buildingNum":
                      editValue("", obj.event, "楼号", obj)
                      break;
                  case "floorNum":
                      editValue("", obj.event, "层号", obj)
                      break;
                  case "category":
                      editValue("", obj.event, "构件类别", obj)
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
                  case "scope":
                      editValue("", obj.event, "账号权限", obj)
                      break;
                  case "password":
                      editValue("", obj.event, "账号密码", obj)
                      break;
              }
          });
      });

  };

  function editValue(type, name, title, obj) {

      // if (obj.event == "scope") {
      //     if (obj.data[name] != "入库员" || obj.data[name] != "出库员" || obj.data[name] != "操作员") {
      //         layer.confirm('权限设置错误，请重新设置！', {
      //             btn: ['确定'] //按钮
      //         })
      //         return;
      //     }
      //     if (obj.data[name] == "入库员") { obj.data[name] = "3" } else if (obj.data[name] == "出库员") { obj.data[name] = "4" } else if (obj.data[name] == "操作员") { obj.data[name] = "5" }

      // }
      var scope = getSession("scope");
      var option = obj;
      var opt = {};
      if (obj.event == "scope") {
          if (obj.data[name] == "1") { obj.data[name] = "超级管理员" } else if (obj.data[name] == "2") { obj.data[name] = "管理员" } else if (obj.data[name] == "3") { obj.data[name] = "入库员" } else if (obj.data[name] == "4") { obj.data[name] = "出库员" } else if (obj.data[name] == "5") { obj.data[name] = "操作员" }
      }
      // if (obj.data[name] == "1") { obj.data[name] = "超级管理员" } else if (obj.data[name] == "2") { obj.data[name] = "管理员" } else if (obj.data[name] == "3") { obj.data[name] = "入库员" } else if (obj.data[name] == "4") { obj.data[name] = "出库员" } else if (obj.data[name] == "5") { obj.data[name] = "操作员" }

      layer.prompt({
          formType: 2,
          title: "修改" + title,
          value: obj.data[name]
      }, function(value, index) {
          layer.close(index);
          if (scope == "2" && value == "管理员") {
              layer.confirm('权限设置错误，请重新设置！', {
                  btn: ['确定'] //按钮
              })
              return;
          }
          switch (obj.event) {
              case "company":
                  if (!(["永茂住工", "远大住工", "宝岳住工", "君大住工"].indexOf(value) != -1)) {
                      layer.confirm('公司名设置错误，请重新设置！', {
                          btn: ['确定'] //按钮
                      })
                      return;
                  } else {
                      obj.data[name] = value;
                      option[name] = value;
                      opt[name] = value;
                  }
                  break;
              case "buildingNum":
                  if (!(["1号楼", "2号楼", "3号楼", "4号楼", "5号楼", "6号楼", "7号楼", "8号楼", "9号楼", "10号楼", "11号楼", "12号楼", "13号楼", "14号楼", "15号楼", "16号楼", "17号楼", "18号楼", "19号楼", "20号楼"].indexOf(value) != -1)) {
                      layer.confirm('楼号设置错误，请重新设置！', {
                          btn: ['确定'] //按钮
                      })
                      return;
                  } else {
                      obj.data[name] = value;
                      option[name] = value;
                      opt[name] = value;
                  }
                  break;
              case "floorNum":
                  if (!(["1F", "2F", "3F", "4F", "5F", "6F", "7F", "8F", "9F", "10F", "11F", "12F", "13F", "14F", "15F", "16F", "17F", "18F", "19F", "20F"].indexOf(value) != -1)) {
                      layer.confirm('层号设置错误，请重新设置！', {
                          btn: ['确定'] //按钮
                      })
                      return;
                  } else {
                      obj.data[name] = value;
                      option[name] = value;
                      opt[name] = value;
                  }
                  break;
              case "category":
                  if (!(["墙", "板", "柱", "楼梯", "阳台", "凸窗"].indexOf(value) != -1)) {
                      layer.confirm('构件类型设置错误，请重新设置！', {
                          btn: ['确定'] //按钮
                      })
                      return;
                  } else {
                      obj.data[name] = value;
                      option[name] = value;
                      opt[name] = value;
                  }
                  break;
              case "level":
                  if (!(["C30", "C35", "C40", "C45"].indexOf(value) != -1)) {
                      layer.confirm('混凝土等级设置错误，请重新设置！', {
                          btn: ['确定'] //按钮
                      })
                      return;
                  } else {
                      obj.data[name] = value;
                      option[name] = value;
                      opt[name] = value;
                  }
                  break;
              case "scope":
                  if (!(["入库员", "出库员", "操作员", "管理员"].indexOf(value) != -1)) {
                      layer.confirm('权限设置错误，请重新设置！', {
                          btn: ['确定'] //按钮
                      })
                      return;
                  }
                  if (value == "入库员") {
                      obj.data[name] = "3";
                      opt["type"] = "operator";
                      opt[name] = "3";
                  } else if (value == "出库员") {
                      obj.data[name] = "4";
                      opt["type"] = "operator";
                      opt[name] = "4";
                  } else if (value == "操作员") {
                      opt["type"] = "operator";
                      obj.data[name] = "5";
                      opt[name] = "5";
                  } else if (value == "管理员") {
                      opt["type"] = "admin";
                      obj.data[name] = "2";
                      opt[name] = "2";
                  }
                  break;
              default:
                  obj.data[name] = value;
                  option[name] = value;
                  opt[name] = value;
                  break;
          }
          option["id"] = obj.data.id;
          opt["id"] = obj.data.id;
          updataOrderData(option, opt)
      });
  }

  function updataOrderData(obj, opt) {
      // var datas = obj.data;
      var datas = obj;
      var url = "http://www.zjgymzg.com/saveOrUpdateComponent";
      var type = $(".components dd.layui-this").attr("data-type");
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
      switch (type) {
          case "inbound":
              url = "http://www.zjgymzg.com/saveOrUpdateComponent";
              break;
          case "admin":
          case "operator":
              url = "http://www.zjgymzg.com/saveOrUpdateCustomer";
              break;
              // case "adminlog":
              // case "inboundlog":
              // case "outboundlog":
              // case "accountlog":
              //     URL = "http://www.zjgymzg.com/getLogs"
              //     break;

      }
      if (obj.event == "scope") {
          url = "http://www.zjgymzg.com/setScope";
      }

      if (obj.event == "password") {
          url = "http://www.zjgymzg.com/saveOrUpdateCustomer";
          Object.assign(opt, { "token": token, "type": type });

      }
      Object.assign(opt, { "token": token, "status": "update" });
      if (obj.event == "scope" || obj.event == "password") {
          delete opt.status
      }
      // delete datas.LAY_TABLE_INDEX
      // http://www.zjgymzg.com/saveOrUpdateComponent
      // var url = 'http://www.zjgymzg.com:9111/saveOrUpdate?dataType=' + type
      // return;
      $.ajax({
          type: "post",
          url: url,
          contentType: "application/json",
          dataType: "json",
          data: JSON.stringify(opt),
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
                  // $(".refresh_btn").click();
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
  };

  /*查看详情*/
  function showModel(data) {
      $('.ms ul').empty();
      $('.ms .contents .qcode img').removeAttr("src");
      var HTML = '<li><label for="">公司名称:</label><span>' + data.company + '</span></li>' +
          '<li><label for="">项目名称:</label><span>' + data.proName + '</span></li>' +
          '<li><label for="">楼层号:</label><span>' + data.buildingNum + data.floorNum + '</span></li>' +
          '<li><label for="">构件名称:</label><span>' + data.category + '</span></li>' +
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
          area: ['700px', '640px'], //宽高
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
          "company": ms.company,
          "proName": ms.proName,
          "buildingNum": ms.buildingNum,
          "floorNum": ms.floorNum,
          "category": ms.category,
          "componentName": ms.componentName,
          "level": ms.level,
          "weight": ms.weight,
          "productDate": ms.productDate,
      }
      var data = JSON.stringify(opts)
      $("#qrcode").empty();
      $("#qrcode").qrcode({
          width: 200,
          height: 200,
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
      var company = data.company;
      var proName = data.proName;
      var buildingInfo = data.buildingNum + data.floorNum;
      var componentName = data.componentName;
      var level = data.level;
      var weight = data.weight;
      var productDate = data.productDate;
      var c = document.createElement('canvas');
      c.width = 720;
      c.height = 520;
      var ctx = c.getContext("2d");
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, 640, 520);

      // 获取base64的图片节点
      var img = $('#qrcode canvas')[0];
      // 构建画布
      var canvas = document.createElement('canvas');
      canvas.width = 620;
      canvas.height = 520;
      canvas.getContext('2d').font = "40px Microsoft Yahei";

      canvas.getContext('2d').drawImage(c, 0, 0);
      canvas.getContext('2d').drawImage(img, 60, 250);
      canvas.getContext('2d').textAlign = "left";
      canvas.getContext('2d').fillText(company, 60, 110);
      canvas.getContext('2d').fillText(proName, 60, 170);
      canvas.getContext('2d').fillText(buildingInfo, 60, 230);

      canvas.getContext('2d').textAlign = "center";
      canvas.getContext('2d').font = "70px Microsoft Yahei";
      canvas.getContext('2d').fillText(componentName, 420, 190);

      canvas.getContext('2d').font = "30px Microsoft Yahei";
      canvas.getContext('2d').textAlign = "left";

      canvas.getContext('2d').fillText('等级: ' + level, 305, 280);
      canvas.getContext('2d').fillText('重量: ' + weight, 305, 340);
      canvas.getContext('2d').font = "30px Microsoft Yahei";
      canvas.getContext('2d').fillText('生产日期: ', 305, 390);
      canvas.getContext('2d').font = "30px Microsoft Yahei";
      canvas.getContext('2d').fillText(productDate, 305, 440);
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