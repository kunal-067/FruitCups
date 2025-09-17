import { connectDb } from "@/utils/dbconnect";
import { Review } from "@/utils/models/review.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// 📌 GET reviews for a product
export async function GET(req, { params }) {
  try {
    const {productId} = await params;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
          return NextResponse.json(
            { message: "Invalid product ID format" },
            { status: 400 }
          );
        }
      
    await connectDb();
    const reviews = await Review.find({ product: productId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      { message: "Successfully fetched reviews", reviews },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
