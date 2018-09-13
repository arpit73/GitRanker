const data = require('./data.json');

const fs = require('fs');
const groupBy = require('json-groupby');


let selections = data.sort((a, b) => {
    let commitA = a.commits,
        commitB = b.commits;
    return commitB - commitA; //sort by date ascending
});
fs.writeFileSync('./selections/selections.json', JSON.stringify(selections, null, 2), 'utf-8');

let grouped = groupBy(data, ['teamName']);

fs.writeFileSync('./selections/grouped.json', JSON.stringify(grouped, null, 2), 'utf-8');