layui.define(['laypage', 'layer'],function (exports) {
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
                    html += `<div class="layui-col-md3 layui-col-sm4">
            <div class="cmdlist-container" style="padding-bottom: 10px;">
                <a href="javascript:;">
                    <img src="${res.news[i].newsImg}" style="height: 120px;">
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
                <button class="layui-btn layui-btn-danger deleteArticle" data-articleId="${res.news[i].id}" style="margin-left: 40%">删除</button>
            </div>
        </div>`
                }
                $('#appendArticleList').append(html)
            })
        }
        getArticleList()
    $(document).on('click','.deleteArticle', function () {
        var that = this
        var params = {
            id: $(this).attr('data-articleId')
        }
        layer.confirm('真的删除该文章吗？', function(){
            layer.msg('正在删除文章', {icon: 16}, function(){
                $.ajax({
                    url: 'http://localhost:4000/publishArticle/deleteArticle',
                    data: params,
                    type: 'post',
                }).then(res => {
                    if(!res || res.code !== 0){
                        layer.msg(res.message, {icon: 0});
                        return new Promise(() => {})
                    }
                    layer.msg(res.message, {icon: 1})
                }).then(()=>{
                    $(that).parent().parent().remove()
                })
            });
        });
    })
    exports('publishArticleList',{})
})
