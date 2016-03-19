var injected = function() {
  //izvrsava se na document ready, ali kao da mondo re renderuje komentare, pa obrise ove nove dataemente
  //zato cekamo pola sekunde
  setTimeout(function() {
    $('.thumbs_up_down').prepend(
      $('<input type="number" value="10" size="3" max="100" step="10">').css({
        float: 'left',
        width: '50px',
        textAlign: 'center'
      })
    );
    $('.thumbs_up_down a').on('click', function(e) {
      e.preventDefault();
      var data = e.target.parentNode.id.split('_');
      var action = data[0] === 'like' ? 'RecommendLike' : 'RecommendDislike';
      var id = data[1];

      var count = 0;
      var limit = ~~$(e.target).parent().siblings('input').val();
      var interval = setInterval(function() {
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        comment_recommend(parseInt(id), action);
        count++;
        if (limit && count >= limit) clearInterval(interval);
      }, 5);
    });
  }, 500);
};

var script = document.createElement('script');
script.textContent = '(' + injected.toString() + ')()';
document.head.appendChild(script);
script.parentNode.removeChild(script);
