$('#categories').on('submit', function () {
    let form = $(this).serialize();
    console.log(form)
    $.ajax({
        type: 'post',
        url: '/admin/categories',
        data: form,
        success: function () {
            location.reload();
        }
    })
    return false;
})
$.ajax({
    type: 'get',
    url: '/admin/categories',
    success: function (data) {
        let html = template('categoriesTpl', {data: data});
        $('#tbody').html(html);
    }
})
//下来就是编辑模块
$('#tbody').on('click', '.edit', function () {
    let id = $(this).data('id');
    $.ajax({
        type: 'get',
        url: '/admin/categories/' + id,
        success: function (data) {
            //得到数据,把数据放到模板引擎里面的
            let template1 = template('formTpl', {data: data});
            $('#modify').html(template1);
        }
    })
})
//接下来就是当表单提交的时候
$('#modify').on('submit', '#modifyCategories', function () {
    let form = $(this).serialize();
    let id = $(this).data('id');
    $.ajax({
        type: 'post',
        //根据id修改用户信息
        url: '/admin/categories/' + id,
        data: form,
        success: function () {
            //修改成功,重新刷新页面
            location.reload();
        }
    })
    return false;
})
//根据id删除用户信息
$('#tbody').on('click', '.delete', function () {
    let id = $(this).data('id');
    if (confirm('确认要删除该用户')) {
        $.ajax({
            type: 'delete',
            url: '/admin/categories/' + id,
            success: function () {
                location.reload();
            }
        })
    }
})
//批量删除
$('#deleteMany').on('click', function () {
    let arr = [];
    $('#tbody').find('.select:checked').each(function (index, val) {
        arr.push($(val).data('id'));
    })
    $.ajax({
        type: 'delete',
        url: '/admin/categories/' + arr.join('-'),
        success: function () {
            location.reload();
        }
    })
})
