function mondo(komentar, like, limit) {
    if (!limit) limit = 5;
    var likeId = $('p:contains("' + komentar + '")').siblings('div.thumbs_up_down:first').find('a.like').attr('id').slice(5);
    count = 0;
    var interval = setInterval(function() {
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        comment_recommend(parseInt(likeId), like == 1 ? 'RecommendLike' : 'RecommendDislike');
        count++;
        if (limit && count >= limit) clearInterval(interval);
    }, 5)
}

