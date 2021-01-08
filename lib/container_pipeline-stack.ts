import * as path from "path";
import * as cdk from '@aws-cdk/core';
import * as codeCommit from "@aws-cdk/aws-codecommit";
import * as codeBuild from "@aws-cdk/aws-codebuild";
import * as codeArtifact from "@aws-cdk/aws-codeartifact";
import * as codeDeploy from "@aws-cdk/aws-codedeploy";
import * as codePipeline from "@aws-cdk/aws-codepipeline";
import * as codepipelineActions from "@aws-cdk/aws-codepipeline-actions";
import * as ecr from "@aws-cdk/aws-ecr";
import * as cloudWatch from "@aws-cdk/aws-cloudwatch";
import * as cloudTrial from "@aws-cdk/aws-cloudtrail";
import * as sns from "@aws-cdk/aws-sns";
import * as iam from "@aws-cdk/aws-iam";
import * as lambda from "@aws-cdk/aws-lambda";
import * as subs from "@aws-cdk/aws-sns-subscriptions";
import * as events from "@aws-cdk/aws-events";
import * as targets from "@aws-cdk/aws-events-targets";

export class ContainerPipelineStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //
    
   
  }
}
