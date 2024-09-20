import * as Sentry from '@sentry/react';

export function initSentry() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      new Sentry.BrowserTracing(),
      new Sentry.Replay(),
      new Sentry.browserProfilingIntegration()
    ],
    // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
    tracesSampleRate: 1,

    // Define how likely Replay events are sampled.
    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 0.1,

    // Define how likely Replay events are sampled when an error occurs.
    replaysOnErrorSampleRate: 1.0,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,

    // Enable automatic session tracking
    autoSessionTracking: true
  });
}

// Use this function to wrap your Preact components
export function withSentry(Component) {
  return Sentry.withProfiler(Component);
}
