import { Node, Edge } from 'reactflow'

export interface IaCExportOptions {
  format: 'terraform' | 'cloudformation'
  provider: 'aws' | 'azure' | 'gcp'
  includeComments: boolean
}

// Map node types to cloud services
const SERVICE_MAPPING = {
  aws: {
    source: { service: 'aws_s3_bucket', name: 'Data Source' },
    streaming: { service: 'aws_kinesis_stream', name: 'Stream' },
    processing: { service: 'aws_lambda_function', name: 'Processor' },
    storage: { service: 'aws_dynamodb_table', name: 'Storage' },
    analytics: { service: 'aws_athena_workgroup', name: 'Analytics' },
  },
  azure: {
    source: { service: 'azurerm_storage_account', name: 'Data Source' },
    streaming: { service: 'azurerm_eventhub', name: 'Event Hub' },
    processing: { service: 'azurerm_function_app', name: 'Function' },
    storage: { service: 'azurerm_cosmosdb_account', name: 'Cosmos DB' },
    analytics: { service: 'azurerm_synapse_workspace', name: 'Synapse' },
  },
  gcp: {
    source: { service: 'google_storage_bucket', name: 'Cloud Storage' },
    streaming: { service: 'google_pubsub_topic', name: 'Pub/Sub' },
    processing: { service: 'google_cloudfunctions_function', name: 'Function' },
    storage: { service: 'google_bigtable_instance', name: 'Bigtable' },
    analytics: { service: 'google_bigquery_dataset', name: 'BigQuery' },
  },
}

// Generate Terraform configuration
export function generateTerraform(
  nodes: Node[],
  edges: Edge[],
  provider: 'aws' | 'azure' | 'gcp' = 'aws',
  includeComments: boolean = true
): string {
  const serviceMap = SERVICE_MAPPING[provider]
  let terraform = ''

  // Header
  if (includeComments) {
    terraform += `# Generated Infrastructure-as-Code from Digital Platform Architect
# Provider: ${provider.toUpperCase()}
# Generated: ${new Date().toISOString()}
#
# This configuration creates a data pipeline based on your design
#
\n`
  }

  // Provider configuration
  terraform += `terraform {
  required_version = ">= 1.0"
  required_providers {
    ${getProviderBlock(provider)}
  }
}

provider "${getProviderName(provider)}" {
  ${getProviderConfig(provider)}
}

`

  // Variables
  terraform += `# Variables
variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "data-pipeline"
}

`

  // Local values
  terraform += `locals {
  common_tags = {
    Environment = var.environment
    Project     = var.project_name
    ManagedBy   = "Terraform"
    CreatedBy   = "DigitalPlatformArchitect"
  }
}

`

  // Resources
  nodes.forEach((node) => {
    const nodeType = node.data.type as keyof typeof serviceMap
    const service = serviceMap[nodeType]

    if (service) {
      if (includeComments) {
        terraform += `# ${service.name}: ${node.data.label}\n`
      }

      const resourceName = sanitizeResourceName(node.data.label)
      terraform += generateTerraformResource(
        service.service,
        resourceName,
        node,
        provider
      )
      terraform += '\n'
    }
  })

  // Outputs
  terraform += generateTerraformOutputs(nodes, provider)

  return terraform
}

// Generate CloudFormation template
export function generateCloudFormation(
  nodes: Node[],
  edges: Edge[],
  includeComments: boolean = true
): string {
  const template: any = {
    AWSTemplateFormatVersion: '2010-09-09',
    Description: 'Data Pipeline Infrastructure generated from Digital Platform Architect',

    Parameters: {
      Environment: {
        Type: 'String',
        Default: 'dev',
        AllowedValues: ['dev', 'staging', 'prod'],
        Description: 'Environment name',
      },
      ProjectName: {
        Type: 'String',
        Default: 'data-pipeline',
        Description: 'Project name for resource naming',
      },
    },

    Resources: {},
    Outputs: {},
  }

  const serviceMap = SERVICE_MAPPING.aws

  // Generate resources
  nodes.forEach((node) => {
    const nodeType = node.data.type as keyof typeof serviceMap
    const service = serviceMap[nodeType]

    if (service) {
      const resourceName = sanitizeResourceName(node.data.label, true)
      template.Resources[resourceName] = generateCloudFormationResource(
        nodeType,
        node
      )
    }
  })

  // Generate outputs
  nodes.forEach((node) => {
    const resourceName = sanitizeResourceName(node.data.label, true)
    if (template.Resources[resourceName]) {
      template.Outputs[`${resourceName}Arn`] = {
        Description: `ARN of ${node.data.label}`,
        Value: { 'Fn::GetAtt': [resourceName, 'Arn'] },
        Export: {
          Name: { 'Fn::Sub': `\${AWS::StackName}-${resourceName}-Arn` },
        },
      }
    }
  })

  return includeComments
    ? `# Generated CloudFormation template from Digital Platform Architect
# Generated: ${new Date().toISOString()}
#
${JSON.stringify(template, null, 2)}`
    : JSON.stringify(template, null, 2)
}

// Helper functions
function getProviderBlock(provider: string): string {
  const blocks: Record<string, string> = {
    aws: `aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }`,
    azure: `azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }`,
    gcp: `google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }`,
  }
  return blocks[provider] || blocks.aws
}

function getProviderName(provider: string): string {
  const names: Record<string, string> = {
    aws: 'aws',
    azure: 'azurerm',
    gcp: 'google',
  }
  return names[provider] || 'aws'
}

function getProviderConfig(provider: string): string {
  const configs: Record<string, string> = {
    aws: `region = "us-east-1"  # Change to your preferred region`,
    azure: `features {}`,
    gcp: `project = "your-project-id"  # Change to your GCP project
  region  = "us-central1"      # Change to your preferred region`,
  }
  return configs[provider] || configs.aws
}

function sanitizeResourceName(label: string, pascalCase: boolean = false): string {
  let name = label
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')

  if (pascalCase) {
    name = name
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')
  }

  return name || 'resource'
}

function generateTerraformResource(
  service: string,
  name: string,
  node: Node,
  provider: string
): string {
  const configs: Record<string, (name: string, node: Node) => string> = {
    aws_s3_bucket: (n, node) => `resource "aws_s3_bucket" "${n}" {
  bucket = "\${var.project_name}-\${var.environment}-${n}"

  tags = merge(local.common_tags, {
    Name = "${node.data.label}"
  })
}

resource "aws_s3_bucket_versioning" "${n}_versioning" {
  bucket = aws_s3_bucket.${n}.id

  versioning_configuration {
    status = "Enabled"
  }
}
`,

    aws_kinesis_stream: (n, node) => `resource "aws_kinesis_stream" "${n}" {
  name             = "\${var.project_name}-\${var.environment}-${n}"
  shard_count      = 1
  retention_period = 24

  shard_level_metrics = [
    "IncomingBytes",
    "IncomingRecords",
    "OutgoingBytes",
    "OutgoingRecords",
  ]

  tags = merge(local.common_tags, {
    Name = "${node.data.label}"
  })
}
`,

    aws_lambda_function: (n, node) => `resource "aws_iam_role" "${n}_role" {
  name = "\${var.project_name}-\${var.environment}-${n}-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })

  tags = local.common_tags
}

resource "aws_lambda_function" "${n}" {
  filename      = "lambda_function.zip"  # Update with your Lambda code
  function_name = "\${var.project_name}-\${var.environment}-${n}"
  role          = aws_iam_role.${n}_role.arn
  handler       = "index.handler"
  runtime       = "python3.11"
  timeout       = 60
  memory_size   = 256

  environment {
    variables = {
      ENVIRONMENT = var.environment
    }
  }

  tags = merge(local.common_tags, {
    Name = "${node.data.label}"
  })
}
`,

    aws_dynamodb_table: (n, node) => `resource "aws_dynamodb_table" "${n}" {
  name           = "\${var.project_name}-\${var.environment}-${n}"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  point_in_time_recovery {
    enabled = true
  }

  tags = merge(local.common_tags, {
    Name = "${node.data.label}"
  })
}
`,

    aws_athena_workgroup: (n, node) => `resource "aws_athena_workgroup" "${n}" {
  name = "\${var.project_name}-\${var.environment}-${n}"

  configuration {
    enforce_workgroup_configuration    = true
    publish_cloudwatch_metrics_enabled = true

    result_configuration {
      output_location = "s3://\${aws_s3_bucket.${n}_results.bucket}/query-results/"
    }
  }

  tags = merge(local.common_tags, {
    Name = "${node.data.label}"
  })
}

resource "aws_s3_bucket" "${n}_results" {
  bucket = "\${var.project_name}-\${var.environment}-${n}-results"

  tags = merge(local.common_tags, {
    Name = "${node.data.label} Results"
  })
}
`,
  }

  const generator = configs[service]
  return generator ? generator(name, node) : `# Unsupported service: ${service}\n`
}

function generateCloudFormationResource(nodeType: string, node: Node): any {
  const configs: Record<string, (node: Node) => any> = {
    source: (node) => ({
      Type: 'AWS::S3::Bucket',
      Properties: {
        BucketName: { 'Fn::Sub': '${ProjectName}-${Environment}-source' },
        VersioningConfiguration: {
          Status: 'Enabled',
        },
        Tags: [
          { Key: 'Name', Value: node.data.label },
          { Key: 'Environment', Value: { Ref: 'Environment' } },
        ],
      },
    }),

    streaming: (node) => ({
      Type: 'AWS::Kinesis::Stream',
      Properties: {
        Name: { 'Fn::Sub': '${ProjectName}-${Environment}-stream' },
        ShardCount: 1,
        RetentionPeriodHours: 24,
        Tags: [
          { Key: 'Name', Value: node.data.label },
          { Key: 'Environment', Value: { Ref: 'Environment' } },
        ],
      },
    }),

    processing: (node) => ({
      Type: 'AWS::Lambda::Function',
      Properties: {
        FunctionName: { 'Fn::Sub': '${ProjectName}-${Environment}-processor' },
        Runtime: 'python3.11',
        Handler: 'index.handler',
        Code: {
          ZipFile: '# Your Lambda function code here\ndef handler(event, context):\n    return {"statusCode": 200}',
        },
        Role: { 'Fn::GetAtt': ['ProcessorRole', 'Arn'] },
        Timeout: 60,
        MemorySize: 256,
        Tags: [
          { Key: 'Name', Value: node.data.label },
          { Key: 'Environment', Value: { Ref: 'Environment' } },
        ],
      },
    }),

    storage: (node) => ({
      Type: 'AWS::DynamoDB::Table',
      Properties: {
        TableName: { 'Fn::Sub': '${ProjectName}-${Environment}-storage' },
        BillingMode: 'PAY_PER_REQUEST',
        AttributeDefinitions: [
          { AttributeName: 'id', AttributeType: 'S' },
        ],
        KeySchema: [
          { AttributeName: 'id', KeyType: 'HASH' },
        ],
        PointInTimeRecoverySpecification: {
          PointInTimeRecoveryEnabled: true,
        },
        Tags: [
          { Key: 'Name', Value: node.data.label },
          { Key: 'Environment', Value: { Ref: 'Environment' } },
        ],
      },
    }),

    analytics: (node) => ({
      Type: 'AWS::Athena::WorkGroup',
      Properties: {
        Name: { 'Fn::Sub': '${ProjectName}-${Environment}-analytics' },
        WorkGroupConfiguration: {
          PublishCloudWatchMetricsEnabled: true,
          ResultConfiguration: {
            OutputLocation: { 'Fn::Sub': 's3://${ProjectName}-${Environment}-results/' },
          },
        },
        Tags: [
          { Key: 'Name', Value: node.data.label },
          { Key: 'Environment', Value: { Ref: 'Environment' } },
        ],
      },
    }),
  }

  const generator = configs[nodeType]
  return generator ? generator(node) : {}
}

function generateTerraformOutputs(nodes: Node[], provider: string): string {
  let outputs = '# Outputs\n'
  const serviceMap = SERVICE_MAPPING[provider as keyof typeof SERVICE_MAPPING]

  nodes.forEach((node) => {
    const nodeType = node.data.type as keyof typeof serviceMap
    const resourceName = sanitizeResourceName(node.data.label)

    if (nodeType && serviceMap[nodeType]) {
      const service = serviceMap[nodeType].service
      outputs += `output "${resourceName}_id" {
  description = "ID of ${node.data.label}"
  value       = ${service}.${resourceName}.id
}

`
    }
  })

  return outputs
}

// Export diagram as architecture documentation
export function generateArchitectureDocs(nodes: Node[], edges: Edge[]): string {
  let docs = `# Data Pipeline Architecture

**Generated**: ${new Date().toLocaleString()}

## Overview

This document describes the data pipeline architecture designed in Digital Platform Architect.

## Components

`

  nodes.forEach((node, index) => {
    docs += `### ${index + 1}. ${node.data.label}

- **Type**: ${node.data.type}
- **Purpose**: ${getComponentPurpose(node.data.type)}
`

    const connections = edges.filter(e => e.source === node.id)
    if (connections.length > 0) {
      docs += '- **Connects to**: '
      const targets = connections.map(e => {
        const targetNode = nodes.find(n => n.id === e.target)
        return targetNode ? targetNode.data.label : 'Unknown'
      })
      docs += targets.join(', ')
      docs += '\n'
    }

    docs += '\n'
  })

  docs += `## Data Flow

`
  edges.forEach((edge, index) => {
    const source = nodes.find(n => n.id === edge.source)
    const target = nodes.find(n => n.id === edge.target)

    if (source && target) {
      docs += `${index + 1}. **${source.data.label}** → **${target.data.label}**\n`
    }
  })

  return docs
}

function getComponentPurpose(type: string): string {
  const purposes: Record<string, string> = {
    source: 'Data ingestion and collection',
    streaming: 'Real-time data streaming and buffering',
    processing: 'Data transformation and processing',
    storage: 'Persistent data storage',
    analytics: 'Data analysis and querying',
  }
  return purposes[type] || 'Custom component'
}
