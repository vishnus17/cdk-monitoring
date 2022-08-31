var AWS = require('aws-sdk');

var ddb = new AWS.DynamoDB();
var TABLE_NAME = process.env.TABLE_NAME;
var resource1ARN = process.env.resource1ARN;
var ThresholdAmt = process.env.ThresholdAmt;
var EmailID = process.env.EmailID;

exports.handler = (event, context) => {
  switch (event.RequestType) {
    case 'Update':
    case 'Create': {
  var params = {
    RequestItems:   {
      TABLE_NAME: [
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
      }
    case 'Delete': {
      return;
    }
  }
  db.batchWriteItem(params, function(err, data) {
   if (err) {
     console.log("Error", err);
   } else {
     console.log("Success", data);
   }
  });
};