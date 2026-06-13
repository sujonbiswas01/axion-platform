import { Request, Response } from "express";
import status from "http-status";
import { sendResponse } from "../../shared/sendResponse";
import { TCreateResourcePayload } from "./resource.interface";
import { catchAsync } from "../../shared/catchAsync";
import AppError from "../../errorHelper/AppError";
import { ResouceService } from "./resource.service";
import paginationSortingHelper from "../../helpers/Pagination";

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

const GetAllResource = catchAsync(async (req: Request, res: Response) => {
  const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper(
    req.query,
  );
  const { search } = req.query;
  console.log(search,'search')
  const resources = await ResouceService.GetAllResource(req.query,
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
    search);
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Resources fetched successfully",
    data: resources,
  });
});

const GetSingleResource = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError(400, "Resource ID is required.");
  }

  const resource = await ResouceService.GetSingleResource(id as string)
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Resource fetched successfully",
    data: resource,
  });
});

const DeleteResource = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError(400, "Resource ID is required.");
  }

  const user=req.user
  if(!user){
    throw new AppError(401,"you are unauthorized user,please at first login this website")
  }

  const result =await ResouceService.DeleteResource(id as string,user.userId as string);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Resource deleted successfully",
    data: result,
  });
});



export const ResourceController = {
  CreateResource,
  GetAllResource,
  GetSingleResource,
  DeleteResource
};