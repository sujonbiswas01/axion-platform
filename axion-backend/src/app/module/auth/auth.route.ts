import { Router } from "express"
import { AuthController } from "./auth.controller"
import { createUserSchema } from "./auth.validation"
import { Role } from "../../../generated/prisma/enums"
import { validateRequest } from "../../middleware/validateRequest"
import auth from "../../middleware/Auth"
import { authLimiter } from "../../middleware/limitter"



const router=Router()
router.post("/register",authLimiter,validateRequest(createUserSchema), AuthController.UserRegister)
router.post("/login",authLimiter, AuthController.loginUser)
router.get("/me",authLimiter,auth([Role.ADMIN, Role.USER]), AuthController.getMe)

router.post("/change-password", authLimiter,auth([Role.ADMIN, Role.USER]), AuthController.changePassword)
router.post("/logout",authLimiter, auth([Role.ADMIN, Role.USER]), AuthController.logoutUser)
router.post("/forget-password",authLimiter, AuthController.forgetPassword)
router.post("/reset-password", authLimiter,AuthController.resetPassword)
router.post("/verify-email", authLimiter,AuthController.verifyEmail)
router.post("/send-otp", authLimiter,AuthController.sendOtp)
router.get('/login/google',authLimiter,AuthController.googleLogin)
router.get('/google/success',authLimiter,AuthController.googleLoginSuccess)
router.get('/oauth/error',AuthController.handleOAuthError)
export const AuthRouters=router
