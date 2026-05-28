
import { Router } from "express";
import { VIdeoController } from "./video.controller";
import auth from "../../middleware/Auth";
import { Role } from "../../../generated/prisma/enums";
import { publicandprivateLimiter } from "../../middleware/limitter";
import { validateRequest } from "../../middleware/validateRequest";
import { videoValidationSchema } from './video.validation';
import { multerUpload } from "../../config/multer.config";

const router=Router()

router.post("/video",publicandprivateLimiter,  multerUpload.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),validateRequest(videoValidationSchema),VIdeoController.CreateVideo)

router.get("/videos",publicandprivateLimiter,VIdeoController.GetAllVideos)

export const VideoRouter=router