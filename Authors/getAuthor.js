const rp = require('request-promise');

let Author = {
    numberOfRepos: 0,
    numberOfCommits: 0
};

const options = {
    uri: `https://api.github.com/users/arpit73/repos`,
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};

rp(options)
    .then(repos => {
        Author.numberOfRepos = repos.length;

        let newOptions = options;
        newOptions.uri = repos[7].contributors_url;
        return newOptions;
    })
    .then(newOptions => {
        let contributor = rp(newOptions);
        return contributor;
    })
    .then(contributor => {
        let total = 0;

        contributor.forEach(item => {
            total += item.contributions;
        });

        Author.numberOfCommits = total;
        console.log(Author);
    })
    .catch(err => {
        console.log('Error Happened');
        console.log(err);
    });

//console.log(Author);
