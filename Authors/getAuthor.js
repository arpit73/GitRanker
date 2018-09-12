const request = require('request-promise');
const data = require('../Data/results_test.json');

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
        Team.teamName = teamName;

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
                    repos.forEach(repo => {
                        let newOptions = options;
                        newOptions.uri = repo.contributors_url;
                        let contributor = request(newOptions);
                        let commits = contributor[0].contributions;
                    });
                })
                .catch(err => {
                    console.log('Error Happened');
                    console.log(err);
                });
        });
    });
};

getAuthor(data);
