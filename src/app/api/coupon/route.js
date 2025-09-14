import { connectDb } from "@/utils/dbconnect";
import { Coupon } from "@/utils/models/coupon.model";
import { NextResponse } from "next/server";
import { verifyToken } from "../auth/middleware";

// 📌 GET all coupons (Admin only)
async function getCoupons(req, user) {
  try {
    if (!user.isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    await connectDb();
    const coupons = await Coupon.find();

    return NextResponse.json(
      { message: "Successfully fetched coupons", data: coupons },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
export const GET = verifyToken(getCoupons);

// 📌 POST create new coupon (Admin only)
async function createCoupon(req, user) {
  try {
    if (!user.isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const { code, discountPercent, expiry } = await req.json();
    if (!code || !discountPercent) {
      return NextResponse.json(
        { message: "Code and discountPercent are required" },
        { status: 400 }
      );
    }

    await connectDb();
    const coupon = new Coupon({
      code,
      discountPercent,
      expiry,
    });
    await coupon.save();

    return NextResponse.json(
      { message: "Coupon created successfully", data: coupon },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
export const POST = verifyToken(createCoupon);
