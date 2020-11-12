//上传照片
$('#chooseImg').on('change', function () {
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
            $('#image').show().attr('src', data);
        }
    })
})
//表单提交
$('#slideForm').on('submit', function () {
    let form = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/admin/slides',
        data: form,
        success: function (data) {
            location.reload();
        }
    })
    return false;
})
//当页面加载的时候加载表单
$.ajax({
    type: 'get',
    url: '/admin/slides',
    success: function (data) {
        let html = template('slideTpl', {data: data});
        $('#tbody').html(html);
    }
});
//点击删除按钮
$('#tbody').on('click', '.delete', function () {
    let id = $(this).data('id');
    $.ajax({
        type: 'delete',
        url: '/admin/slides/' + id,
        success: function (data) {
            location.reload();
        }
    })
})