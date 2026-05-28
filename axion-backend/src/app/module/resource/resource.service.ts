import { IRequestUser } from "../../interface/requestUser.interface";
import { prisma } from "../../lib/prisma";
import { TCreateResourcePayload } from "./resource.interface";

const CreateResource=async(payload:any,user:IRequestUser)=>{
    console.log(payload,'payload')
    const resource=await prisma.resource.create({
        data:{
            ...payload,
            userId:user.userId
        }
    })
    return resource

}

export const ResouceService={
    CreateResource
}