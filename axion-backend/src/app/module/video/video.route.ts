
import { Router } from "express";
import { VIdeoController } from "./video.controller";
import auth from "../../middleware/Auth";
import { Role } from "../../../generated/prisma/enums";
import { publicandprivateLimiter } from "../../middleware/limitter";
import { validateRequest } from "../../middleware/validateRequest";
import { UpdateValidationSchema, videoValidationSchema } from './video.validation';
import { multerUpload } from "../../config/multer.config";

const router=Router()

router.post("/video",publicandprivateLimiter, auth([Role.ADMIN,Role.USER]), multerUpload.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),validateRequest(videoValidationSchema),VIdeoController.CreateVideo)

router.get("/videos",publicandprivateLimiter,VIdeoController.GetAllVideos)
router.get("/video/:videoId", publicandprivateLimiter, VIdeoController.GetSingleVideo)

router.patch(
    "/video/:videoId/like",
    publicandprivateLimiter,
    auth([Role.USER, Role.ADMIN]),
    VIdeoController.UpdateVideoLike
  );

router.put(
  "/video/:videoId",
  publicandprivateLimiter,
  multerUpload.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  validateRequest(UpdateValidationSchema),
  VIdeoController.UpdateVideo
);

router.delete(
  "/video/:videoId",
  publicandprivateLimiter,
  auth([Role.USER, Role.ADMIN]),
  VIdeoController.DeleteVideo
);



export const VideoRouter=router