import jwt from "jsonwebtoken";

const JWTREFRESH_SECRET = process.env.JWTREFRESH_SECRET || "supersecret";
const REFRESH_EXPIRES_IN = "15d";
export function signRefreshToken(payload) {
  return jwt.sign(payload, JWTREFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
}
export function decodeRefreshToken(token) {
  try {
    return jwt.verify(token, JWTREFRESH_SECRET);
  } catch (err) {
    return null;
  }
}

const JWTACCESS_SECRET = process.env.JWTACCESS_SECRET || "supersecret"; 
const ACCESS_EXPIRES_IN = "1d"; 
export function signAccessToken(payload) {
  return jwt.sign(payload, JWTACCESS_SECRET, { expiresIn: ACCESS_EXPIRES_IN });
}
export function decodeAccessToken(token) {
  try {
    return jwt.verify(token, JWTACCESS_SECRET);
  } catch (err) {
    return null;
  }
}
