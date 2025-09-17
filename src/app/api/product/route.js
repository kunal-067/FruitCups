import {
    connectDb
} from "@/utils/dbconnect";
import {
    Product
} from "@/utils/models/product.model";
import {
    NextResponse
} from "next/server";
import { verifyToken } from "@/app/api/auth/middleware";

export const GET = async (req) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get("search"); // ?search=apple
    const type = searchParams.get("type");     // ?type=fruit

    await connectDb();

    // Build query object dynamically
    let query = {};
    if (search) query.name = { $regex: search, $options: "i" }; // case-insensitive search
    if (type) query.type = type;

    const products = await Product.find(query);

    return NextResponse.json(
      {
        message: "Products fetched successfully",
        products,
        total:products.length,
        query: { search, type },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error fetching products",
        error: error.message,
      },
      { status: 500 }
    );
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