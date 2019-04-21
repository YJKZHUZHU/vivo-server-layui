layui.define(function (exports) {
    layui.use(['form','upload'], function () {
        var form = layui.form,
            $ = layui.$,
            upload = layui.upload,
            layer = layui.layer
        var dataParams = {

        }
//    监听复选框
//         form.on('switch(switchTest)', function(data){
//             dataParams.isExit = this.checked
//         });
//    监听图片上传
        upload.render({
            elem: '#homeImg'
            ,url: 'http://localhost:4000/publish/uploadHomeImg'
            ,before: function(obj){
                //预读本地文件示例，不支持ie8
                obj.preview(function(index, file, result){
                    $('#img1').attr('src', result); //图片链接（base64）
                });
            }
            ,done: function(res){
                if(res.code == 200){
                    dataParams.homeImg = res.data
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
            elem: '#homeSwipe'
            ,url: 'http://localhost:4000/publish/uploadDetailImg'
            ,multiple: true
            ,number: 5
            ,before: function(obj){
                //预读本地文件示例，不支持ie8
                obj.preview(function(index, file, result){
                    if ($('.show-yjk').length < 5) {
                        $('#show-yjk').append('<img src="'+ result +'" alt="'+ file.name +'" class="layui-upload-img show-yjk">')
                    }
                });
                this.data.swiperLength = {
                    "swiperLength": $('.show-yjk').length+1
                }
                this.data.swiperLength = JSON.stringify(this.data.swiperLength)
            }
            ,done: function(res){
                //上传完毕
                if(res.code == 200 && res.success){
                    dataParams.homeSwipe = res.data
                    return layer.msg(res.message, {icon: 6});
                }else {
                    return layer.msg(res.message, {icon: 0});
                }
            }
        });
        upload.render({
            elem: '#detailImg'
            ,url: 'http://localhost:4000/publish/uploadDetailIntroduction'
            ,multiple: true
            ,number: 10
            ,before: function(obj){
                //预读本地文件示例，不支持ie8
                obj.preview(function(index, file, result){
                    if ($('.show-yjk-detail').length < 10) {
                        $('#show-yjk-detail').append('<img src="'+ result +'" alt="'+ file.name +'" class="layui-upload-img show-yjk-detail" >')
                    }
                });
                this.data.detailLength = {
                    "detailLength": $('.show-yjk-detail').length+1
                }
                this.data.detailLength = JSON.stringify(this.data.detailLength)
            }
            ,done: function(res,index){
                //上传完毕
                if(res.code == 200 && res.success){
                    dataParams.Images = res.data
                    layer.msg(res.message, {icon: 6});
                }else {
                    layer.msg(res.message, {icon: 0});
                }
            }
        });
        //接口数据
        var getDate = function (params) {
            //是否收藏默认不操作，true
            // if(params.close == 'on'){
            //     params.isExit = true
            // }else {
            //     params.isExit = dataParams.isExit
            // }
            var data = new Date()
            params.isExit = false
            params.publishGoodTime = data.pattern('yyyy-MM-dd hh:mm:ss')
            $.ajax({
                url: 'http://localhost:4000/publish/publishGoods',
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
        form.on('submit(yjk-goods)', function (data) {
            // console.log(data)
            getDate(data.field)
        })
        form.render(null,'yjk-goods')
    })
    exports('publishGoods',{})
})
