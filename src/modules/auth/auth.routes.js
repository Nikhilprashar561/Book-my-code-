import { Router } from "express";
import { Validation } from "../../common/middleware/validateDto.js";
import { LoginDto } from "./dto/loginDto.js";
import { RegisterDto } from "./dto/registerDto.js";
import * as controller from "./auth.controller.js";
import { auth } from "./auth.middleware.js";

const userRouter = Router()

userRouter.route("/register").post(Validation(RegisterDto),controller.registerController);
userRouter.route("/login").post(Validation(LoginDto), controller.loginController);

userRouter.route("/logout").post(auth , controller.logoutContoller);

userRouter.route("/me").get(auth, controller.getUser)

export { userRouter };
