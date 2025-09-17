import { connectDb } from "@/utils/dbconnect";
import { Cart } from "@/utils/models/cart.model";
import { NextResponse } from "next/server";
import { verifyToken } from "@/app/api/auth/middleware";

// 📌 PUT update quantity
async function updateCartItem(req, user, { params }) {
  try {
    const { quantity } = await req.json();

    if (!quantity || quantity < 1) {
      return NextResponse.json({ message: "Quantity must be at least 1" }, { status: 400 });
    }

    await connectDb();
    const cart = await Cart.findOne({ userId: user.id });

    if (!cart) return NextResponse.json({ message: "Cart not found" }, { status: 404 });

    const item = cart.products.find((p) => p.productId.toString() === params.id);
    if (!item) return NextResponse.json({ message: "Product not in cart" }, { status: 404 });

    item.quantity = quantity;
    await cart.save();

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating cart item", error: error.message },
      { status: 500 }
    );
  }
}
// 📌 DELETE remove item
async function removeCartItem(req, user, { params }) {
  try {
    await connectDb();
    const cart = await Cart.findOne({ userId: user.id });

    if (!cart) return NextResponse.json({ message: "Cart not found" }, { status: 404 });

    cart.products = cart.products.filter((p) => p.productId.toString() !== params.id);

    await cart.save();

    return NextResponse.json({ message: "Item removed", cart }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error removing item", error: error.message },
      { status: 500 }
    );
  }
}


export const PUT = verifyToken(updateCartItem);
export const DELETE = verifyToken(removeCartItem);
