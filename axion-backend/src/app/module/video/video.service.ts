import { IRequestUser } from "../../interface/requestUser.interface"
import { prisma } from "../../lib/prisma"
import { TVideoValidationPayload } from "./video.interface"

const CreateVideo =async(payload:TVideoValidationPayload)=>{
    const result =await prisma.video.create({
        data:{
            ...payload,
            userId:"bEkaL086yT44p9skdbODh2GMXt2veLKv"
        }
    })
    return result
}

export const VideoService={
    CreateVideo
}