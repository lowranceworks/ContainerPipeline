import * as cdk from '@aws-cdk/core';
import * as codecommit from '@aws-cdk/aws-codecommit';
import * as targets from '@aws-cdk/aws-events-targets';
import * as codebuild from '@aws-cdk/aws-codebuild';
import * as ecr from '@aws-cdk/aws-ecr';
import * as codedeploy from '@aws-cdk/aws-codedeploy';
import * as sns from '@aws-cdk/aws-sns';
import * as subs from '@aws-cdk/aws-sns-subscriptions';
import * as codePipeline from '@aws-cdk/aws-codepipeline';
// import { pipeline } from 'stream';
// import * as events from '@aws-cdk/aws-events';

export class ContainerPipelineStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // global 
    const service = 'processPurchase'
    const application = 'transactionProcessor'

    // SNS topic for service
    const serviceTopic = new sns.Topic(this, 'service topic', {
      displayName: service,
      
    });

    serviceTopic.addSubscription(new subs.EmailSubscription(
      "joshuajlowrance@gmail.com",
      // add emails you want notfied for when comments are made on pull requests  
    ));


    // 
    
    // creates a code repository for the corresponding service 
    const repository = new codecommit.Repository(this, 'repository', {
      repositoryName: service,
      description: 'Repository containing source code for the ' + service + ' service inside the ' + application + ' application'     
    });

    // repo for container image 
    const imageRepository = new ecr.Repository(this, 'processPurchase.ImageRepo', {
      repositoryName: service,
      imageScanOnPush: true,
    });
    
    
    // builds docker image for corresponding service
    const buildProject = new codebuild.Project(this, 'build project', {
      description: 'When a commit is made to the ' + service + 'repository master branch, a docker image is created and stored into the ' + application + ' ECR repository', 
      // use docker image inside source root  
      // import vpc create from another stack 
    });

    // triggers codeBuild when a new commit is made to the master branch 
    repository.onCommit('CommitToMaster', {
      description: 'Triggers CodeBuild to create a new docker image when a commit is made to the ' + service + ' service master branch',
      target: new targets.CodeBuildProject(buildProject),
      branches: ['master'],
    });

    // publishes a message to SNS topic when a comment is made on a pull request
    const processPurchaseCommentOnPullRequestAlert = repository.onCommentOnPullRequest('ProcessPurchaseCommentOnPullRequest', {
      target: new targets.SnsTopic(serviceTopic),
    });



    // To create an onImageScanCompleted event rule and trigger the event target 


    // Trigger pipeline when new image is uploaded 


    // const processPurchasePipeline = new codePipeline.Pipeline(this, 'processPurchasePipeline', {
    //   pipelineName: 'transactionProcessor.processPurchase.pipeline',
    //   crossAccountKeys: false, // Be aware that in the default configuration, the Pipeline construct creates an AWS Key Management Service (AWS KMS) Customer Master Key (CMK) for you to encrypt the artifacts in the artifact bucket, which incurs a cost of $1/month. This default configuration is necessary to allow cross-account actions.
    //   stages: [
    //     {
    //       stageName: 'Dev',
    //       actions: [
    //         // see below...
    //       ],
    //     },

    //     {
    //       stageName: 'Test',
    //       actions: [
    //         // see below...
    //       ],
    //     },

    //     {
    //       stageName: 'Prod',
    //       actions: [
    //         // see below...
    //       ],
    //     },
    //   ],
    // });

    // new codedeploy.LambdaDeploymentGroup(this, 'DeploymentGroup', {
    //   alias,
    //   deploymentConfig: codedeploy.LambdaDeploymentConfig.LINEAR_10PERCENT_EVERY_1MINUTE,
    // });

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
