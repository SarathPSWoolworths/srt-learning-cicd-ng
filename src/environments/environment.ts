/**
 * Environment Configuration - Development (Default)
 * 
 * This is the base environment file used during local development.
 * Values are replaced during build for different environments.
 * 
 * @file environment.ts
 * @description Default development environment configuration
 */

export const environment = {
  /** Indicates if this is a production build */
  production: false,
  
  /** Environment name displayed in the UI */
  name: 'DEV',
  
  /** Application version - updated automatically by CI/CD */
  version: '1.0.0',
  
  /** API base URL - configure per environment */
  apiUrl: 'http://localhost:3000/api',
  
  /** Feature flags */
  features: {
    /** Enable debug logging */
    enableDebugLogging: true,
    /** Enable performance monitoring */
    enablePerformanceMonitoring: false,
    /** Enable analytics tracking */
    enableAnalytics: false
  },
  
  /** Deployment configuration */
  deployment: {
    /** Deployment platform: 'github-pages' | 'gcp' | 'azure' | 'aws' */
    platform: 'github-pages',
    /** Base href for deployment */
    baseHref: '/',
    /** CDN URL for static assets (if applicable) */
    cdnUrl: ''
  }
};
