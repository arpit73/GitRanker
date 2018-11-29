const data = require('./dat.json');

const fs = require('fs');
const axios = require('axios');

const parse = async data => {
    for (let account of data) {
       await axios
            .get(account.ID)
            .then(res => {
                result = {
                    index: account.Index,
                    status: res.status
                };

                fs.appendFileSync(
                    'results.json',
                    JSON.stringify(result, null, 2) + ',',
                    'utf-8'
                );
            })
            .catch(err => console.log(err));
    }
};

parse(data);
