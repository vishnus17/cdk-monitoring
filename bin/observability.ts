#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MainOnboardingMonitoringStack } from '../lib/monitoring-onboarding-stack';
import {SampleResourceStack} from '../lib/resource-stack';
// import { ApplicationStack } from '../lib/application-stack';

const app = new cdk.App();
new MainOnboardingMonitoringStack(app, 'MainOnboardingMonitoringStack', {
  stageName: 'sbx01',
  // env: { account: '123456789012', region: 'us-east-1' },
});

new SampleResourceStack(app, 'SampleResourceStack', {
  // env: { account: '123456789012', region: 'us-east-1' },
});

// new ApplicationStack(app, 'ApplicationStack', {
//   stageName: 'sbx01',
//   // env: { account: '123456789012', region: 'us-east-1' },
// });