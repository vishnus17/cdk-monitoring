import { CustomResource, Fn, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import {aws_codecommit as codecommit, aws_codebuild as codebuild, aws_iam as iam, aws_sns as sns, aws_codepipeline as codepipeline, aws_codepipeline_actions as codepipeline_actions } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export interface MainOnboardingMonitoringStackProps extends StackProps {
  stageName: string;
}

export class MainOnboardingMonitoringStack extends Stack {
  constructor(scope: Construct, id: string, props: MainOnboardingMonitoringStackProps) {
    super(scope, id, props);

  // DB to which data should be added
  const Datatable = props
    ? new dynamodb.Table(this, 'DataCollectionTable', {
      partitionKey: { 
                      name: 'Value', 
                      type: dynamodb.AttributeType.STRING,
                    },
      tableName: 'OnboardingDataCollection',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    }) : dynamodb.Table.fromTableName(this, 'DataCollectionTable', 'OnboardingDataCollection');

  // Lambda which executes after custom resource trigger
  const DataAdditionLambdafn = new lambda.Function(this, 'DataAdditionLambdafn', {
    runtime: lambda.Runtime.NODEJS_12_X,
    functionName: 'DataAdditionLambdafn',
    handler: 'index.handler',
    timeout: cdk.Duration.seconds(30),
    code: lambda.Code.fromAsset('./src/DataAdditionLambda'),
    environment:{
      TABLE_NAME: Datatable.tableName,
      resource1ARN: cdk.Fn.importValue('resource1ARN'),
      ThresholdAmt: cdk.Fn.importValue('ThresholdAmt'),
      EmailID: cdk.Fn.importValue('EmailID'),
    }
  });

  // Permission for Lambdafn to Batchwrite to DynamoDB
  DataAdditionLambdafn.addToRolePolicy(
    new iam.PolicyStatement({
      actions: ['dynamodb:BatchWriteItem','dynamodb:PutItem','dynamodb:UpdateItem','dynamodb:DeleteItem','dynamodb:GetItem',],
      resources: [Datatable.tableArn]
    })
  );

  // Provider which invokes lambda function
  const DataAdditionLambdaProvider = new cdk.custom_resources.Provider(this, 'DataAdditionLambdaProvider', {
    onEventHandler: DataAdditionLambdafn,
  });

  DataAdditionLambdaProvider.node.addDependency(Datatable);

  // Custom resourcewhich triggers lambda function
  new CustomResource(this, 'SampleCustomResource', {
    serviceToken: DataAdditionLambdaProvider.serviceToken 
  });
  }
}
