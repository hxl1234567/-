$('#logout').on('click', function () {
    if (confirm('是否确认退出')) {
        //确认退出
        $.ajax({
            type: 'get',
            url: '/admin/logout',
            success: (result) => {
                //退出成功加载到登录页面
                location.href = '/admin/login.html';
            },
            error: () => {
                //退出失败,什么也不做
            }
        })
    }
})