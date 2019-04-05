layui.use(['laypage', 'layer'], function(){
    var laypage = layui.laypage
        ,$ = layui.$
        ,layer = layui.layer
        ,totalCount = null;
    var getGoodsList = function() {
        $.get('http://localhost:4000/goodDetail', function (res) {
            totalCount = res.totalCount
            //总页数低于页码总数
            laypage.render({
                elem: 'demo0'
                ,count: res.totalCount //数据总数
            });
            var html = ''
            for(var i in res.goodDetail) {
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
            </div>
        </div>`
            }
            $('#appendGoodsList').append(html)
        })
    }
    getGoodsList()


});
