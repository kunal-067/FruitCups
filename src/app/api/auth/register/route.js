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
  sendOtp
} from "@/lib/Otp";

export async function POST(req) {
  try {
    await connectDb();
    const {
      name,
      email,
      password,
      phone
    } = await req.json();
    const cookieStore = await cookies();
    if (!name || !phone || !password) {
      return NextResponse.json({
        message: "Name, phone and password are required"
      }, {
        status: 400
      });
    }

    let user = await User.findOne({
      phone
    });

    if (user && user.isVerified) {
      return NextResponse.json({
        message: "Phone no already registered"
      }, {
        status: 400
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Send OTP first (fail early if service is down)
    const otpRes = await sendOtp(phone);
    if (!otpRes?.data?.verificationId) {
      return NextResponse.json({
        message: "Failed to send OTP"
      }, {
        status: 502
      });
    }

    // Create or update user
    if (!user) {
      user = new User({
        name,
        email: email || null,
        password: passwordHash,
        phone,
        isVerified: false,
      });
    } else {
      user.name = name;
      user.email = email || user.email;
      user.password = passwordHash;
    }

    // Tokens
    const refreshToken = signRefreshToken({
      userId: user._id,
      email: user.email,
      phone,
    });
    const accessToken = signAccessToken({
      userId: user._id,
      email: user.email,
      phone,
    });

    // Store hashed refresh token
    user.refreshToken = {
      value: await bcrypt.hash(refreshToken, 10),
      lastRefresh: new Date(),
    };

    await user.save();

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 60,
    });
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
    });

    return NextResponse.json({
      message: "User pre-registered successfully. Please verify OTP.",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        verificationId: otpRes.data.verificationId,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      message: "Internal server error",
      error: err.message
    }, {
      status: 500
    });
  }
}






