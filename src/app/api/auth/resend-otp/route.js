import {
    sendOtp
} from "@/lib/Otp";
import {
    NextResponse
} from "next/server";

export async function POST(req) {
    try {
        const {
            phone
        } = await req.json();
        const res = await sendOtp(phone);

        return NextResponse.json({
            message: 'Otp sent successfully !',
            data: {
                verificationId: res.data?.verificationId
            }
        }, {
            status: 200
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: error.message || "Internal server error !",
            error: error.message
        }, {
            status: 500
        })
    }
}