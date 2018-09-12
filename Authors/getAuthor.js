const rp = require('request-promise');
const data = require('../Data/results.json');

console.log(data[0].git1);

let Team = {
    teamName: '',
    members: [
        {
            commits: {
                numberOfRepos: 0,
                numberOfCommits: 0
            }
        }
    ]
};

getAuthor = data => {
    data.forEach(registration => {
        let teamName = registration['Team Name'];
        let handles = [
            registration.git1,
            registration.git2,
            registration.git3,
            registration.git4,
            registration.git5
        ];
        handles.map(handle => handle.slice(19, handle.length));
    });

    let options = {
        uri: `https://api.github.com/users/${handle}/repos`,
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
};
