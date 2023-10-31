export class FieldRequiredError extends Error {
  constructor() {
    super('Required fields')
  }
}