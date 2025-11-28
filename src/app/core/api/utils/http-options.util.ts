import { HttpHeaders, HttpParams } from '@angular/common/http';

/**
 * HTTP Options
 */
export interface HttpOptions {
    headers?: HttpHeaders | { [header: string]: string | string[] };
    params?: HttpParams | { [param: string]: string | string[] };
    observe?: 'body' | 'events' | 'response';
    reportProgress?: boolean;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
}

/**
 * HTTP Options Builder Utility
 * Provides helper methods to create HTTP options
 */
export class HttpOptionsBuilder {
    private options: HttpOptions = {};

    /**
     * Set headers
     */
    setHeaders(headers: Record<string, string>): this {
        this.options.headers = new HttpHeaders(headers);
        return this;
    }

    /**
     * Add header
     */
    addHeader(key: string, value: string): this {
        if (!this.options.headers) {
            this.options.headers = new HttpHeaders();
        }

        if (this.options.headers instanceof HttpHeaders) {
            this.options.headers = this.options.headers.set(key, value);
        }

        return this;
    }

    /**
     * Set params
     */
    setParams(params: Record<string, any>): this {
        let httpParams = new HttpParams();

        Object.keys(params).forEach((key) => {
            const value = params[key];

            if (value !== undefined && value !== null) {
                if (Array.isArray(value)) {
                    value.forEach((item) => {
                        httpParams = httpParams.append(key, String(item));
                    });
                } else {
                    httpParams = httpParams.set(key, String(value));
                }
            }
        });

        this.options.params = httpParams;
        return this;
    }

    /**
     * Add param
     */
    addParam(key: string, value: any): this {
        if (!this.options.params) {
            this.options.params = new HttpParams();
        }

        if (this.options.params instanceof HttpParams && value !== undefined && value !== null) {
            this.options.params = this.options.params.set(key, String(value));
        }

        return this;
    }

    /**
     * Set response type
     */
    setResponseType(type: 'arraybuffer' | 'blob' | 'json' | 'text'): this {
        this.options.responseType = type;
        return this;
    }

    /**
     * Set observe type
     */
    setObserve(observe: 'body' | 'events' | 'response'): this {
        this.options.observe = observe;
        return this;
    }

    /**
     * Enable report progress
     */
    enableReportProgress(): this {
        this.options.reportProgress = true;
        return this;
    }

    /**
     * Enable with credentials
     */
    enableWithCredentials(): this {
        this.options.withCredentials = true;
        return this;
    }

    /**
     * Build options
     */
    build(): HttpOptions {
        return this.options;
    }

    /**
     * Create a new builder instance
     */
    static create(): HttpOptionsBuilder {
        return new HttpOptionsBuilder();
    }

    /**
     * Create options with JSON content type
     */
    static json(params?: Record<string, any>): HttpOptions {
        const builder = new HttpOptionsBuilder().addHeader('Content-Type', 'application/json');

        if (params) {
            builder.setParams(params);
        }

        return builder.build();
    }

    /**
     * Create options for file upload
     */
    static upload(reportProgress = true): HttpOptions {
        const builder = new HttpOptionsBuilder();

        if (reportProgress) {
            builder.enableReportProgress();
        }

        return builder.build();
    }
}
