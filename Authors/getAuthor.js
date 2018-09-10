const rp = require('request-promise');

var options = {
    uri: `https://api.github.com/users/arpit73`,
    json: true // Automatically parses the JSON string in the response
};

rp(options)
    .then(repos => {
        console.log('User has %d repos', repos_url.length);
    })
    .catch(err => {
        console.log(err);
    });

// var getAuthor = (author, callback) => {
//     request(
//         {
//             url: `https://api.github.com/users/${author}`,
//             json: true
//         },
//         (error, response, body) => {
//             if (!error && response.statusCode === 200) {
//                 callback(undefined, {
//                     repos: body.repos_url
//                 });
//             } else if (error) {
//                 callback('unable to connect to api.github');
//             } else {
//                 callback('Unable to fetch Author');
//             }
//         }
//     );
// };

module.exports = {
    getAuthor
};
