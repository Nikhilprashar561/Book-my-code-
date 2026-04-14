import jwt from "jsonwebtoken";

// In this file there we have total 4 task

// 1. Generate AccessToken JWT
// 2. Verify AccessToken JWT
// 3. Generate RefreshToken JWT
// 4. Verify Refresh Token

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET_TOKEN, {
    expiresIn: process.env.JWT_ACCESS_EXPIRY || "30min",
  });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET_TOKEN, {
    expiresIn: process.env.JWT_REFRESH_EXPIRY,
  });
};

const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET_TOKEN);
};

const verifyRefeshToken = (token) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET_TOKEN);
};

export {
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  verifyRefeshToken,
};
