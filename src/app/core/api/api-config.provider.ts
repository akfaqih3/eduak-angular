import { InjectionToken, Provider } from '@angular/core';
import { ApiConfig, DEFAULT_API_CONFIG } from './api-config.interface';

/**
 * Injection token for API configuration
 */
export const API_CONFIG = new InjectionToken<ApiConfig>('API_CONFIG');

/**
 * Provider factory to merge user configuration with defaults
 */
export function provideApiConfig(config: ApiConfig): Provider {
    return {
        provide: API_CONFIG,
        useValue: {
            ...DEFAULT_API_CONFIG,
            ...config,
            auth: {
                ...DEFAULT_API_CONFIG.auth,
                ...config.auth,
            },
        },
    };
}
