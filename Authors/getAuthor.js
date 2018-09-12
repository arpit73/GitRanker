const request = require('request-promise');
const data = require('../Data/results.json');

// Schema for Storage
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

        handles = handles.filter(handle => handle.length > 0);
        handles = handles.map(handle => handle.slice(19, handle.length));

        handles.forEach(handle => {
            let options = {
                uri: `https://api.github.com/users/${handle}/repos`,
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            };
            request(options)
                .then(repos => {
                    let newOptions = options;
                    newOptions.uri = repos[7].contributors_url;
                    return newOptions;
                })
                .then(newOptions => {
                    let contributor = request(newOptions);
                    return contributor;
                })
                .then(contributor => {
                    let total = 0;

                    contributor.forEach(item => {
                        total += item.contributions;
                    });

                    Author.numberOfCommits = total;
                })
                .catch(err => {
                    console.log('Error Happened');
                    console.log(err);
                });
        });
    });
};
