//public
//用于规范化时间的函数
function dateformate(date) {
    let d = new Date(date);
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDay();
}

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

//随机推荐
$.ajax({
    type: 'get',
    url: '/admin/posts/randomRecommond',
    success: function (data) {
        //因为详情页面也有,所以我们加到publi.js下面
        let randomTpl = `
          {{each data}}
          <li>
            <a href="detail.html?id={{$value._id}}">
              <p class="title">{{$value.tittle}}</p>
              <p class="reading">阅读(819)</p>
              <div class="pic">
                <img src="{{$value.thumbnail}}" alt="">
              </div>
            </a>
          </li>
          {{/each}}
        `;
        let html = template.render(randomTpl, {data: data});
        $('#randomBox').html(html);
    }
})
//获取最新评论
$.ajax({
    type: 'get',
    url: '/admin/comments/lasted',
    success: function (data) {
        var commentTpl = `
   {{each data}}
    <li>
      <a href="detail.html?id={{$value.post_id}}">
        <div class="avatar">
          <img src="{{$value.author.avatar}}" alt="">
        </div>
        <div class="txt">
          <p>
            <span>{{$value.author.nickName}}</span>{{$imports.dateformate($value.createAt)}}说:
          </p>
          <p>{{$value.content}}</p>
        </div>
      </a>
    </li>
    {{/each}}
        `
        let html = template.render(commentTpl, {data: data});
        $('#commentLasted').html(html);
    }
})
//获取category
$.ajax({
    type: 'get',
    url: '/admin/categories',
    success: function (data) {
        let categoryTpl = `
             {{each data}}
            <li><a href="list.html?id={{$value._id}}"><i class="fa fa-glass"></i>{{$value.tittle}}</a></li>
            {{/each}}
        `
        let html = template.render(categoryTpl, {data: data});
        $('#category').html(html);
        $('#category1').html(html);
    }
})
//搜索模块
$('.searchForm').on('submit', function () {
    let keys = $(this).find('input[name="keys"]').val();
    location.href = 'search.html?keys=' + keys;
    return false;
})
