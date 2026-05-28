import { publicandprivateLimiter } from './../../middleware/limitter';
import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { createResourceValidationSchema } from "./resource.validation";
import auth from '../../middleware/Auth';
import { Role } from '../../../generated/prisma/enums';
import { multerUpload } from '../../config/multer.config';
import { ResourceController } from './resource.controller';

const router = Router()

router.post("/resource",publicandprivateLimiter,auth([Role.ADMIN,Role.USER]),multerUpload.fields([{name:"thumbnail",maxCount:1},{name:"pdfFile",maxCount:1}]),validateRequest(createResourceValidationSchema),ResourceController.CreateResource)

export const ResourceRouter=router