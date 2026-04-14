import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { usersTable } from "../../db/schema.js";
import { ApiError } from "../../common/utils/ApiError.js";
import {
  isPasswordCorrect,
  passwordHash,
} from "../../common/utils/isPasswordCorrect.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../common/utils/jwt.js";

const registerService = async ({ fullName, email, password }) => {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (user.length > 0) {
    throw ApiError.badRequest("User Already Exists with this email");
  }

  const hashPassword = await passwordHash(password);

  const [create] = await db
    .insert(usersTable)
    .values({
      fullName,
      email,
      password: hashPassword,
    })
    .returning();

  return { newUser: create };
};

const loginService = async ({ email, password }) => {
  const userGet = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  const user = userGet[0];

  if (!user) {
    throw ApiError.badRequest("User not found with this email");
  }

  const isPassword = await isPasswordCorrect({
    password,
    dbPassword: user.password,
  });

  if (!isPassword) {
    throw ApiError.badRequest("Password Wrong");
  }

  const accessToken =  generateAccessToken({id: user.id });
  const refreshToken =  generateRefreshToken({id: user.id });

  await db
    .update(usersTable)
    .set({ refreshToken: refreshToken })
    .where(eq(usersTable.id, user.id));

  return { user: user, accessToken, refreshToken };
};

const logout = async () => {};

const getMe = async () => {};

export { registerService, loginService, logout, getMe };
