import { createLimiter } from "../lib/rateLimit";

export const authLimiter = createLimiter({
    windowMs: 1 * 60 * 1000,
    limit: 10,
    message: "Too many auth attempts",
  });

  export const publicandprivateLimiter = createLimiter({
    windowMs: 1 * 60 * 1000,
    limit: 20,
    message: "Too many requests on public route"
  });