import { Router } from "express";
import { AuthRouters } from "../module/auth/auth.route";
import { VideoRouter } from "../module/video/video.route";
import { ResourceRouter } from "../module/resource/resource.route";

const router=Router()

router.use("/v1/auth",AuthRouters)
router.use("/v1",VideoRouter)
router.use("/v1", ResourceRouter);


export const IndexRouter=router