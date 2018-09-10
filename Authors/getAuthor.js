const request = require('request');

var getAuthor = (author, callback) => {
    request(
        {
            url: `https://api.github.com/users/${author}`,
            json: true
        },
        (error, response, body) => {
            if (!error && response.statusCode === 200) {
                callback(undefined, {
                    repos: body.repos_url
                });
            } else if (error) {
                callback('unable to connect to api.github');
            } else {
                callback('Unable to fetch Author');
            }
        }
    );
};

module.exports = {
    getAuthor
};
