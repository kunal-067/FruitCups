import { connectDb } from "@/utils/dbconnect";
import { User } from "@/utils/models/user.model";
import { NextResponse } from "next/server";
import { verifyToken } from "@/app/api/auth/middleware";

// 📌 Add address
async function getAddresses(req, user) {
  try {
    const userData = await User.findById(user.userId);
    if(!user){
      return NextResponse.json({message:'User not found !'}, {status:404})
    }
    return NextResponse.json({message:'Address fetched successfully', addresses: userData.addresses || []}, {status:200})
  } catch (error) {
    console.error(error)
     return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
async function addAddress(req, user) {
  try {
    const address = await req.json();
    if (!address) {
      return NextResponse.json({ message: "Address is required" }, { status: 400 });
    }

    await connectDb();
    const updated = await User.findByIdAndUpdate(
      user.userId,
      { $push: { addresses: address } },
      { new: true }
    ).select("-password");

    const addedAddress = updated.addresses[updated.addresses.length - 1];

    return NextResponse.json(
      { message: "Address added successfully", data: updated.addresses, addedAddress, },
      { status: 201 }
    );
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

export const GET = verifyToken(getAddresses)
export const POST = verifyToken(addAddress);
