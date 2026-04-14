import { ApiResponse } from "../../common/utils/ApiResponse.js";
import { loginService, registerService } from "./auth.services.js";

const registerController = async (req, res) => {
  const { newUser } = await registerService(req.body);
  ApiResponse.created(res, "User Register SccessFully", newUser);
};

const loginController = async (req, res) => {
  const { user, accessToken, refreshToken } = await loginService(req.body);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
  });
  ApiResponse.ok(res, "User Login SuccessFully", {
    user,
    accessToken,
    refreshToken,
  });
};

const logoutContoller = async (req, res) => {};

export { registerController, loginController, logoutContoller };
