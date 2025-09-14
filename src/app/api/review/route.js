import { connectDb } from "@/utils/dbconnect";
import { Review } from "@/utils/models/review.model";
import { Product } from "@/utils/models/product.model";
import { NextResponse } from "next/server";
import { verifyToken } from "../auth/middleware";

// 📌 POST new review
async function createReview(req, user) {
  try {
    const { productId, rating, comment } = await req.json();
    if (!productId || !rating) {
      return NextResponse.json(
        { message: "ProductId and rating are required" },
        { status: 400 }
      );
    }

    await connectDb();

    // ensure product exists
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    const review = new Review({
      product: productId,
      user: user.id,
      rating,
      comment,
    });
    await review.save();

    return NextResponse.json(
      { message: "Review added successfully", data: review },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
export const POST = verifyToken(createReview);
