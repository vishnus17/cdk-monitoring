'use strict';
var AWS = require('aws-sdk');

var ddb = new AWS.DynamoDB();

module.exports.handler = (event, context) => {
var params = {
  RequestItems:   {
    'OnboardingDataCollectionDB': [
      {
      PutRequest: {
        Item: {
          "Value": { "S": "STRING" },
          'LambdaARN': {"S": lambdaARN},
          'Threshold': {"S": Threshold},
          'Email': {"S": EmailID}
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

