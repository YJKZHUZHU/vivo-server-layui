layui.define([ 'form', 'table'], function (exports) {
    var $ = layui.$
        ,form = layui.form
        ,table = layui.table;
    table.render({
        elem: '#LAY-user-manage'
        ,url:'http://localhost:4000/orderList'
        ,title: '用户数据表'
        ,cols: [[
            {field:'id', title:'商品ID', sort: true, align: 'center'}
            ,{field:'userName', title:'用户名', align: 'center'}
            ,{field:'name', title:'商品名称', align: 'center'}
            ,{field:'price', title:'订单价格', align: 'center'}
            ,{field:'img', title:'订单图片', align: 'center',style: 'height:100px',templet: function (d) {
                    return  '<div style="height: 100%;"><img src="'+d.img+'" alt=""></a></div>';
                }}
            ,{field:'listname', title:'支付方式', align: 'center'}
            ,{field:'ly', title:'留言', align: 'center'}
            ,{field:'orderTime', title:'提交订单时间', align: 'center'}
            ,{field:'orderNumber', title:'订单编号', align: 'center'}
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
    //监听行
    table.on('tool(LAY-user-manage)', function (obj) {
        var data = obj.data
        var params = {
            _id: data._id
        }
        if(obj.event === 'del'){
            layer.confirm('真的删除该订单吗', function(index){
                $.ajax({
                    url: 'http://localhost:4000/deleteOrder',
                    data: params,
                    type: 'post',
                    success: function (res) {
                        if (res.success && res.code == 0){
                            layer.msg(res.message, {icon: 6});
                            //发布成功后，清空表单
                            return false
                        }else {
                            layer.msg(res.message, {icon: 0});
                        }
                    },
                    error: function (err) {
                        console.log(err)
                    }
                })
                obj.del();
                layer.close(index);
            });
        }
    })
    //查询
    function searchUser(params) {
        $.ajax({
            url: 'http://localhost:4000/searchOrder',
            data: params,
            type: 'post',
            success: function (res) {
                if (res.success && res.code == 0){
                    layer.msg(res.message, {icon: 6});
                    table.render({
                        elem: '#LAY-user-manage',
                        data: res.data,
                        cols: [[
                            {field:'id', title:'商品ID', sort: true, align: 'center'}
                            ,{field:'userName', title:'用户名', align: 'center'}
                            ,{field:'name', title:'商品名称', align: 'center'}
                            ,{field:'price', title:'订单价格', align: 'center'}
                            ,{field:'img', title:'订单图片', align: 'center',style: 'height:100px',templet: function (d) {
                                    return  '<div style="height: 100%;"><img src="'+d.img+'" alt=""></a></div>';
                                }}
                            ,{field:'listname', title:'支付方式', align: 'center'}
                            ,{field:'ly', title:'留言', align: 'center'}
                            ,{field:'orderTime', title:'提交订单时间', align: 'center'}
                            ,{field:'orderNumber', title:'订单编号', align: 'center'}
                            ,{title: '操作', width: 150, align:'center', fixed: 'right', toolbar: '#table-useradmin-webuser'}
                        ]],
                        page: true
                    })
                }else {
                    layer.msg(res.message, {icon: 0});
                    table.render({
                        elem: '#LAY-user-manage',
                        data: res.data,
                        cols: [[
                            {field:'id', title:'商品ID', sort: true, align: 'center'}
                            ,{field:'userName', title:'用户名', align: 'center'}
                            ,{field:'name', title:'商品名称', align: 'center'}
                            ,{field:'price', title:'订单价格', align: 'center'}
                            ,{field:'img', title:'订单图片', align: 'center',style: 'height:100px',templet: function (d) {
                                    return  '<div style="height: 100%;"><img src="'+d.img+'" alt=""></a></div>';
                                }}
                            ,{field:'listname', title:'支付方式', align: 'center'}
                            ,{field:'ly', title:'留言', align: 'center'}
                            ,{field:'orderTime', title:'提交订单时间', align: 'center'}
                            ,{field:'orderNumber', title:'订单编号', align: 'center'}
                            ,{title: '操作', width: 150, align:'center', fixed: 'right', toolbar: '#table-useradmin-webuser'}
                        ]],
                        page: true
                    })
                }
            },
            error: function (err) {
                console.log(err)
            }
        })
    }
    //监听搜索
    form.on('submit(LAY-user-front-search)', function(data){
        // console.log(data)
        var data = data.field;
        console.log(data)
        searchUser(data)
    });
    exports('vivo-order', {})
})
