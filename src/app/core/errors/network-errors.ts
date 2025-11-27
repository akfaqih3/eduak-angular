import { DomainError } from './domain-error';

export class NetworkError extends DomainError {
  readonly code = 'NETWORK_ERROR';
  readonly statusCode = 0;

  constructor(message: string = 'Network connection failed') {
    super(message);
  }
}

export class TimeoutError extends DomainError {
  readonly code = 'TIMEOUT_ERROR';
  readonly statusCode = 408;

  constructor(message: string = 'Request timeout') {
    super(message);
  }
}

export class ServerError extends DomainError {
  readonly code = 'SERVER_ERROR';
  readonly statusCode = 500;

  constructor(message: string = 'Internal server error') {
    super(message);
  }
}
