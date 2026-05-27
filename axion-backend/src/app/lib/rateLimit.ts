import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import { Request } from "express";

export const createLimiter = (options: {
  windowMs: number;
  message: string;
  limit:number;
}) => {
  return rateLimit({
    windowMs: options.windowMs,

    keyGenerator: (req) => {
      return ipKeyGenerator(req.ip || "unknown-ip");
    },

    standardHeaders: true,
    legacyHeaders: false,

    limit: async (req: Request) => {
      return options.limit;
    },

    handler: (_req, res) => {
      res.status(429).json({
        success: false,
        message: options.message,
      });
    },
  });
};