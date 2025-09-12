// app/product/[id]/page.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetailPage() {
  // Example product data (replace with DB/fetch later)
  const product = {
    id: 1,
    name: "Mango Fruit Cup",
    price: 120,
    image: "/mango-cup.jpg",
    nutrients: ["Vitamin C", "Fiber", "Natural Sugar"],
    description:
      "A refreshing mango fruit cup made from freshly cut, seasonal mangoes. Perfect for a healthy energy boost.",
    delivery: "Delivered within 30 minutes in Kota",
    reviews: [
      { name: "Rohan", rating: 5, comment: "Super fresh and tasty!" },
      { name: "Anjali", rating: 4, comment: "Loved it, but a bit too sweet." },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Product Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="rounded-2xl shadow-md"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-lg text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-orange-600 mb-4">
            ₹{product.price}
          </p>

          <div className="flex gap-2 mb-4">
            {product.nutrients.map((nutrient, i) => (
              <Badge key={i} variant="secondary">
                {nutrient}
              </Badge>
            ))}
          </div>

          <div className="flex gap-4 mb-6">
            <Button className="bg-orange-500 hover:bg-orange-600">
              Add to Cart
            </Button>
            <Button variant="outline">Buy Now</Button>
          </div>

          <p className="text-sm text-green-600 font-medium">
            🚚 {product.delivery}
          </p>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
        <div className="space-y-4">
          {product.reviews.map((review, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{review.name}</span>
                  <div className="flex">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-500 fill-yellow-500"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Suggested Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">You may also like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Papaya Cup", "Watermelon Cup", "Pineapple Cup"].map(
            (name, idx) => (
              <Link href={`/product/${idx + 2}`} key={idx}>
                <Card className="cursor-pointer hover:shadow-lg transition">
                  <CardContent className="p-4 text-center">
                    <Image
                      src="/fruit-placeholder.jpg"
                      alt={name}
                      width={150}
                      height={150}
                      className="mx-auto rounded-lg"
                    />
                    <h3 className="mt-2 font-medium">{name}</h3>
                    <p className="text-sm text-gray-600">₹100</p>
                  </CardContent>
                </Card>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}
