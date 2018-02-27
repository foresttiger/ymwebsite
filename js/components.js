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
              var string = data.field.row + '=' + data.field.dataString;
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
  function loadDataToType(type, search) {

      var URL = search ? ("http://rainingjoy.xin:9111/getList?dataType=" + type + "&" + search) : ("http://rainingjoy.xin:9111/getAll?dataType=" + type)
      // var URL = "http://rainingjoy.xin:9111/getAll?dataType=" + type;
      $.ajax({
          "url": URL,
          "type": "get",
      }).done(function(data) {
          renderOrderTable(data, type)
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
                      { field: 'proName', title: '项目名称', sort: true, templet: '#cellnameTpl' },
                      { field: 'buildingInfo', title: '楼层号', align: "center" },
                      { field: 'componentName', title: '构件名称', align: "center" },
                      { field: 'size', title: '尺寸', align: "center" },
                      { field: 'volume', title: '混凝土方量',sort: true, align: "center" },
                      { field: 'weight', title: '构件重量', sort: true, align: "center" },
                      { field: 'level', title: '混凝土等级', sort: true, align: "center" },
                      { field: 'productDate', title: '生产日期', sort: true, align: "center" },
                      { field: 'inboundDate', title: '入库日期', sort: true, align: "center" },
                      { field: 'outboundDate', title: '出库日期', sort: true, align: "center" },
                      { field: 'location', title: '区域', sort: true, align: "center" },
                      { field: 'carsInfo', title: '车辆信息', align: "center" },
                      { field: 'status', title: '状态', align: "center" },
                      { field: 'picPath', title: '二维码地址', align: "center" },
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
                  layer.msg('查看操作');
              } else if (layEvent === 'del') {
                  layer.confirm('真的删除行么', function(index) {
                      obj.del(); //删除对应行（tr）的DOM结构
                      layer.close(index);
                      //向服务端发送删除指令
                  });
              } else if (layEvent === 'edit') {
                  layer.msg('编辑操作');
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
  }