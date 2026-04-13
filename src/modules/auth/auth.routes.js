import { Router } from "express";
import { Validation } from "../../common/middleware/validateDto.js";
import { LoginDto } from "./dto/loginDto.js";
import { RegisterDto } from "./dto/registerDto.js";
import { loginController, logoutContoller, registerController } from "./auth.controller.js";

const userRouter = Router()

userRouter.route("/register").post(Validation(RegisterDto), registerController);
userRouter.route("/login").post(Validation(LoginDto), loginController);
userRouter.route("/logout").post(logoutContoller)

export { userRouter }
 