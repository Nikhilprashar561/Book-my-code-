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

  const accessToken = generateAccessToken({ id: user.id });
  const refreshToken = generateRefreshToken({ id: user.id });

  await db
    .update(usersTable)
    .set({ refreshToken: refreshToken })
    .where(eq(usersTable.id, user.id));

    const userSent = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    }

  return { user: userSent, accessToken, refreshToken };
};

const logout = async (userID) => {
  await db
    .update(usersTable)
    .set({ refreshToken: null })
    .where(eq(usersTable.id, userID));
};

const getMe = async (userId) => {

  const getUser = await db
    .select({
      id: usersTable.id,
      email: usersTable.email,
      fullName: usersTable.fullName,
    })
    .from(usersTable)
    .where(eq(usersTable.id, userId));

  const user = getUser[0];

  if (!user) {
    throw ApiError.unAuthorized("User Not Found with this details");
  }

  return user;

};

export { registerService, loginService, logout, getMe };
