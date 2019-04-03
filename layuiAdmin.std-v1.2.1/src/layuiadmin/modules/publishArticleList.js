layui.use(['laypage', 'layer'], function(){
    var laypage = layui.laypage
        ,$ = layui.$
        ,layer = layui.layer
        ,totalCount = null;
    var getArticleList = function() {
        $.get('http://localhost:4000/news', function (res) {
            totalCount = res.totalCount
            //总页数低于页码总数
            laypage.render({
                elem: 'demo0'
                ,count: res.totalCount //数据总数
            });
            var html = ''
            for(var i in res.news) {
                html += `<div class="layui-col-md2 layui-col-sm4">
            <div class="cmdlist-container">
                <a href="javascript:;">
                    <img src="${res.news[i].newsImg}">
                </a>
                <a href="javascript:;">
                    <div class="cmdlist-text">
                        <p class="info">${res.news[i].newsCon}</p>
                        <div class="price">
                            <b>${res.news[i].newsTime}</b>
                     
                            <span class="flow">
                      <i class="layui-icon layui-icon-rate"></i>
                      ${res.news[i].id}
                    </span>
                        </div>
                    </div>
                </a>
            </div>
        </div>`
            }
            $('#appendArticleList').append(html)
        })
    }
    getArticleList()


});
