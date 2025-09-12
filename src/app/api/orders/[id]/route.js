import { connectDb } from "@/utils/dbconnect";
import { Order } from "@/utils/models/order.model";
import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/middleware/auth";

// 📌 GET single order (only owner or admin)
async function getOrder(req, user, { params }) {
  try {
    await connectDb();
    const order = await Order.findById(params.id).populate("products.product");

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    if (order.user.toString() !== user.id && !user.isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    return NextResponse.json(
      { message: "Successfully fetched order", data: order },
      { status: 200 }
    );
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
// 📌 PUT update status (Admin only)
async function updateOrder(req, user, { params }) {
  try {
    if (!user.isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const { status } = await req.json();
    if (!["pending", "completed", "cancelled"].includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 });
    }

    await connectDb();
    const order = await Order.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Order updated successfully", data: order },
      { status: 200 }
    );
  } catch (error) {
      console.error(error)
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

// 📌 DELETE cancel order (owner or admin)
async function cancelOrder(req, user, { params }) {
  try {
    await connectDb();
    const order = await Order.findById(params.id);

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    if (order.user.toString() !== user.id && !user.isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    order.status = "cancelled";
    await order.save();

    return NextResponse.json(
      { message: "Order cancelled successfully", data: order },
      { status: 200 }
    );
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

export const GET = verifyToken(getOrder);
export const PUT = verifyToken(updateOrder);
export const DELETE = verifyToken(cancelOrder);
