/**
 * Vercel Web Analytics Integration
 * This module initializes Web Analytics for user tracking
 */

import { inject } from './node_modules/@vercel/analytics/dist/index.mjs';

// Initialize Web Analytics
inject({
  debug: false
});
