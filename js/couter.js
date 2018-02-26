  $(function() {
      loadDataToType("pc");
      $("#order dd").click(function(e){
        var dataType = $(this).attr("data-type");
        loadDataToType(dataType);
        console.log(dataType);
      })
      layui.use('form', function() {
        var form = layui.form;
        form.on('select(search_type)', function(data){
          var type = $("#order dd.layui-this").attr("data-type");
          if (data.value == "all") {
            $(".searchData").val("");
            loadDataToType(type);
          }
                console.log(data.elem); //得到select原始DOM对象
                console.log(data.value); //得到被选中的值
                console.log(data.othis); //得到美化后的DOM对象
        }); 
        form.on('submit(search_btn)', function(data){
          var type = $("#order dd.layui-this").attr("data-type");
          var string = data.field.row + '=' + data.field.dataString;
          if (data.field.row == "all") {
            string = undefined
          }
          loadDataToType(type,string);
          // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
          // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
          // console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
          return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        });
      });
      


  })
  /*更新数据*/
  function loadDataToType(type,search){
    var URL = search?("http://rainingjoy.xin:9111/getList?dataType=" + type + "&"+search):("http://rainingjoy.xin:9111/getAll?dataType=" + type)
    // var URL = "http://rainingjoy.xin:9111/getAll?dataType=" + type;
    $.ajax({
          "url": URL,
          "type": "get",
      }).done(function(data) {
          renderOrderTable(data,type)
      }).fail(function(e) {
          console.log(e)
      });

  }
  function renderOrderTable(data,type) {
      $(".tab-header h2").html($("#order dd[data-type="+ type +"]").find("a").text());
          layui.use('table', function() {
              var table = layui.table;

              //展示已知数据
              table.render({
                  elem: '#demo',
                  cols: [
                      [ //标题栏
                          { field: 'userId', title: 'ID', width: 80, sort: true, align: "center" },
                          { field: 'cellname', title: '小区名', width: 120, edit: 'text',templet: '#cellnameTpl' },
                          { field: 'address', title: '地址', edit: 'text' },
                          { field: 'components', title: '户型', sort: true, width: 120, edit: 'text' },
                          { field: 'area', title: '面积', width: 80, align: "center", edit: 'text' },
                          { field: 'style', title: '风格', width: 80, align: "center", edit: 'text' },
                          { field: 'type', title: '类型', sort: true, width: 80, align: "center", edit: 'text' },
                          { field: 'budget', title: '预算', width: 80, align: "center", edit: 'text' },
                          { field: 'price', title: '合同总价', width: 100, align: "center", edit: 'text' },
                          { field: 'name', title: '姓名', sort: true, width: 100, align: "center", edit: 'text' },
                          { field: 'mobilephone', title: '手机号码', sort: true, width: 120, align: "center", edit: 'text' },
                          { field: 'other', title: '备注', sort: true,width: 180, edit: 'text' },
                          { field: 'date', title: '日期', sort: true, align: "center",width: 164, edit: 'text' },
                          { field: 'status', title: '状态', sort: true, align: "center", edit: 'text',templet: '#statusTpl' }
                      ]
                  ],
                  cellMinWidth: 80,
                  height: 'full-200',
                  data: data
                      //,skin: 'line' //表格风格
                      ,
                  even: true,
                  page: true, //是否显示分页
                  limits: [50, 100, 200],
                  limit: 50 //每页默认显示的数量
              });
              //监听单元格编辑
              table.on('edit(quote)', function(obj) {
                  // var value = obj.value; //得到修改后的值
                  // var data = obj.data; //得到所在行所有键值
                  // var field = obj.field; //得到字段
                  // var option = {
                  //     userId: obj.data.userId,
                  // }
                  // Object.assign(option,{userId:obj.data.userId})
                  // option[field] = value
                  // console.log(option)
                  updataOrderData(obj.data,type)
                  // layer.msg('[ID: ' + data.id + '] ' + field + ' 字段更改为：' + value);
              });
          });

      };
  function updataOrderData(obj,type) {
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
