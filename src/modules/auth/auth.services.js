import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { usersTable } from "../../db/schema.js";
import { ApiError } from "../../common/utils/ApiError.js";
import { passwordHash } from "../../common/utils/isPasswordCorrect.js";

const registerService = async ({ fullName, email, password }) => {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (user.length > 0) {
    throw ApiError.badRequest("User Already Exists with this email");
  }

  const hashPassword = await passwordHash(password);

  const [create] = await db.insert(usersTable).values({
    fullName,
    email,
    password: hashPassword,
  }).returning();

  return { newUser: create };
};

const loginService = async () => {};

const logout = async () => {};

export { registerService, loginService, logout };
