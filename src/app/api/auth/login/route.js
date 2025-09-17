import {
  NextResponse
} from "next/server";
import {
  cookies
} from "next/headers";
import bcrypt from "bcryptjs";
import {
  User
} from "@/utils/models/user.model";
import {
  connectDb
} from "@/utils/dbconnect";
import {
  signAccessToken,
  signRefreshToken
} from "@/lib/jwt";
import {
  sendOtp,
  verifyOtp
} from "@/lib/Otp";

export async function POST(req) {
  try {
    await connectDb();
    const {
      email,
      password,
      phone
    } = await req.json();

    if ((!email && !phone) || !password) {
      return NextResponse.json({
        error: "Missing parameters!"
      }, {
        status: 400
      });
    }

    // Find by phone or email
    const user = await User.findOne({
      phone
    }).select("+password +refreshToken");

    if (!user) {
      return NextResponse.json({
        message: "Invalid phone no or email"
      }, {
        status: 400
      });
    }

    // Compare password
    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass) {
      return NextResponse.json({
        message: "Wrong password! Try again"
      }, {
        status: 400
      });
    }

    // Create tokens
    const refreshToken = signRefreshToken({
      userId: user._id,
      email: user.email,
      phone: user.phone
    });
    const accessToken = signAccessToken({
      userId: user._id,
      email: user.email,
      phone: user.phone
    });

    // Hash refresh token before saving
    const hashedRefresh = await bcrypt.hash(refreshToken, 10);
    user.refreshToken = {
      value: hashedRefresh,
      lastRefresh: new Date()
    };
    await user.save();

    // Set cookies
    const cookieStore = cookies();
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 30 * 60, // 30 min
    });
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return NextResponse.json({
      message: "Logged in successfully",
      accessToken,
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        phone: user.phoe
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({
      message: "Internal server error",
      error: err.message
    }, {
      status: 500
    });
  }
}


export async function GET() {
  try {
    // const res = await sendOtp(9241033110);
    const res = await verifyOtp(6540, 9241033110, 1797731)
    return NextResponse.json({
      msg: res.message,
      data: res
    })
  } catch (err) {
    console.log(err)
    return NextResponse.json({
      msg: err.message,
      err
    })
  }
}