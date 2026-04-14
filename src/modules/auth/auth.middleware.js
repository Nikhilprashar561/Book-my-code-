import { eq } from "drizzle-orm";
import { verifyAccessToken } from "../../common/utils/jwt.js";
import { db } from "../../db/index.js";
import { usersTable } from "../../db/schema.js";
import { ApiError } from "../../common/utils/ApiError.js";

const auth = async (req, res, next) => {
  // Take Token form user req in authorization.
  // Validate Token if it start with Bearer and follow up that actual token
  // then verify that token through JWT actually is that token
  // Once Token Verity we got payload data inside token
  // and then validate that payload data with database if that token data comes correct or not ?
  // Then Check if user exist with that payload data or not
  // Then Add more data in payload email or fullname
  // Inject that payload data into user request create a user object;
  // then call next function.

    try {
  let token;

  if (req.headers.authorization?.startsWith("Bearer ")) { // This is for frontend when user call any API sent data in options means in Headers and inside header Authorization key.
    token = req.headers.authorization?.split(" ")[1];
  } else if (req.cookies?.accessToken) { // this is for backend specific for testing but also store in User Cookie
    token = req.cookies?.accessToken;
  }

  if (!token) {
    throw ApiError.unAuthorized("User not found, Invalid Request");
  }

  const decoded = verifyAccessToken(token);

  const checkUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, decoded.id));

  const user = checkUser[0];

  if (!user) {
    throw ApiError.unAuthorized("Unauthorized");
  }

  req.user = {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
  };

  next();
    } catch (error) {
      throw ApiError.unAuthorized(
        "Please login first and you are able to access this.",
      );
    }
};

export { auth };
