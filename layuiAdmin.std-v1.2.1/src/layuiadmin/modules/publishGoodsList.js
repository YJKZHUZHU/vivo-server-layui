layui.define(function (exports) {
    layui.use(['laypage', 'layer'], function(){
        var laypage = layui.laypage
            ,$ = layui.$
            ,layer = layui.layer
            ,totalCount = null;
        $(document).on('click','.deleteGoods', function () {
            var params = {
                id: $(this).attr('data-goodId')
            }
            layer.confirm('真的删除该商品吗？', function(){
                layer.msg('正在删除', {icon: 16}, function(){
                    $.ajax({
                        url: 'http://localhost:4000/publish/deleteGoods',
                        data: params,
                        type: 'post',
                        success: function (res) {
                            if (res.success && res.code == 200){
                                layer.msg(res.message, {icon: 1})

                                //发布成功后，清空表单
                                // return false
                            }else {
                                layer.msg(res.message, {icon: 0});
                            }

                        },
                        error: function (err) {
                            console.log(err)
                        }
                    })
                    $('#appendGoodsList').remove()
                    getGoodsList()
                });
            });

        })
        var getGoodsList = function() {

            $.get('http://localhost:4000/goodDetail', function (res) {
                totalCount = res.totalCount
                //总页数低于页码总数
                laypage.render({
                    elem: 'demo0'
                    ,count: res.totalCount //数据总数
                });
                for(var i in res.goodDetail) {
                    var html = ''
                    html += `<div class="layui-col-md3 layui-col-sm4">
            <div class="cmdlist-container">
                <a href="javascript:;">
                    <img src="${res.goodDetail[i].homeImg}" style="width: 100%">
                </a>
                <a href="javascript:;">
                    <div class="cmdlist-text">
                        <p class="info">${res.goodDetail[i].homeTitle}</p>
                        <div class="price">
                            <b>￥${res.goodDetail[i].homePrice}</b>
                            <p>
                                ¥
                                <del>${res.goodDetail[i].homePrice}</del>
                            </p>
                            <span class="flow">
                      <i class="layui-icon layui-icon-rate"></i>
                      ${res.goodDetail[i].id}
                    </span>
                        </div>
                    </div>
                </a>
                 <button class="layui-btn layui-btn-danger deleteGoods" data-goodId="${res.goodDetail[i].id}" style="margin-left: 40%">删除</button>
            </div>
        </div>`
                }
                $('#appendGoodsList').append(html)
            })
        }
        getGoodsList()
    });
    exports('publishGoodsList', {})
})
