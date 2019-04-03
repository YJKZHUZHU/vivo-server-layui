layui.use(['form','upload'], function () {
    var form = layui.form,
        $ = layui.$,
        upload = layui.upload,
        layer = layui.layer
    var dataParams = {}
//    监听复选框
    form.on('switch(switchTest)', function(data){
        dataParams.sc = this.checked
        console.log(dataParams.sc)
    });
//    监听图片上传
    upload.render({
        elem: '#newsImg'
        ,url: 'http://localhost:4000/publishArticle/uploadNewsImg'
        ,before: function(obj){
            //预读本地文件示例，不支持ie8
            obj.preview(function(index, file, result){
                $('#show-newsImg').attr('src', result); //图片链接（base64）
            });
        }
        ,done: function(res){
            if(res.code == 200){
                // dataParams.newsImg = res.data
                return layer.msg('图片上传成功');
            }
        }
        ,error: function(){
            //演示失败状态，并实现重传
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function(){
                uploadInst.upload();
            });
        }
    });
    upload.render({
        elem: '#newsImgDetail'
        ,url: 'http://localhost:4000/publishArticle/uploadNewsDetailImg'
        ,multiple: true
        ,before: function(obj){
            //预读本地文件示例，不支持ie8
            obj.preview(function(index, file, result){
                if ($('.show-yjk-detail').length < 10) {
                    $('#show-newsImgDetail').append('<img src="'+ result +'" alt="'+ file.name +'" class="layui-upload-img show-yjk-detail" >')
                }
            });
            this.data.newsDetailLength = {
                "newsDetailLength": $('.show-yjk-detail').length+1
            }
            this.data.newsDetailLength = JSON.stringify(this.data.newsDetailLength)
        }
        ,done: function(res,index){
            //上传完毕
            if(res.code == 200 && res.success){
                // dataParams.Images = res.data
                layer.msg(res.message, {icon: 6});
            }else {
                layer.msg(res.message, {icon: 0});
            }
        }
    });
    //接口数据
    var getDate = function (params) {
        var data = new Date()
        params.newsTime = data.pattern('yyy-MM-dd hh:mm:ss')
        //是否收藏默认不操作，true
        if(params.close == 'on'){
            params.sc = true
        }else {
            params.sc = dataParams.sc
        }
        console.log(JSON.stringify(params))
        $.ajax({
            url: 'http://localhost:4000/publishArticle/publishAritcle',
            data: params,
            type: 'post',
            success: function (res) {
                if (res.success && res.code == 200){
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
    }
    //    监听表单
    form.on('submit(yjk-article)', function (data) {
        console.log(JSON.stringify(data.field))
        getDate(data.field)
    })
    form.render(null,'yjk-article')
})