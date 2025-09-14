import { connectDb } from "@/utils/dbconnect";
import { User } from "@/utils/models/user.model";
import { NextResponse } from "next/server";
import { verifyToken } from "../../auth/middleware";

// 📌 Add address
async function addAddress(req, user) {
  try {
    const { address } = await req.json();
    if (!address) {
      return NextResponse.json({ message: "Address is required" }, { status: 400 });
    }

    await connectDb();
    const updated = await User.findByIdAndUpdate(
      user.id,
      { $push: { addresses: address } },
      { new: true }
    ).select("-password");

    return NextResponse.json(
      { message: "Address added successfully", data: updated },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
export const POST = verifyToken(addAddress);
