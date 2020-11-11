//用于规范化时间的函数
function dateformate(date) {
    let d = new Date(date);
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDay();
}

template.defaults.imports.dateformate = dateformate;

//查询所有文章的信息
$.ajax({
    type: 'get',
    url: '/admin/posts',
    success: function (data) {
        //我们得到了数据,加载到页面中
        let html = template('postTpl', {data: data});
        $('tbody').html(html);
        let page = template('pageTpl', {data: data});
        $('#choosePage').html(page);
    }
})

function choosepage(page) {
    $.ajax({
        type: 'get',
        url: '/admin/posts',
        data: {
            page: page
        },
        success: function (data) {
            //我们得到了数据,加载到页面中
            let html = template('postTpl', {data: data});
            $('tbody').html(html);
            let page = template('pageTpl', {data: data});
            $('#choosePage').html(page);
        }
    })
}

//筛选文章
$.ajax({
    type: 'get',
    url: '/admin/categories',
    success: function (data) {
        let filtrate = template('filtrateTpl', {data: data});
        $('#filtrate').html(filtrate);
    }
})
//筛选表单提交
$('#filtrate').on('submit', function () {
    let html = $(this).serialize();
    $.ajax({
        type: 'get',
        url: '/admin/posts',
        data: html,
        success: function (data) {
            //我们得到了数据,加载到页面中
            let html = template('postTpl', {data: data});
            $('tbody').html(html);
            let page = template('pageTpl', {data: data});
            $('#choosePage').html(page);
        }
    })
    return false;
})
//开始编辑和删除操作
/*$('#tbody').on('click','.edit',function () {
  let id = $(this).data('id');
  location.href = '/admin/post-add.html?id='
});*/
//删除
$('#tbody').on('click', '.delete', function () {
    if (confirm('是否确认删除这个文章?')) {
        //确认删除
        let id = $(this).data('id');
        $.ajax({
            type: 'delete',
            url: '/admin/posts/' + id,
            success: function (data) {
                location.reload();
            }
        })
    }
})


