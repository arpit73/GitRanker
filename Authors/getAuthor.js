const rp = require('request-promise');

var options = {
    uri: `https://api.github.com/users/arpit73/repos`,
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};

rp(options)
    .then(repos => {
        console.log(repos.length);
        var num = repos[0].contributors_url;
        console.log(num);
    })
    .catch(err => {
        console.log('Error happened');
        console.log(err);
    });
