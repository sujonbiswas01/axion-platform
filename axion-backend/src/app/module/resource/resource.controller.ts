import { Request, Response } from "express";
import status from "http-status";
import { sendResponse } from "../../shared/sendResponse";
import { TCreateResourcePayload } from "./resource.interface";
import { catchAsync } from "../../shared/catchAsync";
import AppError from "../../errorHelper/AppError";
import { ResouceService } from "./resource.service";

const CreateResource = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    throw new AppError(401, "Unauthorized: User authentication required to create a resource.");
  }
  console.log(user,'user')
  const files = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };
  const thumbnail = files?.thumbnail?.[0];
  const pdfFile = files?.pdfFile?.[0];

  const payload: TCreateResourcePayload = {
    ...req.body,
    thumbnail: thumbnail?.path,
    pdfFile: pdfFile?.path,
  };

  console.log(payload,'payload')

  const result = await ResouceService.CreateResource(payload, user);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Resource created successfully",
    data: result,
  });
});

export const ResourceController = {
  CreateResource,
};