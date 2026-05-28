import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import AppError from "../../errorHelper/AppError";
import { VideoService } from "./video.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

const CreateVideo=catchAsync(async(req:Request,res:Response)=>{
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
    
    const result =await VideoService.CreateVideo(payload)
    sendResponse(res,{
        httpStatusCode: status.CREATED,
        success: true,
        message: "Video created successfully",
        data:result
   
    })

})

export const VIdeoController={
    CreateVideo
}