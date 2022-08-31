import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cdk from 'aws-cdk-lib';

export class SampleResourceStack extends Stack {
    constructor(scope: Construct, id: string, props: StackProps) {
      super(scope, id, props);

    const SampleLambda = new lambda.Function(this, 'SampleLambda', {
      code: lambda.Code.fromAsset('./src/sample'),
      handler: 'hello.handler',
      functionName: "sampleLambda",
      runtime: lambda.Runtime.NODEJS_12_X,
    });
    
    const lambdaARNvalue = SampleLambda.functionArn;
    const Threshold = '0.5';
    const Email = 'vishnu@appmastery.co';
    
    new cdk.CfnOutput(this, "output-arn",{
      value: lambdaARNvalue,
      description: 'ARN of the Lambda function',
      exportName : "resource1ARN",
    });

    new cdk.CfnOutput(this, "Threshold",{
      value: Threshold,
      description: 'Threshold set by developer',
      exportName : "ThresholdAmt",
    });

    new cdk.CfnOutput(this, "Email",{
      value: Email,
      description: 'Email id of developer',
      exportName : "EmailID",
    });

  }
}

