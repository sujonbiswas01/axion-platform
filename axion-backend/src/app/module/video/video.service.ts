import AppError from "../../errorHelper/AppError"
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

    try {
        const videos = await prisma.video.findMany({
          include: {
            user: true,
            reviews: true,
          },
        });
      
        return videos
      } catch (error:any) {
      throw new AppError(400,error.message)
      }
};

const GetSingleVideo = async (videoId: string) => {
    await prisma.video.update({
      where: { id: videoId },
      data: {
        views: {
          increment: 1,
        },
      },
    });
  
    const video = await prisma.video.findUnique({
      where: { id: videoId },
      include: {
        user: true,
        reviews: true,
      },
    });
  
    return video;
  };

export const VideoService={
    CreateVideo,
    GetAllVideos,
    GetSingleVideo
}