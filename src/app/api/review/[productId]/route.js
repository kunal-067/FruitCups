import { connectDb } from "@/utils/dbconnect";
import { Review } from "@/utils/models/review.model";
import { NextResponse } from "next/server";

// 📌 GET reviews for a product
export async function GET(req, { params }) {
  try {
    await connectDb();
    const reviews = await Review.find({ product: params.productId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      { message: "Successfully fetched reviews", data: reviews },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
