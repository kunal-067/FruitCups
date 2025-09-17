import { connectDb } from "@/utils/dbconnect";
import { User } from "@/utils/models/user.model";
import { NextResponse } from "next/server";
import { verifyToken } from "@/app/api/auth/middleware";

// 📌 GET user profile
async function getProfile(req, user) {
  try {
    await connectDb();
    const profile = await User.findById(user.userId).select("-password");

    if (!profile) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    
    return NextResponse.json(
      { message: "Successfully fetched profile", profile },
      { status: 200 }
    );
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
// 📌 PUT update user profile
async function updateProfile(req, user) {
  try {
    const body = await req.json();
    await connectDb();

    const updatedUser = await User.findByIdAndUpdate(user.id, body, {
      new: true,
    }).select("-password");

    return NextResponse.json(
      { message: "Profile updated successfully", data: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

export const GET = verifyToken(getProfile);
export const PUT = verifyToken(updateProfile);
