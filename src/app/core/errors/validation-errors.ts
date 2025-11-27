import { DomainError } from './domain-error';

export class ValidationError extends DomainError {
  readonly code = 'VALIDATION_ERROR';
  readonly statusCode = 400;

  constructor(
    message: string = 'Validation failed',
    public readonly fields?: Record<string, string[]>
  ) {
    super(message);
  }

  override toJSON() {
    return {
      ...super.toJSON(),
      fields: this.fields,
    };
  }
}

export class RequiredFieldError extends DomainError {
  readonly code = 'REQUIRED_FIELD';
  readonly statusCode = 400;

  constructor(fieldName: string) {
    super(`${fieldName} is required`);
  }
}

export class InvalidEmailError extends DomainError {
  readonly code = 'INVALID_EMAIL';
  readonly statusCode = 400;

  constructor(message: string = 'Invalid email format') {
    super(message);
  }
}

export class PasswordMismatchError extends DomainError {
  readonly code = 'PASSWORD_MISMATCH';
  readonly statusCode = 400;

  constructor(message: string = 'Passwords do not match') {
    super(message);
  }
}

export class WeakPasswordError extends DomainError {
  readonly code = 'WEAK_PASSWORD';
  readonly statusCode = 400;

  constructor(message: string = 'Password is too weak') {
    super(message);
  }
}
