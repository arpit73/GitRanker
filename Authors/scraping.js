const rp = require('request-promise');
const cheerio = require('cheerio');

const options = {
    uri: `https://github.com/arpit73`,
    headers: {
        'User-Agent': 'Request-Promise'
    },
    transform: body => cheerio.load(body)
};

rp(options)
    .then($ => {
        var element = $('.f4.text-normal.mb-2').text();
        var numbers = element.match(/\d+/g).map(Number);
        console.log(numbers);
    })
    .catch(err => {
        console.log(err);
    });
