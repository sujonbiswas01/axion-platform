import * as Sentry from "@sentry/browser";
import { envVars } from "../config/env";
function initSentry() {
  Sentry.init({
    dsn: envVars.SENTRY_DSN,
    tracesSampleRate: 1.0,
    environment: envVars.NODE_ENV || "development",
  });
  return Sentry;
}

export const initsentry = initSentry;