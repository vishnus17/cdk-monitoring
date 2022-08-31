// 'use strict';
// var AWS = require('aws-sdk');

// var ddb = new AWS.DynamoDB();
// var lambdaARN = process.env.lambdaARN;
// var Threshold = process.env.Threshold;
// var EmailID = process.env.EmailID;

// module.exports.handler = (event, context) => {
// console.log(event);
// var params = {
//   RequestItems:   {
//     'OnboardingDataCollectionDB': [
//       {
//       PutRequest: {
//         Item: {
//           "Value": { "S": "User1" },
//           'LambdaARN': {"S": lambdaARN},
//           'Threshold': {"S": Threshold},
//           'Email': {"S": EmailID},
//         }
//       }
//     }
//   ]}
// };

// ddb.batchWriteItem(params, function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data);
//   }
// });
// };

