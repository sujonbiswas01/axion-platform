import { Router } from "express";
import { AuthRouters } from "../module/auth/auth.route";
import { VideoRouter } from "../module/video/video.route";

const router=Router()

router.use("/v1/auth",AuthRouters)
router.use("/v1",VideoRouter)

export const IndexRouter=router