export interface Validator<T> {
  validate(hero: T): boolean;
}
