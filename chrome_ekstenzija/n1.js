var injected = function() {
  $('.comment-unit .comment-likes').before(
    $('<input type="number" value="10" size="3" max="100" step="10">').css({
      float: 'left',
      width: '50px',
      textAlign: 'center',
      marginRight: '5px'
    })
  );

  $('.js_toggleLike').on('click', function(e) {
    e.preventDefault();
    var self = this;
    var data = $(this).data();

    var count = 0;
    var limit = ~~$(this).siblings('input').val() - 1;

    var interval = setInterval(function() {
      document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
      $.post('http://rs.n1info.com/Comment/'+data.action+'/'+data.comid+'/'+data.docmeniid);
      count++;
      if (limit && count >= limit) {
        $(self).children('.js_likeNum').html(~~$(self).children('.js_likeNum').html() + limit);
        clearInterval(interval);
      }
    }, 5);
  });
};

var script = document.createElement('script');
script.textContent = '(' + injected.toString() + ')()';
document.head.appendChild(script);
script.parentNode.removeChild(script);
