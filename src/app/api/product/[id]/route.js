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
} from "@/app/api/auth/middleware";
import mongoose from "mongoose";

// Helper function that returns a Promise which resolves after ms milliseconds
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 📌 GET product by ID
export const GET = async (req, {
  params
}) => {
  try {
    const {
      id
    } = params; // main product ID

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        message: "Invalid product ID format"
      }, {
        status: 400
      });
    }

    await connectDb();

    // Get query params for pagination and type
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 5;
    const related = url.searchParams.get("related"); // type can be provided by query

    // Fetch main product and related products in parallel
    const productPromise = Product.findById(id);
    let product;
    let relatedProducts = [];
    if (related) {
      [product, relatedProducts] = await Promise.all([productPromise, Product.find({
          type: related || 'fruit'
        })
        .skip((page - 1) * limit)
        .limit(limit)
      ]);
    }else{
      product = await productPromise;
    }
    if (!product) {
      return NextResponse.json({
        message: "Product not found"
      }, {
        status: 404
      });
    }

    return NextResponse.json({
      message: "Product fetched successfully",
      product,
      relatedProducts,
      pagination: {
        page,
        limit
      },
    }, {
      status: 200
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error fetching product",
      error: error.message
    }, {
      status: 500
    });
  }
};

// 📌 PUT update product (protected)
async function updateProduct(req, user, {
  params
}) {
  try {
    const {
      id
    } = await params;
    if (!user?.isAdmin) {
      return NextResponse.json({
        message: "Unauthorized"
      }, {
        status: 403
      });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        message: "Invalid product ID format"
      }, {
        status: 400
      });
    }

    const body = await req.json();
    await connectDb();

    const updatedProduct = await Product.findByIdAndUpdate(params.id, body, {
      new: true
    });

    if (!updatedProduct) {
      return NextResponse.json({
        message: "Product not found"
      }, {
        status: 404
      });
    }

    return NextResponse.json(updatedProduct, {
      status: 200
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error updating product",
      error: error.message
    }, {
      status: 500
    });
  }
}
// 📌 DELETE product (protected)
async function deleteProduct(req, user, {
  params
}) {
  try {
    if (!user?.isAdmin) {
      return NextResponse.json({
        message: "Unauthorized"
      }, {
        status: 403
      });
    }

    await connectDb();
    const deletedProduct = await Product.findByIdAndDelete(params.id);

    if (!deletedProduct) {
      return NextResponse.json({
        message: "Product not found"
      }, {
        status: 404
      });
    }

    return NextResponse.json({
      message: "Product deleted successfully"
    }, {
      status: 200
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error deleting product",
      error: error.message
    }, {
      status: 500
    });
  }
}

export const PUT = verifyToken(updateProduct);
export const DELETE = verifyToken(deleteProduct);