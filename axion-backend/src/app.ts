import express, { Application, Request, Response } from "express";

import { toNodeHandler } from "better-auth/node";
import { auth } from "./app/lib/auth";
import path from "path";
const app: Application = express();
app.use('/api/auth',toNodeHandler(auth))
app.set("view engine", "ejs");
app.set("views",path.resolve(process.cwd(), `src/app/templates`) )

app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/",(req,res)=>{
    res.status(200).json({success:true,message:"home route"})
})

export default app;