function n1(komentar, like, limit) {
    var articleId = window.location.href.split('/')[5];
    var likeId = $('p:contains("'+komentar+'")').siblings('span.js_replyComment').attr('data-comm-id');
    var type = like ? 'RecommendLike' : 'RecommendDislike';
    count = 0;
    var interval = setInterval(function() {
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        $.post('http://rs.n1info.com/Comment/'+type+'/'+likeId+'/'+articleId);
        count++;
        if (limit && count >= limit) clearInterval(interval);
    }, 5)
}


