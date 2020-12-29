import * as cdk from '@aws-cdk/core';
import * as codecommit from '@aws-cdk/aws-codecommit';
import * as targets from '@aws-cdk/aws-events-targets';
import * as codebuild from '@aws-cdk/aws-codebuild';
import * as ecr from '@aws-cdk/aws-ecr';
import * as codedeploy from '@aws-cdk/aws-codedeploy';
import * as sns from '@aws-cdk/aws-sns';
import * as subs from '@aws-cdk/aws-sns-subscriptions';
import * as pipeline from '@aws-cdk/aws-codepipeline';
// import { pipeline } from 'stream';
// import * as events from '@aws-cdk/aws-events';

export class ContainerPipelineStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // global 

    // topic for all services (should there be one topic per service?)
    const pullRequestCommentTopic = new sns.Topic(this, 'TransactionProcessor.pullRequestCommentTopic', {
      displayName: 'TransactionProcessor.pullRequestCommentTopic',
    });

    pullRequestCommentTopic.addSubscription(new subs.EmailSubscription(
      "joshuajlowrance@gmail.com",
      // add emails you want notfied for when comments are made on pull requests  
    ));


    // processPurchase 
    
    // creates a code repository for the corresponding service 
    const processPurchaseCodeRepo = new codecommit.Repository(this, 'processPurchase.CodeRepo', {
      repositoryName: 'processPurchase.CodeRepo',
      description: 'Repository containing code for the corresponding service used in the TransactionProcessor application',      
    });
    
    // builds docker image for corresponding service
    const processPurchaseBuild = new codebuild.Project(this, 'processPurchase.codeBuild', {
      description: 'Creates a docker image when a commit is made to the master branch', 
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          build: {
            commands: [
              // Create Docker image
              /*
              FROM x
              RUN y
              CMD  
              */
              
            ]
          }  
        }
      })
    });

    // triggers codeBuild when a new commit is made to the master branch 
    processPurchaseCodeRepo.onCommit('CommitToMaster', {
      description: 'Triggers CodeBuild to create a new docker image when a commit is made to the master branch',
      target: new targets.CodeBuildProject(processPurchaseBuild),
      branches: ['master'],
    });

    // publishes a message to SNS topic when a comment is made on a pull request
    const processPurchaseCommentOnPullRequestAlert = processPurchaseCodeRepo.onCommentOnPullRequest('ProcessPurchaseCommentOnPullRequest', {
      target: new targets.SnsTopic(pullRequestCommentTopic),
    });


    // repo for container image 
    const processPurchaseImageRepo = new ecr.Repository(this, 'processPurchase.ImageRepo', {
      imageScanOnPush: true,

    });

    // To create an onImageScanCompleted event rule and trigger the event target 



    const processPurchasePipeline = new pipeline.

    // const processPurchaseDeploy = new codedeploy.LambdaDeploymentConfig(this, 'processPurchase.Deploy', {
      
    // });


    // const processRefundRepo = new codecommit.Repository(this, 'processRefundRepo', {

    // });

    // const generatePurchaseReceipt = new codecommit.Repository(this, 'generatePurchaseReceipt', {

    // });
    
    // const generateRefundReceipt = new codecommit.Repository(this, 'generateRefundReceipt', {

    // });
    
  }
}
