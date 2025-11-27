import { HttpErrorResponse } from '@angular/common/http';
import {
  DomainError,
  InvalidCredentialsError,
  UnauthorizedError,
  TokenExpiredError,
  InvalidTokenError,
  ValidationError,
  NotFoundError,
  AlreadyExistsError,
  ForbiddenError,
  NetworkError,
  ServerError,
  TimeoutError,
} from '../errors';

export class ErrorMapper {
  static fromHttpError(error: HttpErrorResponse): DomainError {
    if (error.status === 0) {
      return new NetworkError('Unable to connect to server');
    }

    const errorCode = error.error?.code || error.error?.error;
    const errorMessage = error.error?.message || error.message;

    switch (error.status) {
      case 400:
        if (error.error?.errors) {
          return new ValidationError(errorMessage, error.error.errors);
        }
        return new ValidationError(errorMessage);

      case 401:
        if (errorCode === 'TOKEN_EXPIRED') {
          return new TokenExpiredError(errorMessage);
        }
        if (errorCode === 'INVALID_TOKEN') {
          return new InvalidTokenError(errorMessage);
        }
        if (errorCode === 'INVALID_CREDENTIALS') {
          return new InvalidCredentialsError(errorMessage);
        }
        return new UnauthorizedError(errorMessage);

      case 403:
        return new ForbiddenError(errorMessage);

      case 404:
        return new NotFoundError(errorMessage);

      case 409:
        return new AlreadyExistsError(errorMessage);

      case 408:
        return new TimeoutError(errorMessage);

      case 500:
      case 502:
      case 503:
      case 504:
        return new ServerError(errorMessage);

      default:
        return new ServerError(`Unexpected error: ${errorMessage}`);
    }
  }

  static fromError(error: unknown): DomainError {
    if (error instanceof DomainError) {
      return error;
    }

    if (error instanceof HttpErrorResponse) {
      return this.fromHttpError(error);
    }

    if (error instanceof Error) {
      return new ServerError(error.message);
    }

    return new ServerError('An unexpected error occurred');
  }
}
