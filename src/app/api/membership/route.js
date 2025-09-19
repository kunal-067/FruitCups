import {
  connectDb
} from "@/utils/dbconnect";
import {
  Membership
} from "@/utils/models/membership.model";
import {
  NextResponse
} from "next/server";
import {
  verifyToken
} from "@/app/api/auth/middleware";
import mongoose from "mongoose";
import {
  defaultScheduledPlan,
  plans
} from "@/lib/planConfigs";

// 📌 GET available membership plans
export async function GET(req) {
  try {
    await connectDb();
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    // await Membership.deleteMany({});

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({
        success: false,
        message: "Invalid product ID format"
      }, {
        status: 400
      });
    }
    const plans = await Membership.find({
      user: userId
    });

    return NextResponse.json({
      message: "Successfully fetched membership plans",
      plans
    }, {
      status: 200
    });
  } catch (error) {
    return NextResponse.json({
      message: "Internal server error",
      error: error.message
    }, {
      status: 500
    });
  }
}

// 📌 POST subscribe to a membership
async function subscribe(req, user) {
  try {
    const {
      planId,
      slot,
      billing
    } = await req.json();

    const selectedPlan = plans.find(p => p.id == planId)
    if (!planId || !billing || !selectedPlan) {
      return NextResponse.json({
        message: "planId and duration are missing or invalid"
      }, {
        status: 400
      });
    }
    const validSlots = ['morning', 'evening'];
    if (slot && !validSlots.includes(slot)) {
      return NextResponse.json({
        message: "Invalid slot"
      }, {
        status: 400
      });
    }

    await connectDb();
    let duration;
    if (billing === 'weekly') {
      duration = 7 * 24 * 60 * 60 * 1000
    } else if (billing === 'monthly') {
      duration = 30 * 24 * 60 * 60 * 1000
    } else if (billing === 'quarterly') {
      duration = 4 * 30 * 24 * 60 * 60 * 1000
    }
    const subscription = new Membership({
      user: user.userId,
      planId,
      plan: selectedPlan.name,
      slot,
      billing,
      schedule: defaultScheduledPlan,
      startDate: new Date,
      endDate: new Date(Date.now() + duration)
    });
    await subscription.save();

    return NextResponse.json({
      message: "Successfully subscribed to membership",
      data: subscription
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
export const POST = verifyToken(subscribe);

async function verifySubscribe(res, user) {
  try {
    const {
      membershipId,
      upiId
    } = await res.json();
    if (upiId !== 'testdemo@upi') {
      return NextResponse.json({
        message: "Invalid payment",
        data: null
      }, {
        status: 402
      })
    }

    const subscription = await Membership.findById(membershipId);
    if (!subscription) {
      return NextResponse.json({
        message: "Invalid subscription id",
        data: null
      }, {
        status: 404
      });
    }

    let duration;
    if (subscription.billing === 'weekly') {
      duration = 7 * 24 * 60 * 60 * 1000
    } else if (subscription.billing === 'monthly') {
      duration = 30 * 24 * 60 * 60 * 1000
    } else if (subscription.billing === 'quarterly') {
      duration = 4 * 30 * 24 * 60 * 60 * 1000
    }

    subscription.isActive = true;
    subscription.startDate = new Date
    subscription.endDate = new Date(Date.now() + duration)
    await subscription.save();
    return NextResponse.json({
      message: 'Subscribed successfully',
      data: subscription
    })
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
export const PATCH = verifyToken(verifySubscribe)