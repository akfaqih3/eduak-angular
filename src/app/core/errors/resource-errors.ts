import { DomainError } from './domain-error';

export class NotFoundError extends DomainError {
  readonly code = 'NOT_FOUND';
  readonly statusCode = 404;

  constructor(resource: string = 'Resource') {
    super(`${resource} not found`);
  }
}

export class AlreadyExistsError extends DomainError {
  readonly code = 'ALREADY_EXISTS';
  readonly statusCode = 409;

  constructor(resource: string = 'Resource') {
    super(`${resource} already exists`);
  }
}

export class ForbiddenError extends DomainError {
  readonly code = 'FORBIDDEN';
  readonly statusCode = 403;

  constructor(message: string = 'Access forbidden') {
    super(message);
  }
}
