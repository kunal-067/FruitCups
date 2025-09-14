import {
  decodeRefreshToken,
  decodeAccessToken,
  signAccessToken
} from "@/lib/jwt";
import {
  User
} from "@/utils/models/user.model";
import bcrypt from "bcryptjs";
import {
  cookies
} from "next/headers";
import {
  NextResponse
} from "next/server";

export const verifyToken = (handler) => {
  return async (req) => {
    try {
      const cookieStore = await cookies();
      let accessToken = cookieStore.get("accessToken")?.value;
      const refreshToken = cookieStore.get("refreshToken")?.value;

      if (!refreshToken) {
        return NextResponse.redirect(new URL("/login?error=missing_token", req.url));
      }

      // No access token? try refreshing
      if (!accessToken) {
        const decoded = decodeRefreshToken(refreshToken);

        const user = await User.findById(decoded.userId).select("+refreshToken.value +refreshToken.lastRefresh");
        if (!user) {
          return NextResponse.json({
            message: "User not found"
          }, {
            status: 404
          });
        }

        console.log(user)
        const tokenMatch = await bcrypt.compare(refreshToken, user.refreshToken?.value);
        if (!tokenMatch) {
          return NextResponse.json({
            message: "Invalid refresh token"
          }, {
            status: 403
          });
        }

        const newAccessToken = signAccessToken({
          userId: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        });

        // Persist new access token
        cookieStore.set("accessToken", newAccessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        });

        accessToken = newAccessToken;
      }

      // Decode and attach user
      const decoded = decodeAccessToken(accessToken);
      req.user = decoded;

      return handler(req, decoded);
    } catch (error) {
      console.error("verifyToken error:", error);
      return NextResponse.json({
        message: "Invalid or expired token"
      }, {
        status: 401
      });
    }
  };
};