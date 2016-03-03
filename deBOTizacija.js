'use strict';

var fs = require('fs');
var curl = require('curlrequest');
var random_useragent = require('random-useragent');
var extend = require('util')._extend;

class Voter {
    static vote(voter) {
        /*encode*/

        var options = {
            url: voter.url,
            retries: 5,
            headers: voter.headers,
            timeout: 15,
            proxy: voter.proxy,
            method: voter.method
        };

        options.headers['User-Agent'] = random_useragent.getRandom();

        if (voter.data)
            options.data = voter.data;

        curl.request(options, function(err, res) {
            // if(callback) callback(err, res);
        });
    }
}

class Vote {
    constructor(proxy) {
        this.proxy = proxy;
        this.setHeaders();
    }

    setHeaders() {
        this.headers = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept':'*/*',
            'Accept-Language':'en-US,en;q=0.5',
            'Accept-Encoding':'gzip, deflate'
        }
    }
}

class JvVote extends Vote {
    constructor(url, proxy) {
        super(proxy);
        this.url = url;
        this.method = 'GET';
        this.headers = extend({'Host': 'www.juznevesti.com'}, this.headers);
    }
}

class B92Vote extends Vote {
    constructor(data, proxy) {
        super(proxy);
        this.url = 'http://www.b92.net/komentari/tick.php';
        this.data =  extend({lang: 'srpski'}, data);
        this.method = 'POST';
        this.headers = extend({'Host': 'www.b92.net', 'Origin' : 'http://www.b92.net', 'Referer': 'http://www.b92.net'}, this.headers);
    }
}

class NovostiVote extends Vote {
    constructor(data, proxy) {
        super(proxy);
        this.url = 'http://www.novosti.rs/php/rate/rate.php';
        this.data =  data;
        this.method = 'POST';
    }
}

class KurirVote extends Vote {
    constructor(data, proxy) {
        super(proxy);
        this.url = data.url;
        this.data =  data;
        this.method = 'POST';
    }
}

class VoterFactory {
    static create(data, proxy) {
        if (data.url && data.url.indexOf('juznevesti.com') > -1)
            return new JvVote(data.url, proxy);
        else if(data.url && data.url.indexOf('kurir.rs') > -1)
            return new KurirVote(data, proxy);
        else if(data.type)
            return new InformerVote(data, proxy);
        else if(data.comment_id)
            return new PolitikaVote(data, proxy);
        else if(data.item_type)
            return new NovostiVote(data, proxy);
        else if(data.entry_id)
            return new BlicVote(data, proxy);
        else
            return new B92Vote(data, proxy);
    }
}

function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}


function doVoting(params, limit) {
    if (!limit) limit = 10;
    fs.readFile('proxies.txt', 'utf8', (err, data) => {
        if (err) throw err;

        var proksiji = [];

        data.split('\n').forEach(proksi => proksiji.push(proksi.trim()));

        var counter = 0;

        proksiji = shuffle(proksiji);
        if (limit)
            proksiji = proksiji.slice(0, limit);

        console.log('Broj proksija: ' + proksiji.length);

        proksiji.forEach(proksi => {

            var voter = VoterFactory.create(params, proksi);
            Voter.vote(voter, curl);

        })

    });
}

doVoting({id: 19649279, thumbs: 'up'}, 50);
