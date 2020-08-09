import { v4 as uuid } from 'uuid';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { Validator } from '../validators/validator.interface';
import { HeroesDTO } from '../protocols/heroes';
import { CustomContext } from '../protocols/aws-lamda';

class HeroesService {
  dynamoService: AWS.DynamoDB.DocumentClient;
  dynamoTable: string;
  heroesValidator: Validator<HeroesDTO>;

  constructor(context: CustomContext) {
    this.dynamoService = context.dynamoDb;
    this.dynamoTable = process.env.DYNAMODB_TABLE;
  }

  async create({ nome, poder }) {
    const params: DocumentClient.PutItemInput = {
      TableName: this.dynamoTable,
      Item: {
        id: uuid(),
        nome,
        poder,
        createdAt: new Date().toISOString(),
      },
    };

    await this.dynamoService.put(params).promise();

    return params.Item;
  }
}

export default HeroesService;
