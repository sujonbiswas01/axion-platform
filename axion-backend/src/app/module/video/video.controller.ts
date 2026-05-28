import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import AppError from "../../errorHelper/AppError";
import { VideoService } from "./video.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

const CreateVideo=catchAsync(async(req:Request,res:Response)=>{
    const user = req.user
    if(!user){
        throw new AppError(401, "Unauthorized: User authentication required to create a video.");
   
    }
    console.log(user,'user')
    const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };
      const videoFile = files?.videoFile?.[0];
      const thumbnail = files?.thumbnail?.[0];
    
      const payload = {
        ...req.body,
        videoFile: videoFile?.path,
        thumbnail: thumbnail?.path,
      };
    
    const result =await VideoService.CreateVideo(payload,user)
    sendResponse(res,{
        httpStatusCode: status.CREATED,
        success: true,
        message: "Video created successfully",
        data:result
   
    })

})

const GetAllVideos = catchAsync(async (req: Request, res: Response) => {
    const videos = await VideoService.GetAllVideos();
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Videos fetched successfully",
        data: videos
    });
});

const GetSingleVideo = catchAsync(async (req: Request, res: Response) => {
    const { videoId } = req.params;

    if (!videoId) {
        throw new AppError(status.BAD_REQUEST,"Video ID is required");
    }

    const video = await VideoService.GetSingleVideo(videoId as string);

    if (!video) {
        throw new AppError(status.NOT_FOUND,"Video not found");
    }

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Video fetched successfully",
        data: video
    });
});

const UpdateVideo = catchAsync(async (req: Request, res: Response) => {
    const { videoId } = req.params;
    const user = req.user
    if(!user){
        throw new AppError(401, "Unauthorized: User authentication required to create a video.");
   
    }

    if (!videoId) {
        throw new AppError(status.BAD_REQUEST, "Video ID is required");
    }
    const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };
      const videoFile = files?.videoFile?.[0];
      const thumbnail = files?.thumbnail?.[0];
    
      const payload = {
        ...req.body,
        videoFile: videoFile?.path,
        thumbnail: thumbnail?.path,
      };

    const updatedVideo = await VideoService.UpdateVideo(user,videoId as string, payload);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Video updated successfully",
        data: updatedVideo
    });
});

const UpdateVideoLike = catchAsync(async (req: Request, res: Response) => {
    const { videoId } = req.params;
    const { increment } = req.body;
    if (!videoId) {
        throw new AppError(status.BAD_REQUEST, "Video ID is required");
    }


    const incrementValue = typeof increment === "number" ? increment : 1;

    const updatedVideo = await VideoService.UpdateVideoLike(videoId as string, incrementValue);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Video like(s) updated successfully",
        data: updatedVideo
    });
});

const DeleteVideo = catchAsync(async (req: Request, res: Response) => {
    const { videoId } = req.params;
    const user = req.user
    if(!user){
        throw new AppError(401, "Unauthorized: User authentication required to create a video.");
   
    }

    if (!videoId) {
        throw new AppError(status.BAD_REQUEST, "Video ID is required");
    }

    const result = await VideoService.DeleteVideo(user,videoId as string);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Video deleted successfully",
        data: result
    });
});


export const VIdeoController={
    CreateVideo,
    GetAllVideos,
    GetSingleVideo,
    UpdateVideo,
    UpdateVideoLike,
    DeleteVideo
}