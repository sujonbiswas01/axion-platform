import { envVars } from "../config/env";
import { prisma } from "../lib/prisma";

async function seedAdmin(){
    const existuser=await prisma.user.findUnique({
        where:{
            email:envVars.Email
        }
    })
    
}