// app/customize/page.jsx
"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const FRUITS = [
  { id: "mango", name: "Mango", img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=800&auto=format&fit=crop", pricePer100: 40, calories: 60, vitaminC_mg: 36, fiber_g: 2.6, protein_g: 0.8 },
  { id: "papaya", name: "Papaya", img: "https://images.unsplash.com/photo-1613145993482-bf9d6d6b6d10?q=80&w=800&auto=format&fit=crop", pricePer100: 30, calories: 43, vitaminC_mg: 60, fiber_g: 1.7, protein_g: 0.5 },
  { id: "watermelon", name: "Watermelon", img: "https://images.unsplash.com/photo-1592928303348-54d6d92c4e63?q=80&w=800&auto=format&fit=crop", pricePer100: 25, calories: 30, vitaminC_mg: 8, fiber_g: 0.4, protein_g: 0.6 },
  { id: "pineapple", name: "Pineapple", img: "https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=800&auto=format&fit=crop", pricePer100: 45, calories: 50, vitaminC_mg: 47.8, fiber_g: 1.4, protein_g: 0.5 },
  { id: "banana", name: "Banana", img: "https://images.unsplash.com/photo-1617191510513-1b7a3f1df2a6?q=80&w=800&auto=format&fit=crop", pricePer100: 35, calories: 89, vitaminC_mg: 8.7, fiber_g: 2.6, protein_g: 1.1 },
  { id: "apple", name: "Apple", img: "https://images.unsplash.com/photo-1567303315460-6c3c7f4a8b2a?q=80&w=800&auto=format&fit=crop", pricePer100: 38, calories: 52, vitaminC_mg: 4.6, fiber_g: 2.4, protein_g: 0.3 },
];

const TOPPINGS = [
  { id: "dryfruits", name: "Dry Fruits", price: 35, calories: 120, vitaminC_mg: 0, fiber_g: 2, protein_g: 3 },
  { id: "chiaseeds", name: "Chia Seeds", price: 20, calories: 60, vitaminC_mg: 0, fiber_g: 5, protein_g: 2 },
  { id: "honey", name: "Honey", price: 15, calories: 64, vitaminC_mg: 0, fiber_g: 0, protein_g: 0 },
  { id: "mint", name: "Mint", price: 5, calories: 2, vitaminC_mg: 1, fiber_g: 0.2, protein_g: 0.1 },
];

export default function CustomizePage() {
  // state: per fruit quantity in grams
  const [qtyByFruit, setQtyByFruit] = useState(() =>
    FRUITS.reduce((acc, f) => ({ ...acc, [f.id]: 0 }), {})
  );

  const [selectedToppings, setSelectedToppings] = useState([]);
  const [cupSize, setCupSize] = useState("medium"); // small | medium | large
  const [premiumType, setPremiumType] = useState("normal"); // normal | custom
  const [daysPlan, setDaysPlan] = useState(7);
  const [timePref, setTimePref] = useState("morning"); // morning | evening | both
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // helpers
  const updateQty = (id, newQty) => {
    setQtyByFruit((prev) => ({ ...prev, [id]: Math.max(0, Math.min(1000, Math.round(newQty))) }));
  };

  const toggleTopping = (id) => {
    setSelectedToppings((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));
  };

  // compute price per fruit and totals
  const itemsSelected = useMemo(() => {
    return FRUITS.map((f) => {
      const qty = qtyByFruit[f.id] || 0;
      const price = Math.round((qty / 100) * f.pricePer100);
      return { ...f, qty, price };
    }).filter((it) => it.qty > 0);
  }, [qtyByFruit]);

  const toppingsSelected = useMemo(() => {
    return TOPPINGS.filter((t) => selectedToppings.includes(t.id));
  }, [selectedToppings]);

  const basePrice = useMemo(() => itemsSelected.reduce((s, it) => s + it.price, 0), [itemsSelected]);
  const toppingsPrice = useMemo(() => toppingsSelected.reduce((s, t) => s + t.price, 0), [toppingsSelected]);

  // cup size multiplier for price (visual, could be more advanced)
  const sizeMultiplier = cupSize === "small" ? 0.8 : cupSize === "large" ? 1.5 : 1.0;
  const rawTotal = Math.round((basePrice + toppingsPrice) * sizeMultiplier);

  // membership discounts example
  const membershipDiscount = premiumType === "normal" ? 0.1 : 0.15; // normal 10%, custom 15%
  const totalAfterMembership = Math.round(rawTotal * (1 - membershipDiscount));

  // nutrition aggregate
  const nutrition = useMemo(() => {
    const total = { calories: 0, vitaminC_mg: 0, fiber_g: 0, protein_g: 0 };
    itemsSelected.forEach((it) => {
      const factor = it.qty / 100;
      total.calories += it.calories * factor;
      total.vitaminC_mg += it.vitaminC_mg * factor;
      total.fiber_g += it.fiber_g * factor;
      total.protein_g += it.protein_g * factor;
    });
    toppingsSelected.forEach((t) => {
      total.calories += t.calories;
      total.vitaminC_mg += t.vitaminC_mg;
      total.fiber_g += t.fiber_g;
      total.protein_g += t.protein_g;
    });
    // rounding for display
    return {
      calories: Math.round(total.calories),
      vitaminC_mg: Math.round(total.vitaminC_mg * 10) / 10,
      fiber_g: Math.round(total.fiber_g * 10) / 10,
      protein_g: Math.round(total.protein_g * 10) / 10,
    };
  }, [itemsSelected, toppingsSelected]);

  // progress values for a simple visual scale (arbitrary maxima for progress bars)
  const progress = {
    calories: Math.min(100, Math.round((nutrition.calories / 500) * 100)), // 500 kcal target scale
    vitaminC: Math.min(100, Math.round((nutrition.vitaminC_mg / 90) * 100)), // 90mg RDV-ish
    fiber: Math.min(100, Math.round((nutrition.fiber_g / 10) * 100)),
    protein: Math.min(100, Math.round((nutrition.protein_g / 20) * 100)),
  };

  // WhatsApp (mock) phone
  const whatsappNumber = "919999999999"; // replace with your number

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="relative">
        <div className="h-52 md:h-72 w-full relative">
          <Image
            src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop"
            alt="Fresh fruit cups hero"
            fill
            className="object-cover brightness-90"
          />
        </div>

        <div className="max-w-5xl mx-auto px-4 -mt-20 md:-mt-28">
          <Card className="p-6 rounded-2xl shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-700">Customize Your Cup</h1>
                <p className="mt-1 text-slate-600">Choose fruits, adjust quantity (grams), add toppings — price & nutrition update live.</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-sm text-slate-500 text-right">
                  <div>Total (live)</div>
                  <div className="text-xl font-bold text-amber-600">₹{rawTotal}</div>
                  <div className="text-xs text-slate-500">Size multiplier: {sizeMultiplier}x</div>
                </div>
                <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-amber-500 hover:bg-amber-600">Proceed to Checkout</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Checkout — Order Summary</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-3 mt-2">
                      <div className="text-sm">
                        <strong>Items</strong>
                        <div className="mt-2 space-y-2">
                          {itemsSelected.length ? itemsSelected.map((it) => (
                            <div key={it.id} className="flex justify-between text-sm">
                              <div>{it.name} • {it.qty}g</div>
                              <div>₹{it.price}</div>
                            </div>
                          )) : <div className="text-xs text-slate-500">No fruits selected</div>}
                        </div>
                      </div>

                      <div className="text-sm">
                        <strong>Toppings</strong>
                        <div className="mt-2 space-y-2">
                          {toppingsSelected.length ? toppingsSelected.map(t => (
                            <div key={t.id} className="flex justify-between text-sm">
                              <div>{t.name}</div>
                              <div>₹{t.price}</div>
                            </div>
                          )) : <div className="text-xs text-slate-500">No toppings</div>}
                        </div>
                      </div>

                      <Separator />

                      <div className="flex justify-between">
                        <div className="text-sm">Subtotal</div>
                        <div className="font-medium">₹{rawTotal}</div>
                      </div>
                      <div className="flex justify-between">
                        <div className="text-sm">Membership discount ({Math.round(membershipDiscount*100)}%)</div>
                        <div className="font-medium">-₹{Math.round(rawTotal - totalAfterMembership)}</div>
                      </div>
                      <div className="flex justify-between text-lg font-bold">
                        <div>Total</div>
                        <div>₹{totalAfterMembership}</div>
                      </div>
                    </div>

                    <DialogFooter>
                      <div className="flex gap-2 w-full">
                        <Button variant="outline" onClick={() => setCheckoutOpen(false)}>Close</Button>
                        <Button className="ml-auto" onClick={() => { setCheckoutOpen(false); alert("Order placed (mock). Thank you!"); }}>Place Order</Button>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* LEFT: Fruits selection & swipeable cards */}
          <section className="md:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pick Fruits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* horizontal scroll for mobile */}
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {FRUITS.map((f) => (
                      <div key={f.id} className={`min-w-[220px] w-56 flex-shrink-0 rounded-xl border p-3 ${qtyByFruit[f.id] > 0 ? "border-emerald-600 bg-emerald-50" : "border-gray-200 bg-white"}`}>
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-white">
                            <Image src={f.img} alt={f.name} width={64} height={64} className="object-cover" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{f.name}</div>
                            <div className="text-xs text-slate-500">{f.calories} kcal /100g • Vit C {f.vitaminC_mg}mg</div>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center gap-2">
                          <button onClick={() => updateQty(f.id, Math.max(0, (qtyByFruit[f.id] || 0) - 25))} className="px-2 py-1 rounded-md bg-white border">-</button>
                          <input type="number" value={qtyByFruit[f.id] || 0} onChange={(e) => updateQty(f.id, Number(e.target.value || 0))} className="w-20 text-center border rounded-md px-2 py-1" />
                          <button onClick={() => updateQty(f.id, (qtyByFruit[f.id] || 0) + 25)} className="px-2 py-1 rounded-md bg-white border">+</button>
                          <div className="ml-auto text-sm font-semibold text-amber-600">₹{Math.round(((qtyByFruit[f.id] || 0)/100)*f.pricePer100)}</div>
                        </div>

                        <div className="mt-2 text-xs text-slate-500 flex items-center gap-2">
                          <Badge>{Math.round(f.calories * ((qtyByFruit[f.id] || 0) / 100))} kcal</Badge>
                          <span>{Math.round(f.vitaminC_mg * ((qtyByFruit[f.id] || 0) / 100))} mg Vit C</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop grid for selection */}
                  <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {FRUITS.map((f) => (
                      <div key={f.id} className={`rounded-xl border p-3 ${qtyByFruit[f.id] > 0 ? "border-emerald-600 bg-emerald-50" : "border-gray-200 bg-white"}`}>
                        <div className="flex items-center gap-3">
                          <div className="w-20 h-20 rounded-lg overflow-hidden bg-white">
                            <Image src={f.img} alt={f.name} width={80} height={80} className="object-cover" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{f.name}</div>
                            <div className="text-xs text-slate-500">{f.calories} kcal /100g • Vit C {f.vitaminC_mg}mg</div>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center gap-2">
                          <button onClick={() => updateQty(f.id, Math.max(0, (qtyByFruit[f.id] || 0) - 25))} className="px-2 py-1 rounded-md bg-white border">-</button>
                          <input type="number" value={qtyByFruit[f.id] || 0} onChange={(e) => updateQty(f.id, Number(e.target.value || 0))} className="w-20 text-center border rounded-md px-2 py-1" />
                          <button onClick={() => updateQty(f.id, (qtyByFruit[f.id] || 0) + 25)} className="px-2 py-1 rounded-md bg-white border">+</button>
                          <div className="ml-auto text-sm font-semibold text-amber-600">₹{Math.round(((qtyByFruit[f.id] || 0)/100)*f.pricePer100)}</div>
                        </div>

                        <div className="mt-2 text-xs text-slate-500 flex items-center gap-2">
                          <Badge>{Math.round(f.calories * ((qtyByFruit[f.id] || 0) / 100))} kcal</Badge>
                          <span>{Math.round(f.vitaminC_mg * ((qtyByFruit[f.id] || 0) / 100))} mg Vit C</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Toppings */}
            <Card>
              <CardHeader>
                <CardTitle>Add Toppings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3 flex-wrap">
                  {TOPPINGS.map((t) => (
                    <button key={t.id} onClick={() => toggleTopping(t.id)} className={`px-3 py-2 rounded-lg border ${selectedToppings.includes(t.id) ? "bg-emerald-600 text-white border-emerald-600" : "bg-white border-gray-200"}`}>
                      <div className="font-medium">{t.name}</div>
                      <div className="text-xs text-slate-500">₹{t.price} • {t.calories} kcal</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Membership quick */}
            <Card className="bg-emerald-50 border-emerald-200">
              <CardHeader>
                <CardTitle>Membership — save & schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-700">Choose Normal Premium (we decide fruits) or Custom Premium (you choose). Members get discounts & free delivery above ₹100.</p>

                <div className="grid sm:grid-cols-2 gap-3">
                  <select value={daysPlan} onChange={(e) => setDaysPlan(Number(e.target.value))} className="border rounded-md px-3 py-2">
                    <option value={7}>7 days — ₹799</option>
                    <option value={15}>15 days — ₹1499</option>
                    <option value={30}>30 days — ₹2899</option>
                  </select>

                  <div className="flex gap-2">
                    <button onClick={() => setPremiumType("normal")} className={`flex-1 rounded-md px-3 py-2 ${premiumType === "normal" ? "bg-amber-400 text-black" : "bg-white border"}`}>Normal Premium</button>
                    <button onClick={() => setPremiumType("custom")} className={`flex-1 rounded-md px-3 py-2 ${premiumType === "custom" ? "bg-amber-400 text-black" : "bg-white border"}`}>Custom Premium</button>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-2">
                  <label className="text-sm">Preferred time:</label>
                  <select value={timePref} onChange={(e) => setTimePref(e.target.value)} className="border rounded-md px-3 py-2">
                    <option value="morning">Morning</option>
                    <option value="evening">Evening</option>
                    <option value="both">Both</option>
                  </select>
                </div>

                <div className="flex gap-2 mt-3">
                  <Button className="bg-amber-500 hover:bg-amber-600">Join Premium</Button>
                  <Button variant="outline">Learn More</Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* RIGHT: Order summary & nutrition */}
          <aside className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {itemsSelected.length ? itemsSelected.map((it) => (
                    <div key={it.id} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{it.name}</div>
                        <div className="text-xs text-slate-500">{it.qty} g</div>
                      </div>
                      <div className="text-sm font-semibold">₹{it.price}</div>
                    </div>
                  )) : <div className="text-xs text-slate-500">No fruits selected</div>}

                  {toppingsSelected.length > 0 && <div className="mt-2">
                    <div className="text-sm font-medium">Toppings</div>
                    {toppingsSelected.map(t => <div key={t.id} className="flex justify-between text-sm"><div>{t.name}</div><div>₹{t.price}</div></div>)}
                  </div>}

                  <Separator />

                  <div className="flex justify-between">
                    <div>Subtotal</div>
                    <div>₹{rawTotal}</div>
                  </div>
                  <div className="flex justify-between text-sm text-slate-500">
                    <div>After membership</div>
                    <div>₹{totalAfterMembership}</div>
                  </div>

                  <div className="mt-3">
                    <Button className="w-full bg-amber-500 hover:bg-amber-600" onClick={() => setCheckoutOpen(true)}>Checkout • ₹{totalAfterMembership}</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nutrition Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div className="text-sm">Calories</div>
                    <div className="font-medium">{nutrition.calories} kcal</div>
                  </div>
                  <Progress value={progress.calories} className="h-2 rounded" />
                  <div className="flex justify-between">
                    <div className="text-sm">Vitamin C</div>
                    <div className="font-medium">{nutrition.vitaminC_mg} mg</div>
                  </div>
                  <Progress value={progress.vitaminC} className="h-2 rounded" />
                  <div className="flex justify-between">
                    <div className="text-sm">Fiber</div>
                    <div className="font-medium">{nutrition.fiber_g} g</div>
                  </div>
                  <Progress value={progress.fiber} className="h-2 rounded" />
                  <div className="flex justify-between">
                    <div className="text-sm">Protein</div>
                    <div className="font-medium">{nutrition.protein_g} g</div>
                  </div>
                  <Progress value={progress.protein} className="h-2 rounded" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact & Membership</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-slate-600">Have questions? Chat with us on WhatsApp or view membership details.</div>
                <div className="flex gap-2">
                  <a href={`https://wa.me/${whatsappNumber}?text=Hi%20KotaFruit!%20I%20need%20help%20with%20custom%20cup`} target="_blank" rel="noreferrer">
                    <Button className="bg-emerald-600 hover:bg-emerald-700">WhatsApp Us</Button>
                  </a>
                  <Link href="#membership">
                    <Button variant="outline">Membership Info</Button>
                  </Link>
                </div>
                <div className="text-xs text-slate-500 mt-2">Address: Near Coaching Hub, Kota • Ph: +91 9XXXXXXXXX</div>
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* Footer */}
        <footer className="pt-8 pb-16 text-sm text-slate-600">
          <div className="max-w-5xl mx-auto px-4 space-y-4">
            <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-3">
              <div>
                <div className="font-semibold text-lg text-emerald-700">KotaFruit</div>
                <div className="text-xs text-slate-500">Fresh cups • Daily delivery in Kota</div>
              </div>

              <div className="flex gap-4">
                <Link href="#">Home</Link>
                <Link href="#menu">Menu</Link>
                <Link href="#membership">Membership</Link>
                <Link href="#contact">Contact</Link>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-3">
              <div>© {new Date().getFullYear()} KotaFruit</div>
              <div className="flex gap-3">
                <a href="#" className="text-slate-500">Instagram</a>
                <a href="#" className="text-slate-500">WhatsApp</a>
                <a href="#" className="text-slate-500">Facebook</a>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* CHECKOUT DIALOG (re-used) */}
      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Confirm your order</DialogTitle>
          </DialogHeader>

          <div className="space-y-3 mt-2">
            <div className="text-sm">
              <strong>Items</strong>
              <div className="mt-2 space-y-2">
                {itemsSelected.length ? itemsSelected.map((it) => (
                  <div key={it.id} className="flex justify-between text-sm">
                    <div>{it.name} • {it.qty}g</div>
                    <div>₹{it.price}</div>
                  </div>
                )) : <div className="text-xs text-slate-500">No fruits selected</div>}
              </div>
            </div>

            <div className="flex justify-between">
              <div>Subtotal</div>
              <div>₹{rawTotal}</div>
            </div>
            <div className="flex justify-between">
              <div>Membership discount</div>
              <div>-₹{Math.round(rawTotal - totalAfterMembership)}</div>
            </div>

            <div className="flex justify-between text-lg font-bold">
              <div>Total</div>
              <div>₹{totalAfterMembership}</div>
            </div>
          </div>

          <DialogFooter>
            <div className="flex gap-2 w-full">
              <Button variant="outline" onClick={() => setCheckoutOpen(false)}>Cancel</Button>
              <Button className="ml-auto" onClick={() => { setCheckoutOpen(false); alert("Order placed (mock). Thanks!"); }}>Place Order</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
