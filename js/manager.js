function timestampToTime(a){function b(g,h){for(var j=""+g,k=j.length,l="",m=h;m-->k;)l+="0";return l+j}var f=new Date(1e3*a);return f.getFullYear()+"-"+b(f.getMonth()+1,2)+"-"+b(f.getDate(),2)+" "+b(f.getHours(),2)+":"+b(f.getMinutes(),2)+":"+b(f.getSeconds(),2)}function timeToTimestamp(a){var b=new Date(a),f=b.getTime(),g=b.valueOf(),h=Date.parse(b);return 1e-3*h}function isDate(a){var b=/^(\d+)-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/,f=a.match(b);if(null==f)return!1;--f[2];var g=new Date(f[1],f[2],f[3],f[4],f[5],f[6]);return!(g.getFullYear()!=f[1])&&!(g.getMonth()!=f[2])&&!(g.getDate()!=f[3])&&!(g.getHours()!=f[4])&&!(g.getMinutes()!=f[5])&&!(g.getSeconds()!=f[6])}var startTime=0,endTime=0;$(function(){var a=getSession("scope");"1"==a?$("#accountName").text("\u8D85\u7EA7\u7BA1\u7406\u5458"):"2"==a&&($("#accountName").text("\u7BA1\u7406\u5458"),$(".components dd[data-type=admin]").remove()),$(".addNewProduct").show();judgeIsLogin(),loadDataToType("add"),$(".components dd").click(function(){var g=$(this).attr("data-type");$("#selectMoreTwoCode").hide(),$(".tab-header h2").html($(".components dd[data-type="+g+"]").find("a").text()),startTime=0,endTime=0,loadDataToType(g)}),layui.use(["form","layedit","laydate"],function(){var g=layui.form,h=layui.layer,j=layui.layedit,k=layui.laydate;(function(){k.render({elem:"#beginDate",type:"datetime",calendar:!0,done:function(l){var o=timeToTimestamp(l);startTime=o,0!=endTime&&startTime>endTime&&h.open({zIndex:99999999,title:"\u63D0\u793A",content:"\u5F00\u59CB\u65F6\u95F4\u4E0D\u80FD\u8D85\u8FC7\u7ED3\u675F\u65F6\u95F4\uFF01"})}}),k.render({elem:"#offDate",type:"datetime",done:function(l){var o=timeToTimestamp(l);endTime=o,0!=startTime&&startTime>endTime&&h.open({zIndex:99999999,title:"\u63D0\u793A",content:"\u7ED3\u675F\u65F6\u95F4\u4E0D\u80FD\u5C0F\u4E8E\u5F00\u59CB\u65F6\u95F4\uFF01"})}}),k.render({elem:"#outboundCarsBeginDate",type:"datetime",done:function(l){var o=timeToTimestamp(l);startTime=o,0!=endTime&&startTime>endTime&&h.open({zIndex:99999999,title:"\u63D0\u793A",content:"\u5F00\u59CB\u65F6\u95F4\u4E0D\u80FD\u8D85\u8FC7\u7ED3\u675F\u65F6\u95F4\uFF01"})}}),k.render({elem:"#outboundCarsOffDate",type:"datetime",zIndex:99999999,done:function(l){var o=timeToTimestamp(l);endTime=o,0!=startTime&&startTime>endTime&&h.open({zIndex:99999999,title:"\u63D0\u793A",content:"\u7ED3\u675F\u65F6\u95F4\u4E0D\u80FD\u5C0F\u4E8E\u5F00\u59CB\u65F6\u95F4\uFF01"})}}),k.render({elem:"#inboundCarsBeginDate",type:"datetime",zIndex:99999999,done:function(l){var o=timeToTimestamp(l);startTime=o,0!=endTime&&startTime>endTime&&h.open({zIndex:99999999,title:"\u63D0\u793A",content:"\u5F00\u59CB\u65F6\u95F4\u4E0D\u80FD\u8D85\u8FC7\u7ED3\u675F\u65F6\u95F4\uFF01"})}}),k.render({elem:"#inboundCarsOffDate",type:"datetime",zIndex:99999999,done:function(l){var o=timeToTimestamp(l);endTime=o,0!=startTime&&startTime>endTime&&h.open({zIndex:99999999,title:"\u63D0\u793A",content:"\u7ED3\u675F\u65F6\u95F4\u4E0D\u80FD\u5C0F\u4E8E\u5F00\u59CB\u65F6\u95F4\uFF01"})}})})(),g.on("select(search_type)",function(l){var m=$(".components dd.layui-this").attr("data-type");"all"==l.value&&($(".searchData").val(""),loadDataToType(m)),console.log(l.elem),console.log(l.value),console.log(l.othis)}),g.on("submit(search_btn)",function(l){var m=$(".components dd.layui-this").attr("data-type"),n=$(".searchData").val().trim(),o={};return startTime=0==startTime?void 0:startTime&&!isDate(startTime+"")?timestampToTime(startTime):$("#beginDate").val(),endTime=0==endTime?void 0:endTime&&!isDate(endTime+"")?timestampToTime(endTime):$("#offDate").val(),"inbound"===m?o[l.field.row]=n:"outbound"===m?o[l.field.row]=n:"inboundCars"===m?(n=$(".searchData[name="+m+"]").val().trim(),""!=n&&(o[l.field.row]=n),o.beginInboundDate=startTime,o.endInboundDate=endTime):"outboundCars"===m?(n=$(".searchData[name="+m+"]").val().trim(),""!=n&&(o[l.field.row]=n),o.beginOutboundDate=startTime,o.endOutboundDate=endTime):"adminlog"===m?(n=$(".searchData[name=proName]").val().trim(),""!=n&&(o.proName=n),o.beginDate=startTime,o.endDate=endTime):"inboundlog"===m?(n=$(".searchData[name=proName]").val().trim(),""!=n&&(o.proName=n),o.beginDate=startTime,o.endDate=endTime):"outboundlog"===m?(n=$(".searchData[name=proName]").val().trim(),""!=n&&(o.proName=n),o.beginDate=startTime,o.endDate=endTime):void 0,(loadDataToType(m,o),!1)})}),$(".refresh_btn").click(function(){var f=$(".components dd.layui-this").attr("data-type");refreshData(f)})});function refreshData(a){var b=a;"inbound"==b&&(b="pc"),loadDataToType(b)}function loadDataToType(a,b,f){var g=0;$("#selectData").empty();var h=getSession("token"),j=getSession("scope"),k="<option value=\"company\">\u516C\u53F8\u540D</option><option value=\"proName\">\u9879\u76EE\u540D\u79F0</option><option value=\"componentName\">\u6784\u4EF6\u540D\u79F0</option>",n="http://www.zjgymzg.com/searchComponents",o={token:h,status:f};switch(console.log(a),a){case"add":case"pc":case"update":case"inbound":o.status=void 0;break;case"inboundCars":o.status=void 0,!!b||(o.inboundCars="");break;case"outboundCars":case"outbound":!!b||(o.inboundCars=""),o.status="outbound";break;case"admin":delete o.status,o.type="admin";break;case"operator":delete o.status,o.type=a;break;default:o.type=a;}if($(".select").hide(),"pc"===a||"add"===a||"update"===a||"inbound"===a?($(".select.inboundSearch").css("display","flex"),$(".addNewProduct").show(),$(".addAccount").hide(),$("#selectData").append(k),$(".tab-header .components").show(),$(".tab-header .outbound").hide()):"outbound"===a?($(".select.inboundSearch").css("display","flex"),$(".addNewProduct").hide(),$(".addAccount").hide(),$("#selectData").append(k),$(".tab-header .components").hide(),$(".tab-header .outbound").show()):"inboundCars"===a?($(".select.inboundCarsSearch").css("display","flex"),$(".addNewProduct").hide(),$(".addAccount").hide(),$("#selectData").append("<option value=\"inboundCars\">\u5165\u5E93\u8F66\u8F86</option>"),$(".tab-header .components").hide(),$(".tab-header .outbound").hide()):"outboundCars"===a?($(".select.outboundCarsSearch").css("display","flex"),$(".addNewProduct").hide(),$(".addAccount").hide(),$("#selectData").append("<option value=\"outboundCars\">\u51FA\u5E93\u8F66\u8F86</option>"),$(".tab-header .components").hide(),$(".tab-header .outbound").hide()):"admin"===a||"operator"===a?($(".addAccount").show(),$(".addNewProduct").hide(),$(".tab-header .components").hide(),$(".tab-header .outbound").hide()):"adminlog"===a||"inboundlog"===a||"outboundlog"===a||"accountlog"===a?(-1!=["inboundlog","outboundlog","adminlog"].indexOf(a)&&$(".select.logSearch").css("display","flex"),$(".addNewProduct").hide(),$(".addAccount").hide(),$(".tab-header .components").hide(),$(".tab-header .outbound").hide()):void 0,layui.use("form",function(){var p=layui.form;p.render(),layer=layui.layer,g=layer.load(0,{shade:0.3})}),("add"===a||"update"===a||"outbound"===a||"inboundCars"===a||"outboundCars"===a?n="http://www.zjgymzg.com/searchComponents":"admin"===a||"operator"===a?n="http://www.zjgymzg.com/getCustomers":"adminlog"===a||"inboundlog"===a||"outboundlog"===a||"accountlog"===a?n="http://www.zjgymzg.com/searchLog":void 0,!!b))for(x in b)o[x]=b[x];$.ajax({url:n,type:"post",contentType:"application/json",data:JSON.stringify(o)}).done(function(p){layer.close(g),renderOrderTable(p.list,a)}).fail(function(p){layer.close(g),console.log(p),layer.msg("\u7F51\u7EDC\u5F02\u5E38\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5\uFF01")})}function renderOrderTable(a,b){var f=[{title:"checkbox",type:"checkbox",width:80,fixed:"left"},{title:"\u5E8F\u53F7",templet:"#indexTpl",width:80,fixed:"left",align:"center"},{field:"id",title:"\u4EA7\u54C1ID",width:80,sort:!0,align:"center",templet:"#idTpl"},{field:"company",title:"\u516C\u53F8\u540D",align:"center",event:"company",templet:"#companyTpl"},{field:"proName",title:"\u9879\u76EE\u540D\u79F0",align:"center",event:"proName",templet:"#proNameTpl"},{field:"buildingNum",title:"\u697C\u53F7",align:"center",event:"buildingNum",templet:"#buildingNumTpl"},{field:"floorNum",title:"\u5C42\u53F7",align:"center",event:"floorNum",templet:"#floorNumTpl"},{field:"category",title:"\u6784\u4EF6\u7C7B\u522B",align:"center",event:"category",templet:"#categoryTpl"},{field:"componentName",title:"\u6784\u4EF6\u540D\u79F0",align:"center",event:"componentName",templet:"#componentNameTpl"},{field:"size",title:"\u5C3A\u5BF8",align:"center",event:"size",templet:"#sizeTpl"},{field:"volume",title:"\u6DF7\u51DD\u571F\u65B9\u91CF",align:"center",event:"volume",templet:"#volumeTpl"},{field:"weight",title:"\u6784\u4EF6\u91CD\u91CF",align:"center",event:"weight",templet:"#weightTpl"},{field:"level",title:"\u6DF7\u51DD\u571F\u7B49\u7EA7",align:"center",event:"level",templet:"#levelTpl"},{field:"productDate",title:"\u751F\u4EA7\u65E5\u671F",align:"center",event:"productDate",templet:"productDateTpl"},{field:"inboundDate",title:"\u5165\u5E93\u65E5\u671F",width:160,align:"center",templet:"#inboundDateTpl"},{field:"outboundDate",title:"\u51FA\u5E93\u65E5\u671F",width:160,align:"center",templet:"#outboundDateTpl"},{field:"location",title:"\u533A\u57DF",align:"center",templet:"#locationTpl"},{field:"inboundCars",title:"\u5165\u5E93\u8F66\u8F86",align:"center",templet:"#inboundCarsTpl"},{field:"outboundCars",title:"\u51FA\u5E93\u8F66\u8F86",align:"center",templet:"#outboundCarsTpl"},{field:"right",title:"\u64CD\u4F5C",width:150,toolbar:"#components",align:"center",fixed:"right"}];"outbound"===b?f=[{title:"\u5E8F\u53F7",templet:"#indexTpl",width:80,fixed:"left",align:"center"},{field:"id",title:"\u4EA7\u54C1ID",width:80,align:"center"},{field:"company",title:"\u516C\u53F8\u540D\u79F0",align:"center"},{field:"proName",title:"\u9879\u76EE\u540D\u79F0",align:"center"},{field:"buildingNum",title:"\u697C\u53F7",align:"center"},{field:"floorNum",title:"\u5C42\u53F7",align:"center"},{field:"category",title:"\u6784\u4EF6\u7C7B\u522B",align:"center"},{field:"componentName",title:"\u6784\u4EF6\u540D\u79F0",align:"center"},{field:"size",title:"\u5C3A\u5BF8",align:"center",event:"size"},{field:"volume",title:"\u6DF7\u51DD\u571F\u65B9\u91CF",align:"center"},{field:"weight",title:"\u6784\u4EF6\u91CD\u91CF",align:"center"},{field:"level",title:"\u6DF7\u51DD\u571F\u7B49\u7EA7",align:"center"},{field:"productDate",title:"\u751F\u4EA7\u65E5\u671F",align:"center"},{field:"inboundDate",title:"\u5165\u5E93\u65E5\u671F",width:160,align:"center"},{field:"outboundDate",title:"\u51FA\u5E93\u65E5\u671F",width:160,align:"center"},{field:"location",title:"\u533A\u57DF",align:"center"},{field:"inboundCars",title:"\u5165\u5E93\u8F66\u8F86",align:"center"},{field:"outboundCars",title:"\u51FA\u5E93\u8F66\u8F86",align:"center"}]:"inboundCars"===b?f=[{title:"\u5E8F\u53F7",templet:"#indexTpl",width:80,fixed:"left",align:"center"},{field:"company",title:"\u516C\u53F8\u540D\u79F0",align:"center"},{field:"inboundCars",title:"\u5165\u5E93\u8F66\u8F86",align:"center"},{field:"proName",title:"\u9879\u76EE\u540D\u79F0",align:"center"},{field:"buildingNum",title:"\u697C\u53F7",align:"center"},{field:"floorNum",title:"\u5C42\u53F7",align:"center"},{field:"category",title:"\u6784\u4EF6\u7C7B\u522B",align:"center"},{field:"componentName",title:"\u6784\u4EF6\u540D\u79F0",align:"center"},{field:"size",title:"\u5C3A\u5BF8",align:"center"},{field:"volume",title:"\u6DF7\u51DD\u571F\u65B9\u91CF",align:"center"},{field:"weight",title:"\u6784\u4EF6\u91CD\u91CF",align:"center"},{field:"level",title:"\u6DF7\u51DD\u571F\u7B49\u7EA7",align:"center"},{field:"productDate",title:"\u751F\u4EA7\u65E5\u671F",align:"center"},{field:"inboundDate",title:"\u5165\u5E93\u65E5\u671F",width:160,align:"center"},{field:"location",title:"\u533A\u57DF",align:"center"}]:"outboundCars"===b?f=[{title:"\u5E8F\u53F7",templet:"#indexTpl",width:80,fixed:"left",align:"center"},{field:"outboundCars",title:"\u51FA\u5E93\u8F66\u8F86",align:"center"},{field:"proName",title:"\u9879\u76EE\u540D\u79F0",align:"center"},{field:"buildingNum",title:"\u697C\u53F7",align:"center"},{field:"floorNum",title:"\u5C42\u53F7",align:"center"},{field:"category",title:"\u6784\u4EF6\u7C7B\u522B",align:"center"},{field:"componentName",title:"\u6784\u4EF6\u540D\u79F0",align:"center"},{field:"size",title:"\u5C3A\u5BF8",align:"center"},{field:"volume",title:"\u6DF7\u51DD\u571F\u65B9\u91CF",align:"center"},{field:"weight",title:"\u6784\u4EF6\u91CD\u91CF",align:"center"},{field:"level",title:"\u6DF7\u51DD\u571F\u7B49\u7EA7",align:"center"},{field:"productDate",title:"\u751F\u4EA7\u65E5\u671F",align:"center"},{field:"outboundDate",title:"\u51FA\u5E93\u65E5\u671F",width:160,align:"center"},{field:"location",title:"\u533A\u57DF",align:"center"}]:"admin"===b||"operator"===b?f=[{title:"\u5E8F\u53F7",templet:"#indexTpl",width:80,fixed:"left",align:"center"},{field:"phone",title:"\u7528\u6237\u540D",align:"center"},{field:"password",title:"\u5BC6\u7801",align:"center",event:"password"},{field:"scope",title:"\u6743\u9650",align:"center",event:"scope",templet:"#scopeTpl"},{field:"date",title:"\u65E5\u671F",width:160,align:"center"},{field:"operator",title:"\u64CD\u4F5C\u4EBA",align:"center"}]:"adminlog"===b||"inboundlog"===b||"outboundlog"===b||"accountlog"===b?f=[{title:"\u5E8F\u53F7",templet:"#indexTpl",width:80,fixed:"left",align:"center"},{field:"message",title:"\u8BE6\u60C5",align:"left"},{field:"date",title:"\u65E5\u671F",width:160,align:"center"}]:void 0;layui.use("table",function(){var g=layui.table;g.render({elem:"#demo",cellMinWidth:100,loading:!0,cols:[f],height:"full-200",id:"testReload2",data:a,even:!0,page:!0,limits:[50,100,200],limit:50,done:function(){layui.$}});var h=layui.$,j={getCheckData:function(){var k=g.checkStatus("testReload2"),l=k.data;console.log(l.length),console.log(l),l.forEach(function(m){downloadQRcode(m)})}};g.on("checkbox(quote)",function(k){k.checked&&h(".selectMore").show();var l=h("table input[type=checkbox]:checked").length;0==l&&h(".selectMore").hide()}),h(".selectMore").on("click",function(){var k=h(this).data("type");j[k]?j[k].call(this):""}),h("#demo .layui-btn.search_btn").on("click",function(){var k=h(this).data("type");j[k]?j[k].call(this):""}),g.on("tool(quote)",function(k){var l=k.data,m=k.event;"detail"===m?showModel(l):"del"===m?layer.confirm("\u771F\u7684\u5220\u9664\u884C\u4E48",function(o){k.del(),layer.close(o)}):"edit"===m?layer.msg("\u7F16\u8F91\u64CD\u4F5C"):"download"===m&&(layer.msg("\u6B63\u5728\u4E0B\u8F7D\u4E2D..."),downloadQRcode(l));var n=h(".components dd.layui-this").attr("data-type");-1!=["inbound","admin","operator"].indexOf(n)&&("company"===m?editValue("",k.event,"\u516C\u53F8\u540D",k):"proName"===m?editValue("",k.event,"\u9879\u76EE\u540D",k):"buildingInfo"===m?editValue("",k.event,"\u697C\u5C42\u53F7",k):"buildingNum"===m?editValue("",k.event,"\u697C\u53F7",k):"floorNum"===m?editValue("",k.event,"\u5C42\u53F7",k):"category"===m?editValue("",k.event,"\u6784\u4EF6\u7C7B\u522B",k):"componentName"===m?editValue("",k.event,"\u6784\u4EF6\u540D\u79F0",k):"size"===m?editValue("",k.event,"\u5C3A\u5BF8",k):"volume"===m?editValue("",k.event,"\u6DF7\u51DD\u571F\u65B9\u91CF",k):"weight"===m?editValue("",k.event,"\u6784\u4EF6\u91CD\u91CF",k):"level"===m?editValue("",k.event,"\u6DF7\u51DD\u571F\u7B49\u7EA7",k):"productDate"===m?editValue("",k.event,"\u751F\u4EA7\u65E5\u671F",k):"scope"===m?editValue("",k.event,"\u8D26\u53F7\u6743\u9650",k):"password"===m?editValue("",k.event,"\u8D26\u53F7\u5BC6\u7801",k):void 0)})})}function editValue(a,b,f,g){var h=getSession("scope"),j=g,k={};"scope"==g.event&&("1"==g.data[b]?g.data[b]="\u8D85\u7EA7\u7BA1\u7406\u5458":"2"==g.data[b]?g.data[b]="\u7BA1\u7406\u5458":"3"==g.data[b]?g.data[b]="\u5165\u5E93\u5458":"4"==g.data[b]?g.data[b]="\u51FA\u5E93\u5458":"5"==g.data[b]&&(g.data[b]="\u64CD\u4F5C\u5458")),layer.prompt({formType:2,title:"\u4FEE\u6539"+f,value:g.data[b]},function(l,m){if(layer.close(m),"2"==h&&"\u7BA1\u7406\u5458"==l)return void layer.confirm("\u6743\u9650\u8BBE\u7F6E\u9519\u8BEF\uFF0C\u8BF7\u91CD\u65B0\u8BBE\u7F6E\uFF01",{btn:["\u786E\u5B9A"]});switch(g.event){case"company":if(-1==["\u6C38\u8302\u4F4F\u5DE5","\u8FDC\u5927\u4F4F\u5DE5","\u5B9D\u5CB3\u4F4F\u5DE5","\u541B\u5927\u4F4F\u5DE5"].indexOf(l))return void layer.confirm("\u516C\u53F8\u540D\u8BBE\u7F6E\u9519\u8BEF\uFF0C\u8BF7\u91CD\u65B0\u8BBE\u7F6E\uFF01",{btn:["\u786E\u5B9A"]});g.data[b]=l,j[b]=l,k[b]=l;break;case"buildingNum":if(-1==["1\u53F7\u697C","2\u53F7\u697C","3\u53F7\u697C","4\u53F7\u697C","5\u53F7\u697C","6\u53F7\u697C","7\u53F7\u697C","8\u53F7\u697C","9\u53F7\u697C","10\u53F7\u697C","11\u53F7\u697C","12\u53F7\u697C","13\u53F7\u697C","14\u53F7\u697C","15\u53F7\u697C","16\u53F7\u697C","17\u53F7\u697C","18\u53F7\u697C","19\u53F7\u697C","20\u53F7\u697C"].indexOf(l))return void layer.confirm("\u697C\u53F7\u8BBE\u7F6E\u9519\u8BEF\uFF0C\u8BF7\u91CD\u65B0\u8BBE\u7F6E\uFF01",{btn:["\u786E\u5B9A"]});g.data[b]=l,j[b]=l,k[b]=l;break;case"floorNum":if(-1==["1F","2F","3F","4F","5F","6F","7F","8F","9F","10F","11F","12F","13F","14F","15F","16F","17F","18F","19F","20F"].indexOf(l))return void layer.confirm("\u5C42\u53F7\u8BBE\u7F6E\u9519\u8BEF\uFF0C\u8BF7\u91CD\u65B0\u8BBE\u7F6E\uFF01",{btn:["\u786E\u5B9A"]});g.data[b]=l,j[b]=l,k[b]=l;break;case"category":if(-1==["\u5899","\u677F","\u67F1","\u697C\u68AF","\u9633\u53F0","\u51F8\u7A97"].indexOf(l))return void layer.confirm("\u6784\u4EF6\u7C7B\u578B\u8BBE\u7F6E\u9519\u8BEF\uFF0C\u8BF7\u91CD\u65B0\u8BBE\u7F6E\uFF01",{btn:["\u786E\u5B9A"]});g.data[b]=l,j[b]=l,k[b]=l;break;case"level":if(-1==["C30","C35","C40","C45"].indexOf(l))return void layer.confirm("\u6DF7\u51DD\u571F\u7B49\u7EA7\u8BBE\u7F6E\u9519\u8BEF\uFF0C\u8BF7\u91CD\u65B0\u8BBE\u7F6E\uFF01",{btn:["\u786E\u5B9A"]});g.data[b]=l,j[b]=l,k[b]=l;break;case"scope":if(-1==["\u5165\u5E93\u5458","\u51FA\u5E93\u5458","\u64CD\u4F5C\u5458","\u7BA1\u7406\u5458"].indexOf(l))return void layer.confirm("\u6743\u9650\u8BBE\u7F6E\u9519\u8BEF\uFF0C\u8BF7\u91CD\u65B0\u8BBE\u7F6E\uFF01",{btn:["\u786E\u5B9A"]});"\u5165\u5E93\u5458"==l?(g.data[b]="3",k.type="operator",k[b]="3"):"\u51FA\u5E93\u5458"==l?(g.data[b]="4",k.type="operator",k[b]="4"):"\u64CD\u4F5C\u5458"==l?(k.type="operator",g.data[b]="5",k[b]="5"):"\u7BA1\u7406\u5458"==l&&(k.type="admin",g.data[b]="2",k[b]="2");break;default:g.data[b]=l,j[b]=l,k[b]=l;}j.id=g.data.id,k.id=g.data.id,updataOrderData(j,k)})}function updataOrderData(a,b){var f=a,g="http://www.zjgymzg.com/saveOrUpdateComponent",h=$(".components dd.layui-this").attr("data-type"),j=getSession("token");if("inbound"==f.status)return void layer.confirm("\u8BE5\u6784\u4EF6\u5DF2\u5165\u5E93\uFF0C\u4E0D\u53EF\u518D\u4FEE\u6539\uFF01",{btn:["\u786E\u5B9A"]});if("outbound"==f.status)return void layer.confirm("\u8BE5\u6784\u4EF6\u5DF2\u51FA\u5E93\uFF0C\u4E0D\u53EF\u518D\u4FEE\u6539\uFF01",{btn:["\u786E\u5B9A"]});"inbound"===h?g="http://www.zjgymzg.com/saveOrUpdateComponent":"admin"===h||"operator"===h?g="http://www.zjgymzg.com/saveOrUpdateCustomer":void 0;"scope"==a.event&&(g="http://www.zjgymzg.com/setScope"),"password"==a.event&&(g="http://www.zjgymzg.com/saveOrUpdateCustomer",Object.assign(b,{token:j,type:h})),Object.assign(b,{token:j,status:"update"}),("scope"==a.event||"password"==a.event)&&delete b.status,$.ajax({type:"post",url:g,contentType:"application/json",dataType:"json",data:JSON.stringify(b),beforeSend:function(){layer.msg("\u6B63\u5728\u66F4\u65B0\u6570\u636E",{icon:16,time:3e6,shade:[0.1,"#fff"]})},success:function(k){return console.log(k),200==k.status?void(layer.msg("\u66F4\u65B0\u6210\u529F\uFF01"),a.update(b)):($("#msg").remove(),layer.msg(k.message),!1)},error:function(){layer.msg("\u7F51\u7EDC\u5F02\u5E38\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5\uFF01")}})}function showModel(a){$(".ms ul").empty(),$(".ms .contents .qcode img").removeAttr("src");var b="<li><label for=\"\">\u516C\u53F8\u540D\u79F0:</label><span>"+a.company+"</span></li><li><label for=\"\">\u9879\u76EE\u540D\u79F0:</label><span>"+a.proName+"</span></li><li><label for=\"\">\u697C\u5C42\u53F7:</label><span>"+a.buildingNum+a.floorNum+"</span></li><li><label for=\"\">\u6784\u4EF6\u540D\u79F0:</label><span>"+a.category+"</span></li><li><label for=\"\">\u6784\u4EF6\u540D\u79F0:</label><span>"+a.componentName+"</span></li><li><label for=\"\">\u5C3A\u5BF8:</label><span>"+a.size+"</span></li><li><label for=\"\">\u6DF7\u51DD\u571F\u65B9\u91CF:</label><span>"+a.volume+"</span></li><li><label for=\"\">\u6784\u4EF6\u91CD\u91CF:</label><span>"+a.weight+"</span></li><li><label for=\"\">\u6DF7\u51DD\u571F\u7B49\u7EA7:</label><span>"+a.level+"</span></li><li><label for=\"\">\u751F\u4EA7\u65E5\u671F:</label><span>"+a.productDate+"</span></li><li><label for=\"\">\u5165\u5E93\u8F66\u8F86:</label><span>"+a.inboundCars+"</span></li><li><label for=\"\">\u51FA\u5E93\u8F66\u8F86:</label><span>"+a.outboundCars+"</span></li><li><label for=\"\">\u533A\u57DF:</label><span>"+a.location+"</span></li><li><label for=\"\">\u5165\u5E93\u65E5\u671F:</label><span>"+a.inboundDate+"</span></li><li><label for=\"\">\u51FA\u5E93\u65E5\u671F:</label><span>"+a.outboundDate+"</span></li><li><label for=\"\">\u6784\u4EF6\u72B6\u6001:</label><span>"+a.status+"</span></li>";$(".ms ul").append(b),loaderQRcodeImg(a),layer.open({type:1,title:a.componentName,skin:"layui-layer-rim",area:["700px","640px"],content:$(".ms")})}function downloadQRcode(a){var b=a.proName+a.componentName;makeCode(a);var f=productQrcodeImg(a);downloadClick(f,b)}function makeCode(a){var b={id:a.id,company:a.company,proName:a.proName,buildingNum:a.buildingNum,floorNum:a.floorNum,category:a.category,componentName:a.componentName,level:a.level,weight:a.weight,productDate:a.productDate},f=JSON.stringify(b);$("#qrcode").empty(),$("#qrcode").qrcode({width:200,height:200,colorDark:"#000000",colorLight:"#ffffff",correctLevel:0,text:utf16to8(f)})}function utf16to8(a){var b,f,g,h;for(b="",g=a.length,f=0;f<g;f++)h=a.charCodeAt(f),1<=h&&127>=h?b+=a.charAt(f):2047<h?(b+=String.fromCharCode(224|15&h>>12),b+=String.fromCharCode(128|63&h>>6),b+=String.fromCharCode(128|63&h>>0)):(b+=String.fromCharCode(192|31&h>>6),b+=String.fromCharCode(128|63&h>>0));return b}function productQrcodeImg(a){var b=a.id,f=a.company,g=a.proName,h=a.buildingNum+a.floorNum,j=a.componentName,k=a.level,l=a.weight,m=a.productDate,n=document.createElement("canvas");n.width=720,n.height=520;var o=n.getContext("2d");o.fillStyle="#FFFFFF",o.fillRect(0,0,640,520);var p=$("#qrcode canvas")[0],q=document.createElement("canvas");return q.width=620,q.height=520,q.getContext("2d").font="40px Microsoft Yahei",q.getContext("2d").drawImage(n,0,0),q.getContext("2d").drawImage(p,60,250),q.getContext("2d").textAlign="left",q.getContext("2d").fillText(f,60,110),q.getContext("2d").fillText(g,60,170),q.getContext("2d").fillText(h,60,230),q.getContext("2d").textAlign="center",q.getContext("2d").font="70px Microsoft Yahei",q.getContext("2d").fillText(j,420,190),q.getContext("2d").font="30px Microsoft Yahei",q.getContext("2d").textAlign="left",q.getContext("2d").fillText("\u7B49\u7EA7: "+k,305,280),q.getContext("2d").fillText("\u91CD\u91CF: "+l,305,340),q.getContext("2d").font="30px Microsoft Yahei",q.getContext("2d").fillText("\u751F\u4EA7\u65E5\u671F: ",305,390),q.getContext("2d").font="30px Microsoft Yahei",q.getContext("2d").fillText(m,305,440),q.toDataURL("image/png")}function downloadClick(a,b){var f=$("<a>"),g=f.attr("href",a).attr("download",b+".png");console.log(g),g[0].click()}function loaderQRcodeImg(a){a.proName+a.componentName;makeCode(a);var g=productQrcodeImg(a);$(".ms .contents .qcode img").attr("src",g)}