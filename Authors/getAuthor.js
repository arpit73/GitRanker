const request = require('request-promise');
const fs = require('fs');

const data = require('../Data/results_test.json');

// Schema for Storage
let Team = {
    teamName: '',
    commits: [
        {
            numberOfRepos: 0,
            numberOfCommits: 0
        }
    ]
};

getAuthor = data => {
    data.forEach(registration => {
        let counter = 0;
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

        console.log(handles);

        handles.forEach(handle => {
            let options = {
                uri: `https://api.github.com/users/${handle}/repos`,
                qs: {
                    access_token: 'f56206fd1e5f4f35fa5542718a6e724b4ddb4678' // -> uri + '?access_token=xxxxx%20xxxxx'
                },
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            };
            request(options)
                .then(repos => {
                    Team.commits[counter].numberOfRepos = repos.length;
                    repos.forEach(repo => {
                        var newOptions = options;
                        var commits = 0;
                        newOptions.uri = repo.contributors_url;
                        console.log(newOptions);
                        request(newOptions)
                            .then(contributor => {
                                console.log(contributor);
                                contributor.forEach(item => {
                                    commits += item.contributions;
                                });
                                Team.commits[counter].numberOfCommits = commits;
                                counter++;
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    });
                })
                .catch(err => {
                    console.log('Error Happened');
                    console.log(err);
                });
        });
        fs.appendFile('../Selections/logs.log', `${Team}\n`, err => {
            if (err) {
                console.log('Unable to write log');
            }
        });
    });
};

getAuthor(data);
