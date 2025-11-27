import { DomainError } from './domain-error';

export class InvalidCredentialsError extends DomainError {
  readonly code = 'AUTH_INVALID_CREDENTIALS';
  readonly statusCode = 401;

  constructor(message: string = 'Invalid email or password') {
    super(message);
  }
}

export class UnauthorizedError extends DomainError {
  readonly code = 'AUTH_UNAUTHORIZED';
  readonly statusCode = 401;

  constructor(message: string = 'Unauthorized access') {
    super(message);
  }
}

export class TokenExpiredError extends DomainError {
  readonly code = 'AUTH_TOKEN_EXPIRED';
  readonly statusCode = 401;

  constructor(message: string = 'Token has expired') {
    super(message);
  }
}

export class InvalidTokenError extends DomainError {
  readonly code = 'AUTH_INVALID_TOKEN';
  readonly statusCode = 401;

  constructor(message: string = 'Invalid token') {
    super(message);
  }
}

export class InvalidOTPError extends DomainError {
  readonly code = 'AUTH_INVALID_OTP';
  readonly statusCode = 400;

  constructor(message: string = 'Invalid OTP code') {
    super(message);
  }
}

export class OTPExpiredError extends DomainError {
  readonly code = 'AUTH_OTP_EXPIRED';
  readonly statusCode = 400;

  constructor(message: string = 'OTP has expired') {
    super(message);
  }
}
