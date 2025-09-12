import {
    connectDb
} from "@/utils/dbconnect";
import {
    Product
} from "@/utils/models/product.model";
import {
    NextResponse
} from "next/server";
import {
    verifyToken
} from "@/utils/middlewares/verifyToken";

// ✅ GET all products
export const GET = async () => {
    try {
        await connectDb();
        const products = await Product.find();

        return NextResponse.json(products, {
            status: 200
        });
    } catch (error) {
        return NextResponse.json({
            message: "Error fetching products",
            error: error.message,
        }, {
            status: 500
        });
    }
};

// ✅ POST (create new product) → Protected
async function createProduct(req, user) {
    try {
        if (!user?.isAdmin) {
            return NextResponse.json({
                message: "Unauthorized"
            }, {
                status: 403
            });
        }

        const body = await req.json();
        const {
            name,
            price,
            nutrients,
            description,
            images,
            type
        } = body;

        if (!name || !price || !type) {
            return NextResponse.json({
                message: "Name, price, and type are required"
            }, {
                status: 400
            });
        }

        await connectDb();

        const product = new Product({
            name,
            price,
            nutrients,
            description,
            images,
            type,
        });

        await product.save();

        return NextResponse.json(product, {
            status: 201
        });
    } catch (error) {
        return NextResponse.json({
            message: "Error creating product",
            error: error.message,
        }, {
            status: 500
        });
    }
}

// ✅ Protect POST with verifyToken middleware
export const POST = verifyToken(createProduct);