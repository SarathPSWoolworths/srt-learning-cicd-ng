/**
 * Environment Configuration - Development
 * 
 * Configuration for DEV environment deployments.
 * Used for automatic deployments on merge to main branch.
 * 
 * @file environment.dev.ts
 * @description Development environment configuration
 */

export const environment = {
  /** Indicates if this is a production build */
  production: false,
  
  /** Environment name displayed in the UI */
  name: 'DEV',
  
  /** Application version - replaced by CI/CD pipeline */
  version: '${VERSION}',
  
  /** API base URL for DEV environment */
  apiUrl: 'https://dev-api.srtlearning.example.com/api',
  
  /** Feature flags */
  features: {
    /** Enable debug logging in DEV */
    enableDebugLogging: true,
    /** Enable performance monitoring */
    enablePerformanceMonitoring: true,
    /** Enable analytics tracking */
    enableAnalytics: false
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
