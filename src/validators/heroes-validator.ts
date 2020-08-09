import * as AJV from 'ajv';

import { Validator } from './validator.interface';
import { HeroesDTO } from '../protocols/heroes';

import heroesSchema from './json/heroes.schema.json';

class HeroesValidator implements Validator<HeroesDTO> {
  ajvValidator: AJV.Ajv;

  constructor() {
    this.ajvValidator = new AJV({ allErrors: true });
  }

  validate(hero: HeroesDTO): boolean {
    return this.ajvValidator.validate(heroesSchema, hero) as boolean;
  }
}

export default HeroesValidator;
