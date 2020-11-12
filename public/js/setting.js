//上传照片
$('#modify').on('change', '#site_logo', function () {
    let file = this.files[0];
    let formData = new FormData();
    formData.append("file", file);
    $.ajax({
        type: 'post',
        url: '/admin/upload',
        data: formData,
        //设置$.ajax()不要解析请求参数
        processData: false,
        //不要设置请求参数
        contentType: false,
        success: function (data) {
            $('#hidden').val(data);
            $('#image').attr('src', data);
        }
    })
})
//上传表单
$('#settingForm').on('submit', function () {
    let form = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/admin/settings',
        data: form,
        success: function (data) {
            location.reload();
        }
    })
    return false;
})
//加载表单
$.ajax({
    type: 'get',
    url: '/admin/settings',
    success: function (data) {
        //数据存在
        if (data) {
            let html = template('settingTpl', {data: data});
            $('#modify').html(html);
        }
    }
})
//修改表单
$('#modify').on('submit', '#settingForm', function () {
    let id = $(this).data('id');
    let form = $(this).serialize();
    $.ajax({
        type: 'put',
        url: '/admin/settings/' + id,
        data: form,
        success: function (data) {
            location.reload();
        }
    })
    return false;
})