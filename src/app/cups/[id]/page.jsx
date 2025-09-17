import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Star } from "lucide-react";
import WriteReview from "@/components/others/Review";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NutrientsCard from "@/components/NutrientsCard";
import { ProdDetailScreenCustomizing } from "@/components/others/CustomizeCups";
import { PopularCups } from "@/components/FruitCards";
import { SelectSize, CartOrBuy, CouponCard, EditQuntity, FinalPrice } from "@/components/others/ProdActions";
import { ImageCaresoul } from "@/components/others/ImageCaresoul";
import { Button } from "@/components/ui/button";
import Link from "next/link";


// app/product/[id]/page.jsx
// export async function generateStaticParams() {
//   const res = await fetch(`${process.env.BASE_URL}/api/product`);
//   const products = (await res.json()).data;

//   return products.map(p => ({ id: p._id.toString() }));
// }

export default async function ProductDetail({ params }) {

  const { id } = await params;
  const [prodRes, reviewRes] = await Promise.all([fetch(`${process.env.BASE_URL}/api/product/${id}`), fetch(`${process.env.BASE_URL}/api/review/${id}`)]);
  if (!prodRes.ok) {
    return (
      <div>
        <NoProduct />
      </div>
    )
  }

  const { product } = await prodRes.json();
  const { reviews } = await reviewRes.json();

  const totalStars = (reviews || []).reduce((acc, elem) => acc + (elem?.rating || 0), 0);
  const avgRating = reviews?.length ? totalStars / reviews.length : 0;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-4 md:p-8">
        <div className="md:flex">
          {/* Images column */}
          <ImageCaresoul product={product} />
          {/* Details column */}
          <div className="md:w-1/2 p-6 space-y-4">
            <div>
              <h1 className="text-2xl font-semibold">{product.name}</h1>
              <p className="text-sm text-gray-500">by Kota fruits</p>

              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1">
                  <span className="flex items-center gap-1 text-yellow-500">
                    <Star size={16} /> {avgRating || 4.3}
                  </span>
                  <span className="text-sm text-gray-500">({reviews.length} reviews)</span>
                </div>
              </div>

              <div className="mt-4 flex items-baseline gap-3">
                <div className="text-2xl font-bold">₹{product.price}</div>
                {/* mrp calculating based on discount on price */}
                <div className="text-sm line-through text-gray-400">₹{Math.round(product.price * 100 / (100 - (product.discount || 10)))}</div>
                <div className="text-sm text-green-600 font-medium">{product.discount || 10}% off</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Size</h3>
                <SelectSize />
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Quantity</h3>
                <EditQuntity />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FinalPrice p={product.price} />
              <CartOrBuy p={product} />
            </div>

            <CouponCard />

            {/* Tabs */}
            <Tabs defaultValue="details" className="">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                <TabsTrigger value="details">Detials</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="description">
                <div className="prose max-w-none text-sm text-gray-700">
                  <p>{product.description}</p>
                  <ul className="mt-2 list-disc ml-5">
                    {(product.highlights || []).map((h) => <li key={h}>{h}</li>)}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="nutrition">
                <NutrientsCard nutrition={product.nutrients} />
              </TabsContent>

              <TabsContent value="details">
                <div className="text-sm text-gray-700">
                  <table className="w-full text-left">
                    <tbody>
                      <tr>
                        <td className="py-2 font-medium">Net Weight: </td>
                        <td className="py-2">250g</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">Ingredients: </td>
                        <td className="py-2">Mango slices (ripe), lemon (trace), salt (trace)</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">Shelf life: </td>
                        <td className="py-2">24 hours refrigerated</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">Storage: </td>
                        <td className="py-2">Keep refrigerated</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">Returns: </td>
                        <td className="py-2">No Return available.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="reviews">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-semibold">{avgRating} <span className="text-sm text-slate-500">/ 5</span></div>
                      <div className="text-sm text-slate-500">{reviews.length} reviews</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {reviews.map((r) => (
                      <Card key={r.id}>
                        <CardContent>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-slate-100 grid place-items-center font-semibold">{r.name[0]}</div>
                              <div>
                                <div className="font-medium">{r.name}</div>
                                <div className="text-xs text-slate-500">{r.date}</div>
                              </div>
                            </div>
                            <div className="text-yellow-500 flex items-center gap-1">{Array.from({ length: 5 }).map((_, i) => <span key={i} className={i < r.rating ? "text-yellow-500" : "text-gray-200"}>★</span>)}</div>
                          </div>
                          <p className="mt-3 text-sm text-slate-700">{r.comment}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <WriteReview />
                </div>
              </TabsContent>
            </Tabs>

          </div>
        </div>

        {/* Customize section (inline under main card) */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3">Customize: mix fruits & toppings</h3>
          <ProdDetailScreenCustomizing nutrients={product.nutrients} />
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold mb-4">You may also like</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Papaya Cup", "Watermelon Cup", "Pineapple Cup", "Mixed Fruit Cup"].map((name, idx) => (
              // <Card key={idx} className="p-3">
              //   <CardContent className="text-center">
              //     <div className="w-full h-28 relative mb-2">
              //       <Image src="/fruit-placeholder.jpg" alt={name} fill className="object-cover rounded-md" />
              //     </div>
              //     <div className="font-medium">{name}</div>
              //     <div className="text-sm text-emerald-600 font-semibold">₹99</div>
              //     <div className="mt-2">
              //       <Button size="sm" onClick={() => alert("View product (mock)")}>View</Button>
              //     </div>
              //   </CardContent>
              // </Card>
              <PopularCups key={idx} />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop sticky summary */}
      <div className="hidden md:flex items-center justify-between p-4 border-t border-gray-100 mt-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-50 rounded-md grid place-items-center overflow-hidden">
            <Image src={product.images[0].url} width={64} height={64} alt="small" className="w-full h-auto object-contain" />
          </div>
          <div>
            <div className="font-medium">{product.name}</div>
            {/* <div className="text-sm text-slate-500">{selectedSize} • {selectedFruits.join(", ") || "Default"}</div> */}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-lg font-semibold">₹{90909}</div>
          <CartOrBuy />
        </div>
      </div>
    </div>
  );
}


export function NoProduct() {
  return (
    <div className="flex h-[70vh] items-center justify-center">
      <Card className="w-full max-w-md text-center p-6 shadow-lg rounded-2xl border">
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <AlertTriangle className="h-12 w-12 text-yellow-500" />
            <h2 className="text-xl font-semibold">Product not found</h2>
            <p className="text-gray-500 text-sm">
              The slice you’re looking for doesn’t exist or may have been removed.
            </p>

            <Link
              className="mt-4 bg-black text-white py-2 px-4 rounded-sm font-medium"
              href="/cups"
            >
              Browse Another Cups
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}