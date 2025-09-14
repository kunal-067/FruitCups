import { connectDb } from "@/utils/dbconnect";
import { Membership } from "@/utils/models/membership.model";
import { NextResponse } from "next/server";

// ✅ GET Membership by ID
export const GET = async (req, { params }) => {
  try {
    await connectDb();
    const { id } = params;

    const membership = await Membership.findById(id).populate("user", "name email");

    if (!membership) {
      return NextResponse.json(
        { message: "Membership not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Membership fetched successfully", data: membership },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
};

// ✅ UPDATE Membership
export const PUT = async (req, { params }) => {
  try {
    await connectDb();
    const { id } = params;
    const body = await req.json();

    const membership = await Membership.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!membership) {
      return NextResponse.json(
        { message: "Membership not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Membership updated successfully", data: membership },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
};

// ✅ DELETE Membership
export const DELETE = async (req, { params }) => {
  try {
    await connectDb();
    const { id } = params;

    const membership = await Membership.findByIdAndDelete(id);

    if (!membership) {
      return NextResponse.json(
        { message: "Membership not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Membership deleted successfully", data: membership },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
};
