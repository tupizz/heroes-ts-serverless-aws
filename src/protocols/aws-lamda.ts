import { Context } from 'aws-lambda';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export interface CustomContext extends Context {
  teste?: string;
  dynamoDb?: DocumentClient;
}
