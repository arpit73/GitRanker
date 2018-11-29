const data = require('./dat.json');
const { performance } = require('perf_hooks');

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

const testPerformance = async data => {
    let t0 = await performance.now();
    await parse(data);
    let t1 = await performance.now();
    await console.log(
        'Call to doSomething took ' + (t1 - t0) + ' milliseconds.'
    );
};

testPerformance(data);
