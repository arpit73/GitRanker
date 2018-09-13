const rp = require('request-promise');
const request = require('request');

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const data = require('../Data/results_test.json');
var commitLogs = [];

let getAuthor = data => {
    for (let registration of data) {
        let Team = {
            teamName: '',
            github: '',
            email: '',
            commits: 0
        };
        Team.teamName = registration['Team Name'];
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
        let count = 0;
        //emails = emails.filter(email => email.length > 0);
        handles = handles.filter(handle => handle.id.length > 0);
        for (let handle of handles) {
            let options = {
                uri: `${handle.id}`,
                method: 'GET',
                headers: {
                    'User-Agent': 'Request-Promise'
                }
                //transform: body => cheerio.load(body)
            };

            // console.log(Team);

            axios
                .get(handle.id)
                .then(res => {
                    if (res.status === 200) {
                        const html = res.data;
                        const $ = cheerio.load(html);
                        let element = $('.f4.text-normal.mb-2').text();
                        let name = $(
                            '.p-name.vcard-fullname.d-block.overflow-hidden'
                        ).text();
                        let numbers = element.match(/\d+/g).map(Number);
                        Team.commits = numbers[0];
                        Team.email = handle.email;
                        Team.github = handle.id;
                        console.log(Team);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
//console.log(commitLogs);
getAuthor(data);
