import {
    HttpInterceptorFn,
    provideHttpClient,
    withInterceptors,
} from '@angular/common/http';
import { EnvironmentProviders, Provider, makeEnvironmentProviders } from '@angular/core';
import { provideApiConfig } from './api-config.provider';
import { ApiConfig } from './api-config.interface';
import { authInterceptor, errorInterceptor, loggingInterceptor } from './interceptors';

/**
 * Provide API infrastructure with configuration
 * @param config API configuration
 * @param customInterceptors Optional custom interceptors to add
 * @returns Environment providers
 *
 * @example
 * ```typescript
 * // In app.config.ts
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideApi({
 *       baseUrl: environment.apiUrl,
 *       enableLogging: !environment.production,
 *     }),
 *     // ... other providers
 *   ]
 * };
 * ```
 */
export function provideApi(
    config: ApiConfig,
    customInterceptors?: HttpInterceptorFn[]
): EnvironmentProviders {
    // Default interceptors (order matters!)
    const defaultInterceptors: HttpInterceptorFn[] = [
        loggingInterceptor,  // Log first
        authInterceptor,     // Add auth token
        errorInterceptor,    // Handle errors last
    ];

    // Merge custom interceptors
    const interceptors = customInterceptors
        ? [...defaultInterceptors, ...customInterceptors]
        : defaultInterceptors;

    return makeEnvironmentProviders([
        provideHttpClient(withInterceptors(interceptors)),
        provideApiConfig(config),
    ]);
}

/**
 * Provide API infrastructure without HttpClient
 * Use this when HttpClient is already provided elsewhere
 * @param config API configuration
 * @returns Provider
 *
 * @example
 * ```typescript
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideHttpClient(withInterceptors([...])),
 *     provideApiConfigOnly({
 *       baseUrl: environment.apiUrl,
 *     }),
 *   ]
 * };
 * ```
 */
export function provideApiConfigOnly(config: ApiConfig): Provider {
    return provideApiConfig(config);
}
