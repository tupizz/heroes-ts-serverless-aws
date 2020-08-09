import HeroesValidator from '../validators/heroes-validator';
import { CustomContext } from '../protocols/aws-lamda';
import { ValidationError } from '../protocols/errors/validation-error';

export const HeroesValidatorMiddleware = () => (event, context: CustomContext, next) => {
  const heroesValidator = new HeroesValidator();
  const data = JSON.parse(event['body']);

  const isValid = heroesValidator.validate(data);
  if (!isValid) {
    throw new ValidationError('Heroes has not a valid schema');
  }

  return next(event, context);
};
