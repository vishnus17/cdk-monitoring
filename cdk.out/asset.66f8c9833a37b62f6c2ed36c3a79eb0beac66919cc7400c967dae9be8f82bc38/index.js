'use strict';
var AWS = require('aws-sdk');
 // Create DynamoDB service object
var ddb = new AWS.DynamoDB();
var lambdaARN = cdk.Fn.importValue('lambdaARNvalue')
var Threshold = cdk.Fn.importValue('Threshold')
var EmailID = cdk.Fn.importValue('Email')

module.exports.handler = (event, context, callback) => {
var params = {
  RequestItems:   {
    'OnboardingDataCollectionDB': [
      {
      PutRequest: {
        Item: {
          "Value": { "S": "STRING" },
          'LambdaARN': {N: lambdaARN},
          'Threshold': {N: Threshold},
          'Email': {N: EmailID}
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
}
callback(null, response);

