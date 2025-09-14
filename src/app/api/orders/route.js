import { connectDb } from "@/utils/dbconnect";
import { Order } from "@/utils/models/order.model";
import { Cart } from "@/utils/models/cart.model";
import { Product } from "@/utils/models/product.model";
import { NextResponse } from "next/server";
import { verifyToken } from "../auth/middleware";

// 📌 GET all orders (Admin only)
async function getOrders(req, user) {
  try {
    if (!user.isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    await connectDb();
    const orders = await Order.find().populate("products.product");

    return NextResponse.json(
      { message: "Successfully fetched orders", data: orders },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
export const GET = verifyToken(getOrders);

// 📌 POST create order (from cart)
async function createOrder(req, user) {
  try {
    await connectDb();
    const cart = await Cart.findOne({ userId: user.id }).populate("products.productId");

    if (!cart || cart.products.length === 0) {
      return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
    }

    const totalPrice = cart.products.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0
    );

    const order = new Order({
      user: user.id,
      products: cart.products.map((p) => ({
        product: p.productId._id,
        quantity: p.quantity,
        priceAtPurchase: p.productId.price,
        name: p.productId.name,
      })),
      totalPrice,
      address: "Default Address", // replace with user input later
    });

    await order.save();

    // Clear cart after placing order
    cart.products = [];
    await cart.save();

    return NextResponse.json(
      { message: "Order created successfully", data: order },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
export const POST = verifyToken(createOrder);
