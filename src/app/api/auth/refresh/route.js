import {
    decodeRefreshToken,
    signAccessToken
} from "@/lib/jwt";
import {
    User
} from "@/utils/models/user.model";
import {
    cookies
} from "next/headers";
import {
    NextResponse
} from "next/server";

export async function GET(req) {
    try {
        const refreshToken = cookies().get('refreshToken')?.value;
        if (!refreshToken) return NextResponse.json({
            message: 'Invalid attempt, missing refresh token!'
        }, {
            status: 404
        })

        const decoded = decodeRefreshToken(refreshToken);
        const user = await User.findById(decoded.userId).select("+refreshToken");
        if (!user) return NextResponse.json({
            message: "User not found ! Invalid token"
        }, {
            status: 404
        })
        const tokenMatch = await bcrypt.compare(refreshToken, user.refreshToken.value);
        if (!tokenMatch) return NextResponse.json({
            message: 'Misleading token ! try later'
        }, {
            status: 402
        })

        const newAccessToken = signAccessToken({
            userId: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone
        })

        return NextResponse.json({
            message: "Successfully refreshed token",
            data: {
                accessToken: newAccessToken,
                refreshToken
            }
        }, {status:200})
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Internal server error",
            error: error.message
        }, {
            status: 500
        })
    }
}