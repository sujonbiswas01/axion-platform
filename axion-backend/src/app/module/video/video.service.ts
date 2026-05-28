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

const GetAllVideos = async () => {

    const videos = await prisma.video.findMany({
        include:{
            user:true,
            reviews:true
        }
    });
    return videos;
};

export const VideoService={
    CreateVideo,
    GetAllVideos
}