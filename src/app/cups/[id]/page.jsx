"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ChevronLeft, ChevronRight, PlusCircle, MinusCircle } from "lucide-react";

const product = {
  id: "prod-1",
  name: "Fresh Mango Fruit Cup - 500g",
  brand: "Kota Fresh",
  price: 129,
  mrp: 199,
  images: ["/products/prod-1.png", "/products/prod-1-2.png", "/products/prod-1-3.png"],
  sizes: ["Small (250g)", "Regular (500g)", "Large (1kg)"],
  rating: 4.4,
  reviewCount: 38,
  description:
    "Hand-cut fresh seasonal mango slices packed daily. No preservatives — perfect morning snack for students. Delivered chilled and ready to eat.",
  highlights: ["Cut & cleaned", "No preservatives", "Daily fresh supply", "Delivered chilled"],
};

// fruits and toppings with approximate nutrient values per serving (illustrative)
const FRUITS = [
  { name: "Mango", calories: 60, vitaminC_mg: 36, fiber_g: 2.6, protein_g: 0.8 },
  { name: "Papaya", calories: 43, vitaminC_mg: 60, fiber_g: 1.7, protein_g: 0.5 },
  { name: "Watermelon", calories: 30, vitaminC_mg: 8, fiber_g: 0.4, protein_g: 0.6 },
  { name: "Pineapple", calories: 50, vitaminC_mg: 47.8, fiber_g: 1.4, protein_g: 0.5 },
  { name: "Banana", calories: 89, vitaminC_mg: 8.7, fiber_g: 2.6, protein_g: 1.1 },
];

const TOPPINGS = [
  { name: "Dry Fruits", calories: 120, vitaminC_mg: 0, fiber_g: 2, protein_g: 3 },
  { name: "Chia Seeds", calories: 60, vitaminC_mg: 0, fiber_g: 5, protein_g: 2 },
  { name: "Honey", calories: 64, vitaminC_mg: 0, fiber_g: 0, protein_g: 0 },
  { name: "Mint", calories: 2, vitaminC_mg: 1, fiber_g: 0.2, protein_g: 0.1 },
  { name: "Granola", calories: 130, vitaminC_mg: 0, fiber_g: 2, protein_g: 3 },
];

// initial reviews
const INITIAL_REVIEWS = [
  { id: 1, name: "Aman R.", rating: 5, date: "2025-09-01", comment: "Perfect breakfast before college. Fresh and filling." },
  { id: 2, name: "Neha S.", rating: 5, date: "2025-08-25", comment: "Affordable subscription & always on time." },
  { id: 3, name: "Rohit K.", rating: 4, date: "2025-08-20", comment: "Good portion size and tasty fruits." },
];

export default function ProductDetail() {
  const [mainIndex, setMainIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1]);
  const [quantity, setQuantity] = useState(1);

  const [selectedFruits, setSelectedFruits] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState([]);

  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(null);

  const [tab, setTab] = useState("description"); // description | reviews | details | nutrition
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);

  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState("");

  // toggle selection helpers
  const toggleFruit = (name) =>
    setSelectedFruits((cur) => (cur.includes(name) ? cur.filter((c) => c !== name) : [...cur, name]));
  const toggleTopping = (name) =>
    setSelectedToppings((cur) => (cur.includes(name) ? cur.filter((c) => c !== name) : [...cur, name]));

  // compute aggregated nutrition for selected fruits + toppings
  const nutrition = useMemo(() => {
    const base = { calories: 0, vitaminC_mg: 0, fiber_g: 0, protein_g: 0 };
    selectedFruits.forEach((fName) => {
      const f = FRUITS.find((x) => x.name === fName);
      if (f) {
        base.calories += f.calories;
        base.vitaminC_mg += f.vitaminC_mg;
        base.fiber_g += f.fiber_g;
        base.protein_g += f.protein_g;
      }
    });
    selectedToppings.forEach((tName) => {
      const t = TOPPINGS.find((x) => x.name === tName);
      if (t) {
        base.calories += t.calories;
        base.vitaminC_mg += t.vitaminC_mg;
        base.fiber_g += t.fiber_g;
        base.protein_g += t.protein_g;
      }
    });
    // multiply by quantity
    return {
      calories: Math.round(base.calories * quantity),
      vitaminC_mg: Math.round(base.vitaminC_mg * quantity * 10) / 10,
      fiber_g: Math.round(base.fiber_g * quantity * 10) / 10,
      protein_g: Math.round(base.protein_g * quantity * 10) / 10,
    };
  }, [selectedFruits, selectedToppings, quantity]);

  const applyCoupon = () => {
    if (!coupon) return;
    const code = coupon.toUpperCase().trim();
    if (code === "STUDENT10") setCouponApplied({ code, discount: 10 });
    else if (code === "FRESH20") setCouponApplied({ code, discount: 20 });
    else setCouponApplied({ code, discount: 0, invalid: true });
  };

  const priceBefore = product.price * quantity;
  const priceAfterCoupon = () => {
    if (!couponApplied || !couponApplied.discount) return priceBefore;
    return Math.max(1, Math.round(priceBefore * (1 - couponApplied.discount / 100)));
  };

  const avgRating = useMemo(() => {
    if (!reviews.length) return 0;
    return (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  }, [reviews]);

  const submitReview = () => {
    if (!newReviewName.trim() || !newReviewText.trim()) {
      alert("Please add your name and comment.");
      return;
    }
    const newR = {
      id: Date.now(),
      name: newReviewName.trim(),
      rating: newReviewRating,
      date: new Date().toISOString().slice(0, 10),
      comment: newReviewText.trim(),
    };
    setReviews((r) => [newR, ...r]);
    setNewReviewName("");
    setNewReviewText("");
    setNewReviewRating(5);
    setTab("reviews");
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Images column */}
          <div className="md:w-1/2 border-r border-gray-100 p-4 md:p-6">
            <div className="flex gap-4">
              <div className="hidden md:flex flex-col gap-3 w-20 h-[520px] overflow-y-auto">
                {product.images.map((src, i) => (
                  <button
                    key={src + i}
                    onClick={() => setMainIndex(i)}
                    className={`p-1 rounded-lg flex items-center justify-center border ${mainIndex === i ? "border-emerald-600 ring-2 ring-emerald-100" : "border-transparent"}`}
                    aria-label={`Show image ${i + 1}`}
                  >
                    <Image src={src} width={72} height={72} alt={`${product.name} ${i + 1}`} className="w-full h-auto drop-shadow-sm" />
                  </button>
                ))}
              </div>

              <div className="relative flex-1 flex flex-col items-center justify-center">
                <div className="w-full md:h-[520px] flex items-center justify-center bg-gray-50 rounded-lg p-4">
                  <Image src={product.images[mainIndex]} alt={product.name} width={520} height={520} className="max-h-[480px] w-auto h-auto object-contain" />
                </div>

                <div className="md:hidden flex gap-3 mt-3 overflow-x-auto px-2">
                  {product.images.map((src, i) => (
                    <button key={src + i} onClick={() => setMainIndex(i)} className={`p-1 rounded-lg flex-shrink-0 ${mainIndex === i ? "ring-2 ring-emerald-200" : ""}`}>
                      <Image src={src} width={72} height={72} alt={`thumb-${i}`} className="drop-shadow-sm" />
                    </button>
                  ))}
                </div>

                <button
                  className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 items-center justify-center bg-white rounded-full p-2 shadow cursor-pointer"
                  onClick={() => setMainIndex((m) => (m - 1 + product.images.length) % product.images.length)}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-center bg-white rounded-full p-2 shadow cursor-pointer"
                  onClick={() => setMainIndex((m) => (m + 1) % product.images.length)}
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className="flex gap-3 mt-4 md:hidden justify-center">
              <Button className="flex-1" onClick={() => alert("Add to cart mock")}>Add to Cart</Button>
              <Button className="flex-1" onClick={() => alert("Buy now mock")}>Buy Now</Button>
            </div>
          </div>

          {/* Details column */}
          <div className="md:w-1/2 p-6 space-y-4">
            <div>
              <h1 className="text-2xl font-semibold">{product.name}</h1>
              <p className="text-sm text-gray-500">by {product.brand}</p>

              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1">
                  <span className="flex items-center gap-1 text-yellow-500">
                    <Star size={16} /> {avgRating}
                  </span>
                  <span className="text-sm text-gray-500">({reviews.length} reviews)</span>
                </div>
              </div>

              <div className="mt-4 flex items-baseline gap-3">
                <div className="text-2xl font-bold">₹{product.price}</div>
                <div className="text-sm line-through text-gray-400">₹{product.mrp}</div>
                <div className="text-sm text-green-600 font-medium">{Math.round(((product.mrp - product.price) / product.mrp) * 100)}% off</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-2 rounded-lg border ${selectedSize === s ? "border-emerald-600 bg-emerald-50" : "border-gray-200 bg-white"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Quantity</h3>
                <div className="flex items-center gap-3">
                  <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="p-2 rounded-md border">
                    <MinusCircle />
                  </button>
                  <div className="px-4">{quantity}</div>
                  <button onClick={() => setQuantity((q) => q + 1)} className="p-2 rounded-md border">
                    <PlusCircle />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-lg font-semibold">₹{priceAfterCoupon()}</div>
              <Button onClick={() => alert("Added to cart (mock)")}>Add to Cart</Button>
              <Button onClick={() => alert("Proceed to buy (mock)")} className="bg-amber-500 hover:bg-amber-600">Buy Now</Button>
            </div>

            <div className="flex gap-3 items-center">
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Coupon code (e.g. STUDENT10)"
                className="flex-1 border rounded-lg px-3 py-2"
              />
              <Button onClick={applyCoupon}>Apply</Button>
              {couponApplied && (
                <div className={`text-sm ${couponApplied.discount ? "text-green-600" : "text-red-600"}`}>
                  {couponApplied.invalid ? "Invalid coupon" : `${couponApplied.discount}% applied`}
                </div>
              )}
            </div>

            {/* Tabs */}
            <div>
              <div className="flex gap-3 border-b border-gray-100 mb-4">
                <button onClick={() => setTab("description")} className={`py-2 ${tab === "description" ? "text-emerald-600 border-b-2 border-emerald-600" : "text-gray-600"}`}>Description</button>
                <button onClick={() => setTab("nutrition")} className={`py-2 ${tab === "nutrition" ? "text-emerald-600 border-b-2 border-emerald-600" : "text-gray-600"}`}>Nutrition</button>
                <button onClick={() => setTab("reviews")} className={`py-2 ${tab === "reviews" ? "text-emerald-600 border-b-2 border-emerald-600" : "text-gray-600"}`}>Reviews</button>
                <button onClick={() => setTab("details")} className={`py-2 ${tab === "details" ? "text-emerald-600 border-b-2 border-emerald-600" : "text-gray-600"}`}>Details</button>
              </div>

              <div>
                {tab === "description" && (
                  <div className="prose max-w-none text-sm text-gray-700">
                    <p>{product.description}</p>
                    <ul className="mt-2 list-disc ml-5">
                      {product.highlights.map((h) => <li key={h}>{h}</li>)}
                    </ul>
                  </div>
                )}

                {tab === "nutrition" && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Nutrition Summary (selected items)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-slate-700">
                          <div className="flex justify-between py-1"><span>Calories</span><span className="font-medium">{nutrition.calories} kcal</span></div>
                          <div className="flex justify-between py-1"><span>Vitamin C</span><span className="font-medium">{nutrition.vitaminC_mg} mg</span></div>
                          <div className="flex justify-between py-1"><span>Fiber</span><span className="font-medium">{nutrition.fiber_g} g</span></div>
                          <div className="flex justify-between py-1"><span>Protein</span><span className="font-medium">{nutrition.protein_g} g</span></div>
                        </div>
                        <div className="text-xs text-slate-500 mt-2">*Values are approximate per selected combination</div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Selected Ingredients</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm">
                          <div className="font-medium">Fruits</div>
                          {selectedFruits.length ? selectedFruits.map((f) => {
                            const fd = FRUITS.find(x => x.name === f);
                            return (
                              <div key={f} className="py-1 flex justify-between items-center">
                                <div>
                                  <div className="font-medium">{f}</div>
                                  <div className="text-xs text-slate-500">Calories: {fd.calories} kcal • Vit C: {fd.vitaminC_mg} mg • Fiber: {fd.fiber_g} g</div>
                                </div>
                                <Badge>{fd.calories} kcal</Badge>
                              </div>
                            );
                          }) : <div className="text-xs text-slate-500">No fruits selected</div>}

                          <div className="mt-3 font-medium">Toppings</div>
                          {selectedToppings.length ? selectedToppings.map((t) => {
                            const td = TOPPINGS.find(x => x.name === t);
                            return (
                              <div key={t} className="py-1 flex justify-between items-center">
                                <div>
                                  <div className="font-medium">{t}</div>
                                  <div className="text-xs text-slate-500">Calories: {td.calories} kcal • Protein: {td.protein_g} g</div>
                                </div>
                                <Badge>{td.calories} kcal</Badge>
                              </div>
                            );
                          }) : <div className="text-xs text-slate-500">No toppings selected</div>}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {tab === "reviews" && (
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

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Write a review</h4>
                      <div className="grid gap-2">
                        <input value={newReviewName} onChange={(e) => setNewReviewName(e.target.value)} placeholder="Your name" className="border rounded-md px-3 py-2" />
                        <div className="flex items-center gap-2">
                          <div className="text-sm">Your rating:</div>
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => {
                              const v = i + 1;
                              return (
                                <button key={i} onClick={() => setNewReviewRating(v)} className={v <= newReviewRating ? "text-yellow-500" : "text-gray-300"}>
                                  <Star />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        <textarea value={newReviewText} onChange={(e) => setNewReviewText(e.target.value)} rows={4} placeholder="Share your experience" className="border rounded-md p-2" />
                        <div className="flex justify-end">
                          <Button onClick={submitReview}>Submit Review</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {tab === "details" && (
                  <div className="text-sm text-gray-700">
                    <table className="w-full text-left">
                      <tbody>
                        <tr>
                          <td className="py-2 font-medium">Net Weight</td>
                          <td className="py-2">500g</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Ingredients</td>
                          <td className="py-2">Mango slices (ripe), lemon (trace), salt (trace)</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Shelf life</td>
                          <td className="py-2">24 hours refrigerated</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Storage</td>
                          <td className="py-2">Keep refrigerated</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Returns</td>
                          <td className="py-2">Return possible within 24 hours if product is damaged. Pickup scheduled on request.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Customize section (inline under main card) */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3">Customize: mix fruits & toppings</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader><CardTitle>Fruits</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {FRUITS.map((f) => (
                    <button
                      key={f.name}
                      onClick={() => toggleFruit(f.name)}
                      className={`px-3 py-2 rounded-md text-sm ${selectedFruits.includes(f.name) ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-800"}`}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Toppings</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {TOPPINGS.map((t) => (
                    <button
                      key={t.name}
                      onClick={() => toggleTopping(t.name)}
                      className={`px-3 py-2 rounded-md text-sm ${selectedToppings.includes(t.name) ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-800"}`}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Nutrition Preview</CardTitle></CardHeader>
              <CardContent>
                <div className="text-sm">
                  <div className="flex justify-between py-1"><span>Calories</span><span className="font-medium">{nutrition.calories} kcal</span></div>
                  <div className="flex justify-between py-1"><span>Vitamin C</span><span className="font-medium">{nutrition.vitaminC_mg} mg</span></div>
                  <div className="flex justify-between py-1"><span>Fiber</span><span className="font-medium">{nutrition.fiber_g} g</span></div>
                  <div className="flex justify-between py-1"><span>Protein</span><span className="font-medium">{nutrition.protein_g} g</span></div>
                </div>
                <div className="text-xs text-slate-500 mt-2">Tip: pick at least 2 fruits for better nutrient balance.</div>
                <div className="mt-3">
                  <Button onClick={() => alert("Custom cup added to cart (mock)")}>Add Custom Cup</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold mb-4">You may also like</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Papaya Cup", "Watermelon Cup", "Pineapple Cup", "Mixed Fruit Cup"].map((name, idx) => (
              <Card key={idx} className="p-3">
                <CardContent className="text-center">
                  <div className="w-full h-28 relative mb-2">
                    <Image src="/fruit-placeholder.jpg" alt={name} fill className="object-cover rounded-md" />
                  </div>
                  <div className="font-medium">{name}</div>
                  <div className="text-sm text-emerald-600 font-semibold">₹99</div>
                  <div className="mt-2">
                    <Button size="sm" onClick={() => alert("View product (mock)")}>View</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop sticky summary */}
      <div className="hidden md:flex items-center justify-between p-4 border-t border-gray-100 mt-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-50 rounded-md grid place-items-center overflow-hidden">
            <Image src={product.images[0]} width={64} height={64} alt="small" className="w-full h-auto object-contain" />
          </div>
          <div>
            <div className="font-medium">{product.name}</div>
            <div className="text-sm text-slate-500">{selectedSize} • {selectedFruits.join(", ") || "Default"}</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-lg font-semibold">₹{priceAfterCoupon()}</div>
          <Button onClick={() => alert("Added to cart (mock)")}>Add to Cart</Button>
          <Button onClick={() => alert("Buy now (mock)")} className="bg-amber-500 hover:bg-amber-600">Buy Now</Button>
        </div>
      </div>
    </div>
  );
}
