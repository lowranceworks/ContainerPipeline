#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ContainerPipelineStack } from '../lib/container_pipeline-stack';

const app = new cdk.App();
new ContainerPipelineStack(app, 'ContainerPipelineStack');
