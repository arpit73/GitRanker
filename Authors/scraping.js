const rp = require('request-promise');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const data = require('../Data/results_test.json');

var commitLogs = [];

let getAuthor = async data => {
    await data.forEach(async registration => {
        let Team = {
            teamName: '',
            email: '',
            commits: 0
        };

        let teamName = registration['Team Name'];
        Team.teamName = teamName;
        let handles = [
            {
                id: registration.git1,
                email: registration['Email Id of 1st member']
            },
            {
                id: registration.git2,
                email: registration['Email Id of 2nd member']
            },
            {
                id: registration.git3,
                email: registration['Email Id of 3rd member']
            },
            {
                id: registration.git4,
                email: registration['Email Id of 4th member']
            },
            {
                id: registration.git5,
                email: registration['Email Id of 5th member']
            }
        ];

        //emails = emails.filter(email => email.length > 0);
        handles = handles.filter(handle => handle.id.length > 0);

        await handles.forEach(async handle => {
            let options = {
                uri: `${handle.id}`,
                method: 'GET',
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                transform: body => cheerio.load(body)
            };
            Team.email = handle.email;
            // console.log(Team);
            await request(options, async (error, response, body) => {
                let $ = cheerio.load(body);
                // let element = await $('.f4.text-normal.mb-2').text();
                // let numbers = await element.match(/\d+/g).map(Number);
                // Team.commits = await numbers[0];
                console.log(body);
            });
        });
    });
};
//console.log(commitLogs);
getAuthor(data);
