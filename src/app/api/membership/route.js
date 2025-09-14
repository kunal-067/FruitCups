import { connectDb } from "@/utils/dbconnect";
import { Membership } from "@/utils/models/membership.model";
import { NextResponse } from "next/server";
import { verifyToken } from "../auth/middleware";

// 📌 GET available membership plans
export async function GET() {
  try {
    await connectDb();
    const plans = await Membership.find();

    return NextResponse.json(
      { message: "Successfully fetched membership plans", data: plans },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

// 📌 POST subscribe to a membership
async function subscribe(req, user) {
  try {
    const { planId, duration, preference } = await req.json();
    if (!planId || !duration) {
      return NextResponse.json(
        { message: "planId and duration are required" },
        { status: 400 }
      );
    }

    await connectDb();
    const subscription = new Membership({
      userId: user.id,
      planId,
      duration,
      preference,
      startDate: new Date(),
    });
    await subscription.save();

    return NextResponse.json(
      { message: "Successfully subscribed to membership", data: subscription },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
export const POST = verifyToken(subscribe);
