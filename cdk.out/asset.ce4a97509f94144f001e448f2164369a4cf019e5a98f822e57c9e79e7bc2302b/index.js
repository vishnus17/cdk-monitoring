var AWS = require('aws-sdk');

var db = new AWS.DynamoDB();

var resource1ARN = process.env.resource1ARN;
var ThresholdAmt = process.env.ThresholdAmt;
var EmailID = process.env.EmailID;

module.exports.handler = (event, context, callback) => {
    switch (event.RequestType) {
        case 'Update':
        case 'Create': {
            var params = {
                TableName: process.env.TABLE_NAME,
                Key: {
                    "Value": { "S": "User1" }
                },  
                Item: {
                    'LambdaARN': {"S": resource1ARN},
                    'Threshold': {"S": ThresholdAmt},
                    'Email': {"S": EmailID},
                }
            };
            db.putItem(params, function(err, data) {
                if (err) {
                    console.log(err, err.stack);
                    callback(err);
                } else {
                    console.log(data);
                    callback(null, data);
                }
            });
            break;
        }
        case 'Delete': {
            return;
        }
    };
db.batchWriteItem(params, function(err, data) {
    if (err) {
        console.log("Error", err);
    }  
    else {
        console.log("Success", data);
    }
  });
};