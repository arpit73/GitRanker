const rp = require('request-promise');

const options = {
    uri: `https://api.github.com/users/arpit73/repos`,
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};

rp(options)
    .then(repos => {
        console.log(repos.length);
        let newOptions = {
            uri: `${repos[0].contributors_url}`,
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true // Automatically parses the JSON string in the response
        };
        return newOptions;
    })
    .then(newOptions => {
        let contributor = rp(newOptions);
        return contributor;
    })
    .then(contributor => {
        console.log(contributor[0].contributions);
    })
    .catch(err => {
        console.log('Error happened');
        console.log(err);
    });
