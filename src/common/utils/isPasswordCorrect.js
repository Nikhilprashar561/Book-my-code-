import bcrypt from "bcryptjs";
import { ApiError } from "../utils/ApiError.js";

const passwordHash = async (password) => {
  if (!password) throw ApiError.badRequest("Password Field Required");

  const passwordHash = await bcrypt.hash(password, 12);

  return passwordHash;
};

const isPasswordCorrect = async ({ password, dbPassword }) => {
  if (!password || !dbPassword)
    throw ApiError.badRequest("Password Field is Missing");

  const isPassword = await bcrypt.compare(password, dbPassword);

  if (!isPassword){
    throw ApiError.badRequest("Password is Wrong");
  }

  return isPassword;
};

export { passwordHash, isPasswordCorrect };
