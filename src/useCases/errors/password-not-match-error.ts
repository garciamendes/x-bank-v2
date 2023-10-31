export class PasswordNotMatchError extends Error {
  constructor() {
    super('Passwords are not the same')
  }
}