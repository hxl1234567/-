$('#form').on('submit', function () {
    let formdata = $(this).serialize();
    //我们得到了数据,发送给服务器
    $.ajax({
        type: 'post',
        url: '/admin/users',
        data: formdata,
        success: function (res) {
            // console.log(res);
            //创建用户成功
            location.reload();
        },
        error: function (err) {
            console.log(err)
        }
    })

    return false;
})
$('#file').on('change', function () {
    //当我们得到这个文件的时候,把这个东西
    let file = this.files[0];
    let formData = new FormData();
    formData.append('file', file);
    //把这个文件提交到服务器,服务器返回一个地址,并且实时显示,把地址给隐藏域
    $.ajax({
        type: 'post',
        url: '/admin/upload',
        data: formData,
        //告诉$.ajax方法不要解析请求对象
        processData: false,
        //告诉$.ajax()方法不要设置请求对象的类型
        contentType: false,
        success: function (data) {
            //我们得到了图片的地址
            $('#fileImg').attr('src', data);
            // console.log( document.querySelector('#fileImg'))
            $('#avatar').val(data);
        },
        error: function (err) {
            console.log(err)
        }
    })
})
//用于展示用户列表,在页面加载的时候刷新
$.ajax({
    type: 'get',
    url: '/admin/users',
    success: function (data) {
        //这里data得到的就是用户列表页面
        //我们把这个用户列表页面拼接到页面中
        let html = template('tql', {data: data});
        $('#tbody').html(html);
    },
    error: function (err) {
        console.log(err);
    }
})
//因为是给所有的#edit添加点击事件,因为#edit是后面代码生成的,所以我们使用事件委托
$('#tbody').on('click', '.edit', function () {
    let id = $(this).data('id');
    $.ajax({
        //修改
        type: 'get',
        url: '/admin/users/' + id,
        success: function (data) {
            //我们通过id得到了user对象
            //把对象拼接到模板里面
            let html = template('modifyTpl', data);
            $('#modify').html(html);
        }
    })
})