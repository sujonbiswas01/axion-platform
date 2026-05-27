import express, { Application, Request, Response } from "express";

import { toNodeHandler } from "better-auth/node";
import { auth } from "./app/lib/auth";
import path from "path";
import pinoHttp from "pino-http";
import {logger} from './app/lib/pino'
import { initsentry } from "./app/lib/sentry";
const app: Application = express();
app.use('/api/auth/:path*',toNodeHandler(auth))
app.set("view engine", "ejs");
app.set("views",path.resolve(process.cwd(), `src/app/templates`) )

app.use(express.urlencoded({ extended: true }));

app.use(
  pinoHttp({
    logger,
    customProps: (req: any) => ({
      method: req.method,
      url: req.url,
      ip: req.ip,
      userId: req.user?.id || "guest"
    })
  })
);

// sentry use
initsentry();
// Middleware to parse JSON bodies
app.use(express.json());

app.use("/",(req,res)=>{
    res.status(200).json({success:true,message:"home route"})
})

export default app;