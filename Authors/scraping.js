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
            email: '',
            commits: 0,
            num: 0
        };
        Team.teamName = registration['Team Name'];
        let handles = [
            {
                id: registration.git1,
                email: registration['Email Id of 1st member'],
                num: 1
            },
            {
                id: registration.git2,
                email: registration['Email Id of 2nd member'],
                num: 2
            },
            {
                id: registration.git3,
                email: registration['Email Id of 3rd member'],
                num: 3
            },
            {
                id: registration.git4,
                email: registration['Email Id of 4th member'],
                num: 4
            },
            {
                id: registration.git5,
                email: registration['Email Id of 5th member'],
                num: 5
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
            Team.email = handle.email;
            // console.log(Team);

            axios
                .get(handle.id)
                .then(res => {
                    if (response.status === 200) {
                        console.log(res);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            // request(options, async (error, response, body) => {
            //     let $ = await cheerio.load(body);
            //     let element = await $('.f4.text-normal.mb-2').text();
            //     let name = await $(
            //         '.p-name.vcard-fullname.d-block.overflow-hidden'
            //     ).text();
            //     let numbers = await element.match(/\d+/g).map(Number);
            //     Team.commits = await numbers[0];
            //     Team.num = await handle.num;
            //     await console.log(name);
            //     console.log(count);
            //     count++;
            // });
        }
    }
};
//console.log(commitLogs);
getAuthor(data);
