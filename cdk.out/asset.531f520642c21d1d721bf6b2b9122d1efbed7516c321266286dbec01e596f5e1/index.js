var AWS = require('aws-sdk');

var db = new AWS.DynamoDB();
var params = {
  TableName: process.env.TABLE_NAME
};

var resource1ARN = process.env.resource1ARN;
var ThresholdAmt = process.env.ThresholdAmt;
var EmailID = process.env.EmailID;


module.exports.handler = (event, context, callback) => {
    params.RequestItems[process.env.TABLE_NAME] = [];
    switch (event.RequestType) {
        case 'Update':
        case 'Create': {
            params.RequestItems[process.env.TABLE_NAME].push({
                PutRequest: {
                        Item: {
                          "Value": { "S": "User1" },
                          'LambdaARN': {"S": resource1ARN},
                          'Threshold': {"S": ThresholdAmt},
                          'Email': {"S": EmailID},
                          }
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
    callback(null, response);
  });
};