import { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'serverless-dynamodb',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '>=1.72.0',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['dynamodb:GetItem', 'dynamodb:UpdateItem', 'dynamodb:PutItem'],
        Resource: 'arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.DYNAMODB_TABLE}',
      },
    ],
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      DYNAMODB_TABLE: 'Heroes',
    },
  },
  resources: {
    Resources: {
      HeroesTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: '${self:provider.environment.DYNAMODB_TABLE}',
          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'nome',
              KeyType: 'RANGE',
            },
          ],
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: 'S',
            },
            {
              AttributeName: 'nome',
              AttributeType: 'S',
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
    },
  },
  functions: {
    hello: {
      handler: 'src/handler.heroesInsert',
      events: [
        {
          http: {
            method: 'post',
            path: 'hello',
            cors: true,
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
