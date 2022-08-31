'use strict';
var AWS = require('aws-sdk');

var ddb = new AWS.DynamoDB();
var resource1ARN = process.env.resource1ARN;
var ThresholdAmt = process.env.ThresholdAmt;
var EmailID = process.env.EmailID;

module.exports.handler = (event, context) => {
console.log(event);
var params = {
  RequestItems:   {
    'OnboardingDataCollectionDB': [
      {
      PutRequest: {
        Item: {
          "Value": { "S": "User1" },
          'LambdaARN': {"S": resource1ARN},
          'Threshold': {"S": ThresholdAmt},
          'Email': {"S": EmailID},
        }
      }
    }
  ]}
};

ddb.batchWriteItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});
};

