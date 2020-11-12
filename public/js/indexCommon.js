//热门推荐
$.ajax({
    type: 'get',
    url: '/admin/posts/hot',
    success: function (data) {
        let hotTpl = `
          {{each data}}
          <li>
            <a href="/detail.html?id={{$value._id}}">
            <img src="{{$value.thumbnail}}" alt="">
            <span>{{$value.tittle}}</span>
            </a>
          </li>
          {{/each}}
        `
        let html = template.render(hotTpl, {data, data});
        $('#hots').html(html);
    }
});