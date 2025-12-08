/**
 * URL Builder Utility
 * Provides helper methods to build API URLs with path parameters
 */
export class UrlBuilder {
    /**
     * Build URL by replacing path parameters
     * @param template URL template with parameters in {param} format
     * @param params Object containing parameter values
     * @returns Formatted URL
     *
     * @example
     * UrlBuilder.build('/users/{id}/posts/{postId}', { id: 1, postId: 2 })
     * // Returns: '/users/1/posts/2'
     */
    static build(template: string, params?: Record<string, any>): string {
        if (!params) {
            return template;
        }

        let url = template;

        Object.keys(params).forEach((key) => {
            const value = params[key];
            const placeholder = `{${key}}`;

            if (url.includes(placeholder)) {
                url = url.replace(placeholder, encodeURIComponent(String(value)));
            }
        });

        return url;
    }

    /**
     * Join URL segments
     * @param segments URL segments to join
     * @returns Joined URL
     *
     * @example
     * UrlBuilder.join('api', 'users', '123')
     * // Returns: 'api/users/123'
     */
    static join(...segments: string[]): string {
        return segments
            .filter((segment) => segment)
            .map((segment) => segment.replace(/^\/+|\/+$/g, ''))
            .join('/');
    }

    /**
     * Combine base URL with path
     * @param baseUrl Base URL
     * @param path Path to append
     * @returns Complete URL
     *
     * @example
     * UrlBuilder.combine('https://api.example.com', '/users')
     * // Returns: 'https://api.example.com/users'
     */
    static combine(baseUrl: string, path: string): string {
        const cleanBase = baseUrl.replace(/\/+$/, '');
        const cleanPath = path.replace(/^\/+/, '');
        return `${cleanBase}/${cleanPath}/`;
    }

    /**
     * Add query string to URL
     * @param url Base URL
     * @param params Query parameters
     * @returns URL with query string
     *
     * @example
     * UrlBuilder.addQueryString('/users', { page: 1, size: 10 })
     * // Returns: '/users?page=1&size=10'
     */
    static addQueryString(url: string, params?: Record<string, any>): string {
        if (!params || Object.keys(params).length === 0) {
            return url;
        }

        const queryString = Object.keys(params)
            .filter((key) => params[key] !== undefined && params[key] !== null)
            .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(String(params[key]))}`)
            .join('&');

        if (!queryString) {
            return url;
        }

        const separator = url.includes('?') ? '&' : '?';
        return `${url}${separator}${queryString}`;
    }
}
