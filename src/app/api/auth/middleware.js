// middleware/auth.js
import { decodeToken } from "@/lib/jwt";

export const verifyToken = (handler) => {
  return async (req, res) => {
    try {
      // Expect header: Authorization: Bearer <token>
      const authHeader = req.headers.get("authorization");

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new Response(
          JSON.stringify({ message: "No token provided" }),
          { status: 401 }
        );
      }

      const token = authHeader.split(" ")[1];

      const decoded = decodeToken(token);
      req.user = decoded; // attach user data for next handler

      return handler(req, res);
    } catch (error) {
      return new Response(
        JSON.stringify({ message: "Invalid or expired token" }),
        { status: 401 }
      );
    }
  };
};
