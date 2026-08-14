/**
 * Vercel Speed Insights Integration
 * 
 * This initializes the Speed Insights tracking for the portfolio.
 * When deployed on Vercel, this will automatically track Web Vitals and performance metrics.
 * 
 * Learn more: https://vercel.com/docs/speed-insights
 */

(function() {
  'use strict';
  
  // Initialize the Speed Insights queue
  // This creates a queue for tracking events before the main script loads
  window.si = window.si || function() {
    (window.siq = window.siq || []).push(arguments);
  };
  
  // Load the Speed Insights script
  // When deployed on Vercel, this path will be automatically available
  const script = document.createElement('script');
  script.defer = true;
  
  // Check if we're in development or production
  const isDevelopment = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' ||
                       window.location.hostname === '';
  
  if (isDevelopment) {
    // In development, use the debug version for better insights
    script.src = 'https://va.vercel-scripts.com/v1/speed-insights/script.debug.js';
    console.log('[Speed Insights] Development mode - using debug script');
  } else {
    // In production (on Vercel), use the auto-injected path
    script.src = '/_vercel/speed-insights/script.js';
  }
  
  // Add error handling
  script.onerror = function() {
    console.warn('[Speed Insights] Failed to load script. This is expected in local development without Vercel.');
  };
  
  script.onload = function() {
    console.log('[Speed Insights] Script loaded successfully');
  };
  
  // Inject the script into the page
  document.head.appendChild(script);
})();
