import { ApiResponse } from "../../common/utils/ApiResponse.js";
import { registerService } from "./auth.services.js";

const registerController = async (req, res) => {
  const { newUser } = await registerService(req.body);
  return ApiResponse.created(res, "User Register SccessFully", newUser);
};

const loginController = async (req, res) => {};

const logoutContoller = async (req, res) => {};

export { registerController, loginController, logoutContoller };
