/**
 * Environment Configuration - Production
 * 
 * Configuration for PROD environment deployments.
 * Requires QA + Management approval before deployment.
 * 
 * @file environment.prod.ts
 * @description Production environment configuration
 */

export const environment = {
  /** Indicates if this is a production build */
  production: true,
  
  /** Environment name displayed in the UI */
  name: 'PROD',
  
  /** Application version - replaced by CI/CD pipeline */
  version: '${VERSION}',
  
  /** API base URL for production */
  apiUrl: 'https://api.srtlearning.example.com/api',
  
  /** Feature flags */
  features: {
    /** Disable debug logging in production */
    enableDebugLogging: false,
    /** Enable performance monitoring */
    enablePerformanceMonitoring: true,
    /** Enable analytics tracking */
    enableAnalytics: true
  },
  
  /** Deployment configuration */
  deployment: {
    /** Deployment platform */
    platform: 'github-pages',
    /** Base href for GitHub Pages deployment */
    baseHref: '/srt-learning-cicd-ng/',
    /** CDN URL for static assets */
    cdnUrl: ''
  }
};
