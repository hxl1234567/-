$('#modifyForm').on('submit', function () {
    let form = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/admin/passwordReset',
        data: form,
        success: function () {
            location.href = '/admin/logout';
        },
        error: function (err) {
            alert('新密码和重复新密码不相同,请重新输出');
            location.reload();
        }
    })
    return false;
})
