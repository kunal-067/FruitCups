import { connectDb } from "@/utils/dbconnect";
import { Coupon } from "@/utils/models/coupon.model";
import { NextResponse } from "next/server";
import { verifyToken } from "@/app/api/auth/middleware";

// 📌 GET single coupon
async function getCoupon(req, user, { params }) {
  try {
    await connectDb();
    const coupon = await Coupon.findOne({ code: params.code });

    if (!coupon) {
      return NextResponse.json({ message: "Coupon not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Successfully fetched coupon", data: coupon },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
export const GET = verifyToken(getCoupon);

// 📌 PUT update coupon (Admin only)
async function updateCoupon(req, user, { params }) {
  try {
    if (!user.isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    await connectDb();
    const coupon = await Coupon.findOneAndUpdate({ code: params.code }, body, {
      new: true,
    });

    if (!coupon) {
      return NextResponse.json({ message: "Coupon not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Coupon updated successfully", data: coupon },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
export const PUT = verifyToken(updateCoupon);

// 📌 DELETE coupon (Admin only)
async function deleteCoupon(req, user, { params }) {
  try {
    if (!user.isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    await connectDb();
    const coupon = await Coupon.findOneAndDelete({ code: params.code });

    if (!coupon) {
      return NextResponse.json({ message: "Coupon not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Coupon deleted successfully", data: coupon },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
export const DELETE = verifyToken(deleteCoupon);
