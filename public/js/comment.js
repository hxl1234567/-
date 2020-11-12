//用于规范化时间的函数
function dateformate(date) {
    let d = new Date(date);
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDay();
}

template.defaults.imports.dateformate = dateformate;
//获取评论,加载到页面上
$.ajax({
    type: 'get',
    url: '/admin/comments',
    success: function (data) {
        let html = template('commentTpl', {data: data});
        $('#tbody').html(html);
        let pageHtml = template('pageTpl', {data: data});
        $('#page').html(pageHtml);
    }
})

function choosepage(page) {
    console.log(page)
    $.ajax({
        type: 'get',
        url: '/admin/comments',
        data: {
            page: page
        },
        success: function (data) {
            console.log(data)
            let html = template('commentTpl', {data: data});
            $('#tbody').html(html);
            let pageHtml = template('pageTpl', {data: data});
            $('#page').html(pageHtml);
        }
    })
}

//点击编辑按钮修改状态
$('#tbody').on('click', '.edit', function () {
    let id = $(this).data('id');
    let state = $(this).data('state');
    $.ajax({
        type: 'put',
        url: '/admin/comments/' + id,
        data: {
            state: state == '0' ? '1' : '0'
        },
        success: function (data) {
            location.reload();
        }
    })
})
//根据id删除评论
$('#tbody').on('click', '.delete', function () {
    if (confirm('确定要删除此条评论?')) {
        let id = $(this).data('id');
        $.ajax({
            type: 'delete',
            url: '/admin/comments/' + id,
            success: function () {
                location.reload();
            }
        })
    }
})