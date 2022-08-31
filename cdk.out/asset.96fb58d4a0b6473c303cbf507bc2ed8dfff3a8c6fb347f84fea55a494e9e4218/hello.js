// sample hello world program
const AWS = require('aws-sdk');

module.exports.handler = (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };

    callback(null, response);
}
