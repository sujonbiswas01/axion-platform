import AppError from "../../errorHelper/AppError"
import { IRequestUser } from "../../interface/requestUser.interface"
import { prisma } from "../../lib/prisma"
import { TUpdateValidationSchema, TVideoValidationPayload } from "./video.interface"

const CreateVideo =async(payload:TVideoValidationPayload,user:IRequestUser)=>{
    const result =await prisma.video.create({
        data:{
            ...payload,
            userId:user.userId
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


const UpdateVideo = async (user:IRequestUser,videoId: string, payload:TUpdateValidationSchema) => {
  try {
    const updatedVideo = await prisma.video.update({

      where: { id: videoId,userId:user.userId },
      data: {
        ...payload,
        updatedAt: new Date(),
      },
    });
    return updatedVideo;
  } catch (error: any) {
    throw new AppError(400, error.message);
  }
};

const UpdateVideoLike = async (videoId: string, increment: number = 1) => {
  try {
    const updatedVideo = await prisma.video.update({
      where: { id: videoId },
      data: {
        like: {
          increment: increment,
        },
        updatedAt: new Date(),
      },
    });
    return updatedVideo;
  } catch (error: any) {
    throw new AppError(400, error.message);
  }
};


const DeleteVideo = async (user:IRequestUser,videoId: string) => {
  try {

    const video = await prisma.video.findUnique({
      where: { id: videoId,userId:user.userId },
    });

    if (!video) {
      throw new AppError(404, "Video not found");
    }

    await prisma.video.delete({
      where: { id: videoId },
    });

    return { message: "Video deleted successfully" };
  } catch (error: any) {
    throw new AppError(400, error.message);
  }
};



export const VideoService={
    CreateVideo,
    GetAllVideos,
    GetSingleVideo,
    UpdateVideo,
    UpdateVideoLike,
    DeleteVideo
}