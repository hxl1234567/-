//获取站点内容统计
//获取文章
$.ajax({
    type: 'get',
    url: '/admin/posts/count',
    success: function (data) {
        $('#post').html(' <strong>' + data.postNum + '</strong>篇文章（<strong>' + data.draftNum + '</strong>篇草稿）')
    }
})
/*  //获取文章
  $.ajax({
    type:'get',
    url:'/admin/posts/count',
    success:function (data) {
      $('#category').html(' <strong>'+data.postNum+'</strong>篇文章（<strong>'+data.draftNum+'</strong>篇草稿）')
    }
  })*/
$.ajax({
    type: 'get',
    url: '/admin/categories/count',
    success: function (data) {
        $('#category').html(' <strong>' + data.category + '</strong>个分类')
    }
})
//获取评论
$.ajax({
    type: 'get',
    url: '/admin/comments/count',
    success: function (data) {
        $('#comment').html('<strong>' + data.commentNum + '</strong>条评论（<strong>' + data.commentshenhe + '</strong>条待审核）')
    }
})
