layui.define(['laypage', 'layer'], function (exports) {
    var laypage = layui.laypage
        ,$ = layui.$
        ,layer = layui.layer
        ,totalCount = null;
    // var btnRefresh = window.parent.document.querySelectorAll('.js-btn-refresh')
    function getGoodsList() {
        $.get('http://localhost:4000/goodDetail', function (res) {
            var html = ''
            totalCount = res.totalCount
            //总页数低于页码总数
            laypage.render({
                elem: 'demo0'
                ,count: res.totalCount //数据总数
            });
            for(var i in res.goodDetail) {
                html += `<div class="layui-col-md3 layui-col-sm4">
                            <div class="cmdlist-container" style="padding-bottom: 10px;">
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
    // $(btnRefresh).on('click', getGoodsList).click()

    $(document).on('click','.deleteGoods', function () {
        var that = this
        var params = {
            id: $(this).attr('data-goodId')
        }
        layer.confirm('真的删除该商品吗？', function(){
            layer.msg('正在删除', {icon: 16}, function(){
                $.ajax({
                    url: 'http://localhost:4000/publish/deleteGoods',
                    data: params,
                    type: 'post',
                }).then(res => {
                    if(!res || res.code !== 0){
                        layer.msg(res.message, {icon: 0});
                        return new Promise(() => {})
                    }
                    layer.msg(res.message, {icon: 1})
                }).then(()=>{
                    // $('#appendGoodsList').html("")
                    $(that).parent().parent().remove()
                    // $(btnRefresh).click()
                    // $(btnRefresh).on('click', getGoodsList).click()
                })
            });
        });
    })

    exports('publishGoodsList', {})
})
