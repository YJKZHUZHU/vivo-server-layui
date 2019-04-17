layui.define([ 'form', 'table'], function (exports) {
    var $ = layui.$
        ,form = layui.form
        ,table = layui.table;
    table.render({
        elem: '#LAY-user-manage'
        ,url:'http://localhost:4000/userList'
        ,title: '用户数据表'
        ,cols: [[
            {field:'_id', title:'ID', sort: true, align: 'center'}
            ,{field:'name', title:'用户名', align: 'center'}
            ,{field:'pattonLoginOrRegisterTime', title:'注册时间', align: 'center'}
            ,{title: '操作', width: 150, align:'center', fixed: 'right', toolbar: '#table-useradmin-webuser'}
        ]]
        ,page: true
        ,response: {
            statusCode: 200 //重新规定成功的状态码为 200，table 组件默认为 0
        }
        ,parseData: function(res){ //将原始数据解析成 table 组件所规定的数据
            const data = JSON.parse(JSON.stringify(res.data).replace(/phone/g,'name'))
            return {
                "code": res.code, //解析接口状态
                "msg": res.msg, //解析提示文本
                "count": res.count, //解析数据长度
                "data": data //解析数据列表
            };
        }
    });
    exports('vivo-user', {})
})
