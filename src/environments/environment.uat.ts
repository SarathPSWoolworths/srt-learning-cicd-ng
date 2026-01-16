/**
 * Environment Configuration - UAT (User Acceptance Testing)
 * 
 * Configuration for UAT environment deployments.
 * Requires QA team approval before deployment.
 * 
 * @file environment.uat.ts
 * @description UAT environment configuration
 */

export const environment = {
  /** Indicates if this is a production build */
  production: false,
  
  /** Environment name displayed in the UI */
  name: 'UAT',
  
  /** Application version - replaced by CI/CD pipeline */
  version: '${VERSION}',
  
  /** API base URL for UAT environment */
  apiUrl: 'https://uat-api.srtlearning.example.com/api',
  
  /** Feature flags */
  features: {
    /** Disable debug logging in UAT */
    enableDebugLogging: false,
    /** Enable performance monitoring */
    enablePerformanceMonitoring: true,
    /** Enable analytics tracking for testing */
    enableAnalytics: true
  },
  
  /** Deployment configuration */
  deployment: {
    /** Deployment platform */
    platform: 'github-pages',
    /** Base href for GitHub Pages deployment */
    baseHref: '/srt-learning-cicd-ng-uat/',
    /** CDN URL for static assets */
    cdnUrl: ''
  }
};
