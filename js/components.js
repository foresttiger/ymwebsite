$(function(){var a=getSession("scope");"1"==a?$("#accountName").text("\u8D85\u7EA7\u7BA1\u7406\u5458"):"2"==a&&($("#accountName").text("\u7BA1\u7406\u5458"),$(".components dd[data-type=admin]").remove()),$(".addNewProduct").show();var b;judgeIsLogin(),loadDataToType("add"),$(".components dd").click(function(){var f=$(this).attr("data-type");$(".tab-header h2").html($(".components dd[data-type="+f+"]").find("a").text()),loadDataToType(f),console.log(f)}),layui.use("form",function(){var d=layui.form;d.on("select(search_type)",function(f){var g=$(".components dd.layui-this").attr("data-type");"all"==f.value&&($(".searchData").val(""),loadDataToType(g)),console.log(f.elem),console.log(f.value),console.log(f.othis)}),d.on("submit(search_btn)",function(f){var g=$(".components dd.layui-this").attr("data-type"),h=f.field.dataString;return b={type:f.field.row,value:h},loadDataToType(g,b),!1})}),$(".refresh_btn").click(function(){var d=$(".components dd.layui-this").attr("data-type");refreshData(d)})});function refreshData(a){var b=a;"inbound"==b&&(b="pc"),loadDataToType(b)}function loadDataToType(a,b,d){$("#selectData").empty();var f=getSession("token"),g=getSession("scope"),h="<option value=\"proName\">\u9879\u76EE\u540D\u79F0</option><option value=\"buildingInfo\">\u697C\u5C42\u53F7</option><option value=\"componentName\">\u6784\u4EF6\u540D\u79F0</option>",l="http://ymzg.gxajl.com/getComponents",m={token:f,status:d};switch(console.log(a),a){case"add":case"pc":case"update":case"inbound":m.status=void 0;break;case"inboundCars":m.status=void 0,!!b||(m.inboundCars="");break;case"outboundCars":case"outbound":!!b||(m.inboundCars=""),m.status="outbound";break;case"admin":delete m.status,m.type="admin";break;case"operator":delete m.status,m.type=a;break;default:m.type=a;}"pc"===a||"add"===a||"update"===a||"inbound"===a?($(".select").show(),$(".addNewProduct").show(),$(".addAccount").hide(),$("#selectData").append(h)):"outbound"===a?($(".select").show(),$(".addNewProduct").hide(),$(".addAccount").hide(),$("#selectData").append(h)):"inboundCars"===a?($(".select").show(),$(".addNewProduct").hide(),$(".addAccount").hide(),$("#selectData").append("<option value=\"inboundCars\">\u5165\u5E93\u8F66\u8F86</option>")):"outboundCars"===a?($(".select").show(),$(".addNewProduct").hide(),$(".addAccount").hide(),$("#selectData").append("<option value=\"outboundCars\">\u51FA\u5E93\u8F66\u8F86</option>")):"admin"===a||"operator"===a?($(".select").hide(),$(".addAccount").show(),$(".addNewProduct").hide()):"adminlog"===a||"inboundlog"===a||"outboundlog"===a||"accountlog"===a?($(".select").hide(),$(".addNewProduct").hide(),$(".addAccount").hide()):void 0,layui.use("form",function(){var n=layui.form;n.render()}),"add"===a||"update"===a||"outbound"===a||"inboundCars"===a||"outboundCars"===a?l="http://ymzg.gxajl.com/getComponents":"admin"===a||"operator"===a?l="http://ymzg.gxajl.com/getCustomers":"adminlog"===a||"inboundlog"===a||"outboundlog"===a||"accountlog"===a?l="http://ymzg.gxajl.com/getLogs":void 0,!b||(m[b.type]=b.value),$.ajax({url:l,type:"post",contentType:"application/json",data:JSON.stringify(m)}).done(function(n){renderOrderTable(n.list,a)}).fail(function(n){console.log(n),layer.msg("\u7F51\u7EDC\u5F02\u5E38\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5\uFF01")})}function renderOrderTable(a,b){var d=[{title:"\u5E8F\u53F7",templet:"#indexTpl",width:80,fixed:"left",align:"center"},{field:"id",title:"\u4EA7\u54C1ID",width:80,sort:!0,align:"center"},{field:"proName",title:"\u9879\u76EE\u540D\u79F0",sort:!0,align:"center",event:"proName"},{field:"buildingInfo",title:"\u697C\u5C42\u53F7",align:"center",event:"buildingInfo"},{field:"componentName",title:"\u6784\u4EF6\u540D\u79F0",align:"center",event:"componentName"},{field:"size",title:"\u5C3A\u5BF8",align:"center",event:"size"},{field:"volume",title:"\u6DF7\u51DD\u571F\u65B9\u91CF",sort:!0,align:"center",event:"volume"},{field:"weight",title:"\u6784\u4EF6\u91CD\u91CF",sort:!0,align:"center",event:"weight"},{field:"level",title:"\u6DF7\u51DD\u571F\u7B49\u7EA7",sort:!0,align:"center",event:"level"},{field:"productDate",title:"\u751F\u4EA7\u65E5\u671F",sort:!0,align:"center",event:"productDate"},{field:"inboundDate",title:"\u5165\u5E93\u65E5\u671F",width:160,sort:!0,align:"center"},{field:"outboundDate",title:"\u51FA\u5E93\u65E5\u671F",width:160,sort:!0,align:"center"},{field:"location",title:"\u533A\u57DF",sort:!0,align:"center"},{field:"inboundCars",title:"\u5165\u5E93\u8F66\u8F86",align:"center"},{field:"outboundCars",title:"\u51FA\u5E93\u8F66\u8F86",align:"center"},{field:"status",title:"\u72B6\u6001",align:"center"},{field:"right",title:"\u64CD\u4F5C",width:150,toolbar:"#components",align:"center",fixed:"right"}];"outbound"===b?d=[{title:"\u5E8F\u53F7",templet:"#indexTpl",width:80,fixed:"left",align:"center"},{field:"id",title:"\u4EA7\u54C1ID",width:80,sort:!0,align:"center"},{field:"proName",title:"\u9879\u76EE\u540D\u79F0",sort:!0,align:"center"},{field:"buildingInfo",title:"\u697C\u5C42\u53F7",align:"center"},{field:"componentName",title:"\u6784\u4EF6\u540D\u79F0",align:"center"},{field:"size",title:"\u5C3A\u5BF8",align:"center",event:"size"},{field:"volume",title:"\u6DF7\u51DD\u571F\u65B9\u91CF",sort:!0,align:"center"},{field:"weight",title:"\u6784\u4EF6\u91CD\u91CF",sort:!0,align:"center"},{field:"level",title:"\u6DF7\u51DD\u571F\u7B49\u7EA7",sort:!0,align:"center"},{field:"productDate",title:"\u751F\u4EA7\u65E5\u671F",sort:!0,align:"center"},{field:"inboundDate",title:"\u5165\u5E93\u65E5\u671F",width:160,sort:!0,align:"center"},{field:"outboundDate",title:"\u51FA\u5E93\u65E5\u671F",width:160,sort:!0,align:"center"},{field:"location",title:"\u533A\u57DF",sort:!0,align:"center"},{field:"inboundCars",title:"\u5165\u5E93\u8F66\u8F86",align:"center"},{field:"outboundCars",title:"\u51FA\u5E93\u8F66\u8F86",align:"center"},{field:"status",title:"\u72B6\u6001",align:"center"}]:"inboundCars"===b?d=[{title:"\u5E8F\u53F7",templet:"#indexTpl",width:80,fixed:"left",align:"center"},{field:"inboundCars",title:"\u5165\u5E93\u8F66\u8F86",align:"center"},{field:"proName",title:"\u9879\u76EE\u540D\u79F0",sort:!0,align:"center"},{field:"buildingInfo",title:"\u697C\u5C42\u53F7",align:"center"},{field:"componentName",title:"\u6784\u4EF6\u540D\u79F0",align:"center"},{field:"size",title:"\u5C3A\u5BF8",align:"center"},{field:"volume",title:"\u6DF7\u51DD\u571F\u65B9\u91CF",sort:!0,align:"center"},{field:"weight",title:"\u6784\u4EF6\u91CD\u91CF",sort:!0,align:"center"},{field:"level",title:"\u6DF7\u51DD\u571F\u7B49\u7EA7",sort:!0,align:"center"},{field:"productDate",title:"\u751F\u4EA7\u65E5\u671F",sort:!0,align:"center"},{field:"inboundDate",title:"\u5165\u5E93\u65E5\u671F",width:160,sort:!0,align:"center"},{field:"location",title:"\u533A\u57DF",sort:!0,align:"center"}]:"outboundCars"===b?d=[{title:"\u5E8F\u53F7",templet:"#indexTpl",width:80,fixed:"left",align:"center"},{field:"outboundCars",title:"\u51FA\u5E93\u8F66\u8F86",align:"center"},{field:"proName",title:"\u9879\u76EE\u540D\u79F0",sort:!0,align:"center"},{field:"buildingInfo",title:"\u697C\u5C42\u53F7",align:"center"},{field:"componentName",title:"\u6784\u4EF6\u540D\u79F0",align:"center"},{field:"size",title:"\u5C3A\u5BF8",align:"center"},{field:"volume",title:"\u6DF7\u51DD\u571F\u65B9\u91CF",sort:!0,align:"center"},{field:"weight",title:"\u6784\u4EF6\u91CD\u91CF",sort:!0,align:"center"},{field:"level",title:"\u6DF7\u51DD\u571F\u7B49\u7EA7",sort:!0,align:"center"},{field:"productDate",title:"\u751F\u4EA7\u65E5\u671F",sort:!0,align:"center"},{field:"outboundDate",title:"\u51FA\u5E93\u65E5\u671F",width:160,sort:!0,align:"center"},{field:"location",title:"\u533A\u57DF",sort:!0,align:"center"}]:"admin"===b||"operator"===b?d=[{title:"\u5E8F\u53F7",templet:"#indexTpl",width:80,fixed:"left",align:"center"},{field:"phone",title:"\u7528\u6237\u540D",sort:!0,align:"center"},{field:"password",title:"\u5BC6\u7801",align:"center",event:"password"},{field:"scope",title:"\u6743\u9650",align:"center",event:"scope",templet:"#scopeTpl"},{field:"date",title:"\u65E5\u671F",width:160,align:"center"},{field:"operator",title:"\u64CD\u4F5C\u4EBA",align:"center"}]:"adminlog"===b||"inboundlog"===b||"outboundlog"===b||"accountlog"===b?d=[{title:"\u5E8F\u53F7",templet:"#indexTpl",width:80,fixed:"left",align:"center"},{field:"message",title:"\u8BE6\u60C5",align:"left"},{field:"date",title:"\u65E5\u671F",width:160,align:"center"}]:void 0;layui.use("table",function(){var f=layui.table;f.render({elem:"#demo",cellMinWidth:100,loading:!0,cols:[d],height:"full-200",id:"testReload",data:a,even:!0,page:!0,limits:[50,100,200],limit:50,done:function(){var m=layui.$;m("[data-field='status']").css("display","none")}});var g=layui.$,h={reload:function(){var j=g("#demoReload");f.reload("testReload",{where:{keyword:j.val()}})}};g("#demo .layui-btn.search_btn").on("click",function(){var j=g(this).data("type");h[j]?h[j].call(this):""});var g=layui.$,h={getCheckData:function(){var j=f.checkStatus("idTest"),k=j.data;layer.alert(JSON.stringify(k))},getCheckLength:function(){var j=f.checkStatus("idTest"),k=j.data;layer.msg("\u9009\u4E2D\u4E86\uFF1A"+k.length+" \u4E2A")},isAll:function(){var j=f.checkStatus("idTest");layer.msg(j.isAll?"\u5168\u9009":"\u672A\u5168\u9009")}};f.on("tool(quote)",function(j){var k=j.data,l=j.event;"detail"===l?showModel(k):"del"===l?layer.confirm("\u771F\u7684\u5220\u9664\u884C\u4E48",function(n){j.del(),layer.close(n)}):"edit"===l?layer.msg("\u7F16\u8F91\u64CD\u4F5C"):"download"===l&&(layer.msg("\u6B63\u5728\u4E0B\u8F7D\u4E2D..."),downloadQRcode(k));var m=g(".components dd.layui-this").attr("data-type");-1!=["inbound","admin","operator"].indexOf(m)&&("proName"===l?editValue("",j.event,"\u9879\u76EE\u540D",j):"buildingInfo"===l?editValue("",j.event,"\u697C\u5C42\u53F7",j):"componentName"===l?editValue("",j.event,"\u6784\u4EF6\u540D\u79F0",j):"size"===l?editValue("",j.event,"\u5C3A\u5BF8",j):"volume"===l?editValue("",j.event,"\u6DF7\u51DD\u571F\u65B9\u91CF",j):"weight"===l?editValue("",j.event,"\u6784\u4EF6\u91CD\u91CF",j):"level"===l?editValue("",j.event,"\u6DF7\u51DD\u571F\u7B49\u7EA7",j):"productDate"===l?editValue("",j.event,"\u751F\u4EA7\u65E5\u671F",j):"scope"===l?editValue("",j.event,"\u8D26\u53F7\u6743\u9650",j):"password"===l?editValue("",j.event,"\u8D26\u53F7\u5BC6\u7801",j):void 0)}),f.reload("testReload",{page:{curr:1}})})}function editValue(a,b,d,f){var g=getSession("scope"),h=f,j={};"1"==f.data[b]?f.data[b]="\u8D85\u7EA7\u7BA1\u7406\u5458":"2"==f.data[b]?f.data[b]="\u7BA1\u7406\u5458":"3"==f.data[b]?f.data[b]="\u5165\u5E93\u5458":"4"==f.data[b]?f.data[b]="\u51FA\u5E93\u5458":"5"==f.data[b]&&(f.data[b]="\u64CD\u4F5C\u5458"),layer.prompt({formType:2,title:"\u4FEE\u6539"+d,value:f.data[b]},function(k,l){if(layer.close(l),"2"==g&&"\u7BA1\u7406\u5458"==k)return void layer.confirm("\u6743\u9650\u8BBE\u7F6E\u9519\u8BEF\uFF0C\u8BF7\u91CD\u65B0\u8BBE\u7F6E\uFF01",{btn:["\u786E\u5B9A"]});if("scope"==f.event){if(-1==["\u5165\u5E93\u5458","\u51FA\u5E93\u5458","\u64CD\u4F5C\u5458","\u7BA1\u7406\u5458"].indexOf(k))return void layer.confirm("\u6743\u9650\u8BBE\u7F6E\u9519\u8BEF\uFF0C\u8BF7\u91CD\u65B0\u8BBE\u7F6E\uFF01",{btn:["\u786E\u5B9A"]});"\u5165\u5E93\u5458"==k?(f.data[b]="3",j.type="operator",j[b]="3"):"\u51FA\u5E93\u5458"==k?(f.data[b]="4",j.type="operator",j[b]="4"):"\u64CD\u4F5C\u5458"==k?(j.type="operator",f.data[b]="5",j[b]="5"):"\u7BA1\u7406\u5458"==k&&(j.type="admin",f.data[b]="2",j[b]="2")}else f.data[b]=k,h[b]=k,j[b]=k;h.id=f.data.id,j.id=f.data.id,updataOrderData(h,j)})}function updataOrderData(a,b){var d=a,f="http://ymzg.gxajl.com/saveOrUpdateComponent",g=$(".components dd.layui-this").attr("data-type"),h=getSession("token");if("inbound"==d.status)return void layer.confirm("\u8BE5\u6784\u4EF6\u5DF2\u5165\u5E93\uFF0C\u4E0D\u53EF\u518D\u4FEE\u6539\uFF01",{btn:["\u786E\u5B9A"]});if("outbound"==d.status)return void layer.confirm("\u8BE5\u6784\u4EF6\u5DF2\u51FA\u5E93\uFF0C\u4E0D\u53EF\u518D\u4FEE\u6539\uFF01",{btn:["\u786E\u5B9A"]});"inbound"===g?f="http://ymzg.gxajl.com/saveOrUpdateComponent":"admin"===g||"operator"===g?f="http://ymzg.gxajl.com/saveOrUpdateCustomer":void 0;"scope"==a.event&&(f="http://ymzg.gxajl.com/setScope"),"password"==a.event&&(f="http://ymzg.gxajl.com/saveOrUpdateCustomer",Object.assign(b,{token:h,type:g})),Object.assign(b,{token:h,status:"update"}),("scope"==a.event||"password"==a.event)&&delete b.status,$.ajax({type:"post",url:f,contentType:"application/json",dataType:"json",data:JSON.stringify(b),beforeSend:function(){layer.msg("\u6B63\u5728\u66F4\u65B0\u6570\u636E",{icon:16,time:3e6,shade:[0.1,"#fff"]})},success:function(j){return console.log(j),200==j.status?void(layer.msg("\u66F4\u65B0\u6210\u529F\uFF01"),a.update(b),$(".refresh_btn").click()):($("#msg").remove(),layer.msg(j.message),!1)},error:function(){layer.msg("\u7F51\u7EDC\u5F02\u5E38\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5\uFF01")}})}function showModel(a){$(".ms ul").empty(),$(".ms .contents .qcode img").removeAttr("src");var b="<li><label for=\"\">\u9879\u76EE\u540D\u79F0:</label><span>"+a.proName+"</span></li><li><label for=\"\">\u697C\u5C42\u53F7:</label><span>"+a.buildingInfo+"</span></li><li><label for=\"\">\u6784\u4EF6\u540D\u79F0:</label><span>"+a.componentName+"</span></li><li><label for=\"\">\u5C3A\u5BF8:</label><span>"+a.size+"</span></li><li><label for=\"\">\u6DF7\u51DD\u571F\u65B9\u91CF:</label><span>"+a.volume+"</span></li><li><label for=\"\">\u6784\u4EF6\u91CD\u91CF:</label><span>"+a.weight+"</span></li><li><label for=\"\">\u6DF7\u51DD\u571F\u7B49\u7EA7:</label><span>"+a.level+"</span></li><li><label for=\"\">\u751F\u4EA7\u65E5\u671F:</label><span>"+a.productDate+"</span></li><li><label for=\"\">\u5165\u5E93\u8F66\u8F86:</label><span>"+a.inboundCars+"</span></li><li><label for=\"\">\u51FA\u5E93\u8F66\u8F86:</label><span>"+a.outboundCars+"</span></li><li><label for=\"\">\u533A\u57DF:</label><span>"+a.location+"</span></li><li><label for=\"\">\u5165\u5E93\u65E5\u671F:</label><span>"+a.inboundDate+"</span></li><li><label for=\"\">\u51FA\u5E93\u65E5\u671F:</label><span>"+a.outboundDate+"</span></li><li><label for=\"\">\u6784\u4EF6\u72B6\u6001:</label><span>"+a.status+"</span></li>";$(".ms ul").append(b),loaderQRcodeImg(a),layer.open({type:1,title:a.componentName,skin:"layui-layer-rim",area:["600px","580px"],content:$(".ms")})}function downloadQRcode(a){var b=a.proName+a.componentName;makeCode(a);var d=productQrcodeImg(a);downloadClick(d,b)}function makeCode(a){var b={id:a.id,proName:a.proName,buildingInfo:a.buildingInfo,componentName:a.componentName,productDate:a.productDate},d=JSON.stringify(b);$("#qrcode").empty(),$("#qrcode").qrcode({width:400,height:400,colorDark:"#000000",colorLight:"#ffffff",correctLevel:0,text:utf16to8(d)})}function utf16to8(a){var b,d,f,g;for(b="",f=a.length,d=0;d<f;d++)g=a.charCodeAt(d),1<=g&&127>=g?b+=a.charAt(d):2047<g?(b+=String.fromCharCode(224|15&g>>12),b+=String.fromCharCode(128|63&g>>6),b+=String.fromCharCode(128|63&g>>0)):(b+=String.fromCharCode(192|31&g>>6),b+=String.fromCharCode(128|63&g>>0));return b}function productQrcodeImg(a){var b=a.id,d=a.proName,f=a.buildingInfo,g=a.componentName,h=a.productDate,j=document.createElement("canvas");j.width=600,j.height=520;var k=j.getContext("2d");k.fillStyle="#FFFFFF",k.fillRect(0,0,600,500);var l=$("#qrcode canvas")[0],m=document.createElement("canvas");return m.width=440,m.height=520,m.getContext("2d").font="22px Georgia",m.getContext("2d").drawImage(j,0,0),m.getContext("2d").drawImage(l,20,80),m.getContext("2d").fillText("\u9879\u76EE:"+d,10,30),m.getContext("2d").fillText("\u697C\u5C42\u53F7:"+f,220,30),m.getContext("2d").fillText("\u6784\u4EF6:"+g,10,60),m.getContext("2d").fillText("\u751F\u4EA7\u65E5\u671F:"+h,220,60),m.toDataURL("image/png")}function downloadClick(a,b){var d=$("<a>"),f=d.attr("href",a).attr("download",b+".png");console.log(f),f[0].click()}function loaderQRcodeImg(a){a.proName+a.componentName;makeCode(a);var f=productQrcodeImg(a);$(".ms .contents .qcode img").attr("src",f)}