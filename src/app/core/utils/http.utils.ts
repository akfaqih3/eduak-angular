import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HTTP_HEADERS, TOKEN_CONFIG } from '../constants';

/**
 * HTTP Utilities
 * Helper functions for HTTP operations
 */

export class HttpUtils {
  /**
   * Create authorization header with Bearer token
   */
  static createAuthHeader(token: string): HttpHeaders {
    return new HttpHeaders({
      [HTTP_HEADERS.AUTHORIZATION]: `${TOKEN_CONFIG.BEARER_PREFIX}${token}`,
    });
  }

  /**
   * Create headers with content type
   */
  static createJsonHeaders(token?: string): HttpHeaders {
    let headers = new HttpHeaders({
      [HTTP_HEADERS.CONTENT_TYPE]: 'application/json',
      [HTTP_HEADERS.ACCEPT]: 'application/json',
    });

    if (token) {
      headers = headers.set(
        HTTP_HEADERS.AUTHORIZATION,
        `${TOKEN_CONFIG.BEARER_PREFIX}${token}`
      );
    }

    return headers;
  }

  /**
   * Create HTTP params from object
   */
  static createParams(params: Record<string, any>): HttpParams {
    let httpParams = new HttpParams();

    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (value !== null && value !== undefined) {
        httpParams = httpParams.set(key, String(value));
      }
    });

    return httpParams;
  }

  /**
   * Build query string from object
   */
  static buildQueryString(params: Record<string, any>): string {
    const queryParams = Object.keys(params)
      .filter((key) => params[key] !== null && params[key] !== undefined)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');

    return queryParams ? `?${queryParams}` : '';
  }

  /**
   * Check if token is expired
   */
  static isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiryTime = payload.exp * 1000;
      return Date.now() >= expiryTime - TOKEN_CONFIG.TOKEN_EXPIRY_BUFFER;
    } catch {
      return true;
    }
  }

  /**
   * Extract error message from HTTP error response
   */
  static extractErrorMessage(error: any): string {
    if (error?.error?.message) {
      return error.error.message;
    }
    if (error?.message) {
      return error.message;
    }
    return 'An unexpected error occurred';
  }
}
