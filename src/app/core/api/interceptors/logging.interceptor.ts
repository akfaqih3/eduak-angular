import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap, finalize } from 'rxjs/operators';
import { API_CONFIG } from '../api-config.provider';

/**
 * Logging Interceptor
 * Logs HTTP request and response details (only in development)
 */
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
    const config = inject(API_CONFIG);

    // Skip logging if disabled
    if (!config.enableLogging) {
        return next(req);
    }

    const startTime = Date.now();
    const requestId = generateRequestId();

    console.group(`🌐 HTTP Request [${requestId}]`);
    console.log('Method:', req.method);
    console.log('URL:', req.url);
    console.log('Headers:', req.headers.keys().map((key) => `${key}: ${req.headers.get(key)}`));

    if (req.body) {
        console.log('Body:', req.body);
    }

    console.groupEnd();

    return next(req).pipe(
        tap({
            next: (event: any) => {
                if (event.type === 4) {
                    // HttpEventType.Response
                    const duration = Date.now() - startTime;

                    console.group(`✅ HTTP Response [${requestId}] - ${duration}ms`);
                    console.log('Status:', event.status);
                    console.log('URL:', req.url);
                    console.log('Body:', event.body);
                    console.groupEnd();
                }
            },
            error: (error: any) => {
                const duration = Date.now() - startTime;

                console.group(`❌ HTTP Error [${requestId}] - ${duration}ms`);
                console.log('Status:', error.status);
                console.log('URL:', req.url);
                console.log('Error:', error);
                console.groupEnd();
            },
        }),
        finalize(() => {
            // Cleanup or final logging if needed
        })
    );
};

/**
 * Generate unique request ID for logging
 */
function generateRequestId(): string {
    return Math.random().toString(36).substring(2, 9);
}
