import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_CONFIG } from '../api-config.provider';

/**
 * Authentication Interceptor
 * Automatically adds authentication token to outgoing requests
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const config = inject(API_CONFIG);

    // Skip authentication for excluded endpoints
    const isExcluded = config.auth?.excludedEndpoints?.some((endpoint) =>
        req.url.includes(endpoint)
    );

    if (isExcluded) {
        return next(req);
    }

    // Get token from storage
    const tokenKey = config.auth?.tokenKey || 'auth_token';
    const token = localStorage.getItem(tokenKey);

    // If no token, proceed without authentication
    if (!token) {
        return next(req);
    }

    // Clone request and add authentication header
    const headerName = config.auth?.headerName || 'Authorization';
    const tokenPrefix = config.auth?.tokenPrefix || 'Bearer';

    const authReq = req.clone({
        setHeaders: {
            [headerName]: `${tokenPrefix} ${token}`,
        },
    });

    return next(authReq);
};
