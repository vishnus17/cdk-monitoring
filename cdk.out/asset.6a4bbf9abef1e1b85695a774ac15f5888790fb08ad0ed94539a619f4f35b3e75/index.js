'use strict';
var AWS = require('aws-sdk');
var cdk = require('aws-cdk/core');
 // Create DynamoDB service object
var ddb = new AWS.DynamoDB();
var lambdaARN = cdk.Fn.importValue('lambdaARN')
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

