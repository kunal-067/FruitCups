import {
    verifyOtp
} from "@/lib/Otp";
import {
    User
} from "@/utils/models/user.model";
import {
    NextResponse
} from "next/server";

export async function POST(req) {
    try {
        const {
            mobileNumber,
            verificationId,
            otp,
            type
        } = await req.json();

        const res = await verifyOtp(otp, mobileNumber, verificationId);

        if (!res || !res.responseCode) {
            return NextResponse.json({
                message: "OTP verification failed. No response from server."
            }, {
                status: 500
            });
        }
       
        if (res.responseCode === 705) {
            return NextResponse.json({
                message: "OTP expired"
            }, {
                status: 401
            });
        }

        if (res.responseCode !== 200) {
            return NextResponse.json({
                message: "Invalid OTP"
            }, {
                status: 400
            });
        }

        if (type === "registration") {
            const user = await User.findOne({
                phone: mobileNumber
            });

            if (!user) {
                return NextResponse.json({
                    message: "User not found"
                }, {
                    status: 404
                });
            }

            if (!user.isVerified) {
                user.isVerified = true;
                await user.save();
            }
        }

        return NextResponse.json({
            message: "OTP verified successfully!"
        });
    } catch (error) {
        console.error("OTP Verify Error:", error);

        return NextResponse.json({
            message: error.message || "Internal server error",
            error: error.message || "Unknown error",
        }, {
            status: 500
        });
    }
}