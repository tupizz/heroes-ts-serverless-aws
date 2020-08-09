import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import HeroesService from './services/heroes-service';
import { DynamoDbMiddleware, HeroesValidatorMiddleware, withMiddlewares } from './middlewares';

const handleSuccess = (hero) => ({
  statusCode: 200,
  body: JSON.stringify(hero, null, 2),
});

const handleError = (error) => ({
  statusCode: 500,
  body: JSON.stringify(error.message, null, 2),
});

const createNewHero: APIGatewayProxyHandler = async (event, context) => {
  const { nome, poder } = JSON.parse(event.body);

  const service = new HeroesService(context);

  try {
    const hero = await service.create({ nome, poder });

    return handleSuccess(hero);
  } catch (error) {
    return handleError(error);
  }
};

export const heroesInsert = withMiddlewares({
  handler: createNewHero,
  middlewares: [HeroesValidatorMiddleware(), DynamoDbMiddleware()],
});
