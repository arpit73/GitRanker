//const data = require('./data.json');
// const selections = require('./selections.json');
// const group = require('./grouped.json');

const fs = require('fs');
const groupBy = require('json-groupby');


// data = data.sort((a, b) => {
//     let commitA = a.commits,
//         commitB = b.commits;
//     return commitB - commitA; //sort by date ascending
// });
let extra = {
    num: 'yeah'
}
fs.writeFileSync('./selections/selections.json', JSON.stringify(extra, null, 2), 'utf-8');

// let grouped = groupBy(data, ['teamName']);

//fs.writeFileSync('./selections/grouped.json', JSON.stringify(grouped, null, 2), 'utf-8');