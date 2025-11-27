/**
 * Environment Configuration
 * This file should be used to access environment variables
 */

export interface Environment {
  production: boolean;
  apiUrl: string;
  apiVersion: string;
  enableLogging: boolean;
  enableDebug: boolean;
}

/**
 * Get environment configuration
 * This should be replaced with actual environment injection in production
 */
export const getEnvironment = (): Environment => {
  return {
    production: false,
    apiUrl: 'http://localhost:3000',
    apiVersion: 'v1',
    enableLogging: true,
    enableDebug: true,
  };
};

/**
 * Build full API URL with version
 */
export const buildApiUrl = (endpoint: string): string => {
  const env = getEnvironment();
  return `${env.apiUrl}/api/${env.apiVersion}${endpoint}`;
};
