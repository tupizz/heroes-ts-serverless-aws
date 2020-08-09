import * as AWS from 'aws-sdk';
import { CustomContext } from '../protocols/aws-lamda';

export const DynamoDbMiddleware = () => (event, context: CustomContext, next) => {
  context.dynamoDb = new AWS.DynamoDB.DocumentClient();
  return next(event, context);
};
