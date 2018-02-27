  $(function() {
      $.ajax({
          "url": 'http://rainingjoy.xin:9111/getAll?dataType=pc',
          "type": "get",
      }).done(function(data) {
          renderTable(data)
      }).fail(function(e) {
          console.log(e)
      });

      function renderTable(data) {
          layui.use('table', function() {
              var table = layui.table;

              //展示已知数据
              table.render({
                  elem: '#demo',
                  cellMinWidth: 80,
                  cols: [
                      [ //标题栏
                          { field: 'userId', title: 'ID', sort: true, align: "center" },
                          { field: 'cellname', title: '小区名', edit: 'text',templet: '#cellnameTpl' },
                          { field: 'address', title: '地址', edit: 'text' },
                          { field: 'components', title: '户型', sort: true,edit: 'text' },
                          { field: 'area', title: '面积',align: "center", edit: 'text' },
                          { field: 'style', title: '风格',align: "center", edit: 'text' },
                          { field: 'type', title: '类型', sort: true,align: "center", edit: 'text' },
                          { field: 'budget', title: '预算', align: "center", edit: 'text' },
                          { field: 'price', title: '合同总价',align: "center", edit: 'text' },
                          { field: 'name', title: '姓名', sort: true,align: "center", edit: 'text' },
                          { field: 'mobilephone', title: '手机号码', sort: true,align: "center", edit: 'text' },
                          { field: 'other', title: '备注', sort: true, edit: 'text' },
                          { field: 'date', title: '日期', sort: true, align: "center", edit: 'text' },
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
                  updataData(obj.data)
                  // layer.msg('[ID: ' + data.id + '] ' + field + ' 字段更改为：' + value);
              });
          });

      };
  })
  /*更新数据*/
  function updataData(obj) {
      fetch('http://rainingjoy.xin:9111/saveOrUpdate', {
              method: 'POST',
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(obj)
          }).then((response) => response.text())
          .then((responseData) => { // 上面的转好的json
              console.log(responseData)
          })
  }
  // fetch('http://rainingjoy.xin:9111/insert', {
  //         method: 'POST',
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(obj)
  //     }).then((response) => response.text())
  //     .then((responseData) => { // 上面的转好的json
  //         console.log(responseData)
  //     })
  // $.ajax({
  //     type: "post",
  //     url: "http://rainingjoy.xin:9111/insert",
  //     dataType: "application/json",
  //     data: JSON.stringify(obj),
  //     success: function(data) {
  //         console.log(data)
  //     },
  //     error: function(e) {
  //         console.log(e)
  //     }
  // })
  // $.ajax({
  //     "url": 'http://rainingjoy.xin:9111/insert',
  //     "type": "post",
  //     contentType: 'application/json',
  //     "data": JSON.stringify(obj)
  // }).done(function(data) {
  //     console.log(data);
  // }).fail(function(e) {
  //     console.log(e)
  // });
  /*获取*/
  // rainingjoy.xin:9111/getList
  // $.ajax({
  //     "url": 'http://rainingjoy.xin:9111/getList?name="adasd"',
  //     "type": "get",
  // }).done(function (data) {
  //     console.log(data);
  // }).fail(function (e) {
  //  console.log(e)
  // });