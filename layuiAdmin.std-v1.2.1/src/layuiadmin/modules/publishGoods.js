layui.use(['form','upload'], function () {
    var form = layui.form,
        $ = layui.$,
        upload = layui.upload,
        layer = layui.layer
    var dataParams = {
        // homeImg: '',
        // homeSwip: '',
        // imgs: '',
        // isExit: ''
    }
//    监听复选框
    form.on('switch(switchTest)', function(data){
        dataParams.isExit = this.checked
    });
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
    // var demoListView = $('#homeSwipeList')
    //     swiperLength = $('.yjk-detail-swipe').length
    //     ,uploadListIns = upload.render({
    //     elem: '#homeSwipe'
    //     // ,url: 'http://localhost:4000/publish/uploadDetailImg?swiperLength='+$('#homeSwipeList').children.length
    //     ,url: 'http://localhost:4000/publish/uploadDetailImg'
    //     ,before: function (obj) {
    //             this.data.swiperLength = {
    //                 "swiperLength": $('.yjk-detail-swipe').length
    //             }
    //             this.data.params = JSON.stringify(this.data.params)
    //         }
    //     ,multiple: true
    //     ,auto: false,
    //     accept: 'images'
    //     ,bindAction: '#doHomeSwipe'
    //     ,choose: function(obj){
    //         var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
    //         //读取本地文件
    //         obj.preview(function(index, file, result){
    //             var tr = $(['<tr id="upload-'+ index +'" class="yjk-detail-swipe">'
    //                 ,'<td>'+ file.name +'</td>'
    //                 ,'<td>'+ (file.size/1014).toFixed(1) +'kb</td>'
    //                 ,'<td>等待上传</td>'
    //                 ,'<td>'
    //                 ,'<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
    //                 ,'<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>'
    //                 ,'</td>'
    //                 ,'</tr>'].join(''));
    //             //单个重传
    //             tr.find('.demo-reload').on('click', function(){
    //                 obj.upload(index, file);
    //             });
    //
    //             //删除
    //             tr.find('.demo-delete').on('click', function(){
    //                 delete files[index]; //删除对应的文件
    //                 tr.remove();
    //                 uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
    //             });
    //             demoListView.append(tr);
    //         });
    //     }
    //     ,done: function(res, index, upload){
    //         if(res.code == 200){ //上传成功
    //             dataParams.homeSwiper = res.data
    //             var tr = demoListView.find('tr#upload-'+ index)
    //                 ,tds = tr.children();
    //             tds.eq(2).html('<span style="color: #5FB878;">'+res.message+'</span>');
    //             tds.eq(3).html(''); //清空操作
    //             return delete this.files[index]; //删除文件队列已经上传成功的文件
    //         }
    //         this.error(res,index, upload);
    //     }
    //     ,error: function(res,index, upload){
    //         $('#homeSwipeList').remove()
    //         layer.msg(res.message, {icon: 0});
    //     }
    // });
    upload.render({
        elem: '#homeSwipe'
        ,url: 'http://localhost:4000/publish/uploadDetailImg'
        ,multiple: true
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
        if(params.close == 'on'){
            params.isExit = true
        }
        console.log(dataParams)
        params.homeImg = JSON.stringify(dataParams.homeImg)
        params.homeSwipe = JSON.stringify(dataParams.homeSwipe)
        params.Images = JSON.stringify(dataParams.Images)
        // params = Object.assign(params, dataParams)
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
        console.log(data)
        getDate(data.field)
    })
    form.render(null,'yjk-goods')
})
