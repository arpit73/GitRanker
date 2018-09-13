const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');

const data = require('../Data/results.json');

getAuthor = data => {
    let count = 0;
    data.forEach(registration => {
        let Team = {
            teamName: '',
            email: '',
            commits: 0
        };

        let teamName = registration['Team Name'];
        Team.teamName = teamName;
        let handles = [
            registration.git1,
            registration.git2,
            registration.git3,
            registration.git4,
            registration.git5
        ];
        Team.email = registration['Email Address'];

        //emails = emails.filter(email => email.length > 0);
        handles = handles.filter(handle => handle.length > 0);

        handles.forEach(handle => {
           
            let options = {
                uri: `${handle}`,
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                transform: body => cheerio.load(body)
            };
            rp(options)
                .then($ => {
                    var element = $('.f4.text-normal.mb-2').text();
                    var numbers = element.match(/\d+/g).map(Number);
                    Team.commits = numbers[0];

                   //console.log(Team);
                    fs.appendFileSync(
                        'data.json',
                        JSON.stringify(Team, null, 2) + ',',
                        'utf-8'
                    );
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
};

getAuthor(data);
