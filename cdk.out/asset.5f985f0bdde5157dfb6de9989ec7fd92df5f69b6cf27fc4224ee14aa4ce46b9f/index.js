// var aws = require('aws-sdk');
// var ses = new aws.SES({
//    region: 'us-east-1'
// });
// exports.handler = function(event, context, callback) {
//    console.log(event);
//    let tabledetails = JSON.parse(JSON.stringify(event.Records[0].dynamodb));
//    console.log(tabledetails.NewImage.address.S);
//    let customerid = tabledetails.NewImage.cust_id.S;
//    let name = tabledetails.NewImage.name.S;
//    let address = tabledetails.NewImage.address.S;
	
//    var eParams = {
//       Destination: {
//          ToAddresses: ["xxxxx@gmail.com"]
//       },
//       Message: {
//          Body: {
//             Text: {
//                Data: "The data added is as follows:\n CustomerId:"+customerid+"\n Name:"+name+"\nAddress:"+address
//             }
//          },
//          Subject: {
//             Data: "Data Inserted in Dynamodb table customer"
//          }
//       },
//       Source: "xxxxx@gmail.com"
//    };
//    console.log('===SENDING EMAIL===');
//    var email = ses.sendEmail(eParams, function(err, data) {
//       if (err) console.log(err);
//       else {
//          console.log("===EMAIL SENT===");
//          console.log("EMAIL CODE END");
//          console.log('EMAIL: ', email);
//          context.succeed(event);
//          callback(null, "email is send");
//       }
//    });
// }
// const { DynamoDB, Lambda } = require('aws-sdk');

// exports.handler = async function(event) {

//   // create AWS SDK clients
//   const dynamo = new DynamoDB();
//   const lambda = new Lambda();

// };
