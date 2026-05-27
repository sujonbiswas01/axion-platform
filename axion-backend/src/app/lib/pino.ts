import {pino} from 'pino'
import { envVars } from '../config/env';
export const logger = pino({
    level: envVars.NODE_ENV === "production" ? "info" : "debug",
    transport:
       {
            target: "pino-pretty",
            options: { colorize: true }
          }
  });