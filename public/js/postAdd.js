//首先获取所属分类
$.ajax({
    type: 'get',
    url: '/admin/categories',
    success: function (data) {
        //我们得到了categories数组
        let html = template('categoryTpl', {data: data});
        $('#category').html(html);
    }
})
//接下来就是文件上传功能,当我们选择文件的时候,把这个文件传到服务器
$('#modifyForm').on('change', '#feature', function () {
    //得到文件
    let file = this.files[0];
    let formData = new FormData();
    formData.append('file', file);
    $.ajax({
        type: 'post',
        url: '/admin/upload',
        data: formData,
        //告诉$.ajax()不要解析请求参数
        processData: false,
        //不要设置请求参数的类型
        contentType: false,
        success: function (data) {
            //\uploads\upload_00201ed49349f4d5408d5788827b380a.png post-add.html:152:19
            //得到了地址,我们把这个放到隐藏域中
            $('#thumbnail').val(data);
            $('#coverImg').show().attr('src', data);
        },
        error: function (err) {
            console.log(err)
        }
    })
})
//接下来就是表单的提交了,当提交成功后,我们加载到文章列表页面
$('#postAdd').on('submit', function () {
    let form = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/admin/posts',
        data: form,
        success: function (data) {
            location.href = '/admin/posts.html'
        }
    })
    return false;
})
//现在看是修改页面了
//首先通过浏览器的地址栏获取请求参数


//根据名称获取浏览器的参数
function getUrlParameter(name) {
    //得到请求参数location.search
    let str = location.search.substr(1).split("&");
    for (let i = 0; i < str.length; i++) {
        t = str[i].split('=');
        if (t[0] === name) {
            return t[1];
        }
    }
    //如果没有这个name 则返回-1
    return -1;
}

let id = getUrlParameter('id');
//id存在
if (id !== -1) {
    $.ajax({
        type: 'get',
        url: '/admin/posts',
        data: {
            id: id
        },
        success: function (data) {
            //首先获取所属分类
            $.ajax({
                type: 'get',
                url: '/admin/categories',
                success: function (categories) {
                    data.records[0].categories = categories;
                    console.log(data);
                    let html = template('formTpl', {data: data.records[0]});
                    $('#modifyForm').html(html);
                }
            })
        }
    })
}
$('#modifyForm').on('submit', '#modifyPosts', function () {
    //把这个数据修改
    let id = $(this).data('id');
    console.log(id);
    let formData = $(this).serialize();
    $.ajax({
        type: 'put',
        url: '/admin/posts/' + id,
        data: formData,
        success: function (data) {
            location.href = '/admin/posts.html'
        }
    })
    return false;
})
