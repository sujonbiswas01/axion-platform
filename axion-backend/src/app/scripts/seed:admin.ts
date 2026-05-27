import { envVars } from "../config/env";
import AppError from "../errorHelper/AppError";
import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";

async function seedAdmin() {
    const existuser = await prisma.user.findUnique({
        where: {
            email: envVars.Email
        }
    })

    if (existuser) {
        throw new AppError(409, "user already exist")
    }

    const user = await auth.api.signUpEmail({
        body: {
            name: "admin12",
            email: envVars.Email,
            password: envVars.Password,
            emailVerified: true,
            image: "https://images.pexels.com/users/avatars/2159489466/sujon-biswas-288.jpg?auto=compress&fit=crop&h=140&w=140&dpr=1",
            phone: "01804935939",
            role: "ADMIN",
        }
    })
    if(!user){
        throw new AppError(400,"user created failed")
    }

    return {success:true,message:"user created successfully"}


}

seedAdmin()