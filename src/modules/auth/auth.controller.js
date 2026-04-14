import { ApiResponse } from "../../common/utils/ApiResponse.js";
import {
  getMe,
  loginService,
  logout,
  registerService,
} from "./auth.services.js";

const registerController = async (req, res) => {
  const { newUser } = await registerService(req.body);
  ApiResponse.created(res, "User Register SccessFully", newUser);
};

const loginController = async (req, res) => {
  const { user, accessToken, refreshToken } = await loginService(req.body);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });

  ApiResponse.ok(res, "User Login SuccessFully", {
    user,
    accessToken,
  });
};

const logoutContoller = async (req, res) => {
  await logout(req.user.id);
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  ApiResponse.ok(res, "User Logout Successfully");
};

const getUser = async (req, res) => {
  const user = await getMe(req.user.id);
  ApiResponse.ok(res, "User get successfully", user);
};

export { registerController, loginController, logoutContoller, getUser };
