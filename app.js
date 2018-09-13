const data = require('./data.json');
const fs = require('fs');

console.log(data.length);

let selections = data.sort((a, b) => {
    let commitA = a.commits,
        commitB = b.commits;
    return commitB - commitA; //sort by date ascending
});

//selections = selections.slice(0, 36);

fs.appendFileSync(
    'selections.json',
    JSON.stringify(selections, null, 2),
    'utf-8'
);
