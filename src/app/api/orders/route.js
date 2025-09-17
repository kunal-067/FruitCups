import {
  connectDb
} from "@/utils/dbconnect";
import {
  Order
} from "@/utils/models/order.model";
import {
  NextResponse
} from "next/server";
import {
  verifyToken
} from "@/app/api/auth/middleware";

// 📌 GET all orders (Admin only)
async function getOrders(req, user) {
  try {
    let orders = null;
    await connectDb();
    if (user.role == 'admin') {
      orders = await Order.find()
      // .populate("products.productId");
    } else {
      orders = await Order.find({
        user: user.userId
      })
      // .populate("products.productId")
    }

    return NextResponse.json({
      message: "Successfully fetched orders",
      orders
    }, {
      status: 200
    });
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      message: "Internal server error",
      error: error.message
    }, {
      status: 500
    });
  }
}
export const GET = verifyToken(getOrders);

// 📌 POST create order (from cart)
async function createOrder(req, user) {
  try {
    await connectDb();
    const {
      products,
      address,
      couponApplied,
      payment
    } = await req.json();

    if (!products?.length || !address || !payment) {
      return NextResponse.json({
        message: "Invalid sumbit",
        data: null
      }, {
        status: 401
      })
    }
    if (payment.method != 'upi' && payment.upiId != 'testdemo@upi') {
      return NextResponse.json({
        message: 'Invalid payment details',
        data: null
      }, {
        status: 402
      })
    }
    const totalPrice = Math.round(products.reduce((price, p) => {
      const toppingsPrice = (p.toppings || []).reduce((acc, t) => acc + t.price, 0)
      const fruitsPrice = (p.fruits || []).reduce((acc, f) => acc + f.price, 0)
      return price + (toppingsPrice + fruitsPrice + p.priceAtPurchase) * (p.quantity || 1) * (p.size?.value || 2.5) / 2.5
    }, 0))
    let discount = couponApplied?.value == 'USER50' ? totalPrice * 50 / 100 : 0

    const newOrder = new Order({
      user: user.userId,
      products,
      totalPrice,
      finalPrice: totalPrice - discount,
      couponApplied: couponApplied ? [couponApplied] : [],
      payment,
      address,
      deliveryWithin: Date.now() + 7 * 60 * 60 * 1000
    })
    await newOrder.save();
    return NextResponse.json({
      message: "Ordered successfully",
      order: newOrder
    }, {
      status: 201
    });
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      message: "Internal server error",
      error: error.message
    }, {
      status: 500
    });
  }
}
export const POST = verifyToken(createOrder);