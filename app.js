const data = require('./data.json');
const selections = require('./selections.json');
const group = require("./grouped.json");

const fs = require('fs');
const groupBy = require('json-groupby');


// let grouped = groupBy(selections, ['teamName']);


// // let selections = data.sort((a, b) => {
// //     let commitA = a.commits,
// //         commitB = b.commits;
// //     return commitB - commitA; //sort by date ascending
// // });

// // //selections = selections.slice(0, 36);

// fs.appendFileSync(
//     'grouped.json',
//     JSON.stringify(grouped, null, 2),
//     'utf-8'
// );
