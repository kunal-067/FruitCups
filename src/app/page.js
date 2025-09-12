"use client"

// app/page.jsx  (or pages/index.jsx)
// Copy-paste ready Next.js (React) component (JSX, not TSX).
// Requirements: TailwindCSS + shadcn/ui components available at the imports used.
// If using next/image with external Unsplash URLs, add images.unsplash.com to next.config.js

"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

import { ShoppingCart, User, Home, Tag, Coffee, Gift } from "lucide-react"
import NavBar from "@/components/NavBar"
import Hero from "@/components/Hero"
import Footer from "@/components/Footer"
import { PopularCups } from "@/components/FruitCards"
import WhyChooseUs from "@/components/others/WhyChooseUs"

const slides = [
    {
        id: 1,
        title: "🎉 Buy Premium Today & Get ₹105 Discount",
        subtitle: "Limited time: premium benefits & instant discounts.",
        img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "🥭 Fresh Mango Cups in Season — Order Now",
        subtitle: "Ripe mangoes, chilled & ready-to-eat.",
        img: "https://images.unsplash.com/photo-1592928303348-54d6d92c4e63?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "🍹 Healthy Juices Delivered in 30 Minutes",
        subtitle: "Cold-pressed flavors for fresh energy.",
        img: "https://images.unsplash.com/photo-1502741126161-b048400d2b8b?q=80&w=1200&auto=format&fit=crop",
    },
]

export default function HomePage() {
  
  const [slideIndex, setSlideIndex] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setSlideIndex((s) => (s + 1) % slides.length), 4500)
    return () => clearInterval(t)
  }, [])

  // Products (popular cups)
  const popular = [
    {
      id: "mango-cup",
      name: "Mango Cup",
      price: 69,
      img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=800&auto=format&fit=crop",
      nutrients: ["Vitamin C", "Fiber"],
    },
    {
      id: "mixed-cup",
      name: "Mixed Fruit Cup",
      price: 79,
      img: "https://images.unsplash.com/photo-1572441710519-51e4f3c1d7d4?q=80&w=800&auto=format&fit=crop",
      nutrients: ["Vitamin A", "Antioxidants"],
    },
    {
      id: "papaya-cup",
      name: "Papaya Slices",
      price: 59,
      img: "https://images.unsplash.com/photo-1613145993482-bf9d6d6b6d10?q=80&w=800&auto=format&fit=crop",
      nutrients: ["Vitamin C", "Digestive Enzymes"],
    },
    {
      id: "pineapple-cup",
      name: "Pineapple Bowl",
      price: 85,
      img: "https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=800&auto=format&fit=crop",
      nutrients: ["Vitamin C", "Bromelain"],
    },
  ]

  // Drinks
  const drinks = [
    { id: "mango-shake", name: "Mango Shake", price: 99, tag: "Energy Boost", img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=800&auto=format&fit=crop" },
    { id: "banana-shake", name: "Banana Shake", price: 89, tag: "Protein Rich", img: "https://images.unsplash.com/photo-1617191510513-1b7a3f1df2a6?q=80&w=800&auto=format&fit=crop" },
    { id: "dryfruit-shake", name: "Dry Fruit Shake", price: 129, tag: "Nutrient Dense", img: "https://images.unsplash.com/photo-1604908177522-6c7b4b0ec6b7?q=80&w=800&auto=format&fit=crop" },
  ]

  // Cart & basic actions
  const [cart, setCart] = useState([])
  const addToCart = (product) => setCart((c) => [...c, product])

  // Customize cup state
  const fruits = ["Mango", "Papaya", "Watermelon", "Pineapple", "Banana"]
  const toppings = ["Dry Fruits", "Chia Seeds", "Honey", "Mint", "Granola"]
  const sizes = ["Small", "Medium", "Large"]
  const [customFruits, setCustomFruits] = useState([fruits[0]])
  const [customTopping, setCustomTopping] = useState(toppings[0])
  const [customSize, setCustomSize] = useState(sizes[1])
  const [customPreview, setCustomPreview] = useState(popular[1].img)
  useEffect(() => {
    // simple preview: switch image by first selected fruit
    const map = {
      Mango: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=800&auto=format&fit=crop",
      Papaya: "https://images.unsplash.com/photo-1613145993482-bf9d6d6b6d10?q=80&w=800&auto=format&fit=crop",
      Watermelon: "https://images.unsplash.com/photo-1592928303348-54d6d92c4e63?q=80&w=800&auto=format&fit=crop",
      Pineapple: "https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=800&auto=format&fit=crop",
      Banana: "https://images.unsplash.com/photo-1617191510513-1b7a3f1df2a6?q=80&w=800&auto=format&fit=crop",
    }
    setCustomPreview(map[customFruits[0]] || popular[1].img)
  }, [customFruits])

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  // Membership & coins
  const [isPremium, setIsPremium] = useState(false)
  const [coins, setCoins] = useState(120)
  const coinsForNext = 200
  const referralCode = "KF-REF-2025"

  // Testimonials
  const testimonials = [
    { id: 1, name: "Aman R.", text: "Perfect breakfast before college. Fresh and filling.", rating: 5 },
    { id: 2, name: "Neha S.", text: "Affordable subscription & always on time.", rating: 5 },
    { id: 3, name: "Rohit K.", text: "Good portion size and tasty fruits.", rating: 4 },
  ]

  // Track order shortcut (floating)
  const trackOrder = () => alert("Open Order Tracking (mock)")

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* Hero - slideshow */}
      <Hero/>

      {/* Popular Fruit Cups */}
      <section id="menu" className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-semibold">Popular Fruit Cups</h3>
          <Link href="/menu" className="text-sm text-emerald-600">View all</Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {popular.map((p) => (
            <PopularCups key={p.id} p={p}/>
          ))}
        </div>
      </section>

      {/* Customize Your Cup */}
      <section id="customize" className="max-w-6xl mx-auto px-4 py-8">
        <h3 className="text-2xl font-semibold mb-3">Customize Your Cup</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Preview */}
          <Card className="flex flex-col items-center p-4">
            <div className="w-48 h-48 rounded-xl overflow-hidden">
              <Image src={customPreview} alt="custom preview" width={400} height={400} className="object-cover" />
            </div>
            <div className="mt-4 text-center">
              <div className="font-medium">Custom {customSize}</div>
              <div className="text-sm text-slate-500">Fruits: {customFruits.join(", ")}</div>
              <div className="text-sm text-slate-500">Topping: {customTopping}</div>
            </div>
          </Card>

          {/* Options */}
          <div className="md:col-span-2 space-y-4">
            <Card className="p-4">
              <CardHeader>
                <CardTitle className="text-base">Choose Fruits</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2 mt-2">
                {fruits.map((f) => {
                  const selected = customFruits.includes(f)
                  return (
                    <button
                      key={f}
                      onClick={() => {
                        setCustomFruits((cur) => cur.includes(f) ? cur.filter(x => x !== f) : [f, ...cur].slice(0, 3))
                      }}
                      className={`px-3 py-2 rounded-full text-sm ${selected ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-700"}`}
                    >
                      {f}
                    </button>
                  )
                })}
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4">
                <CardHeader>
                  <CardTitle className="text-base">Toppings</CardTitle>
                </CardHeader>
                <CardContent className="mt-2 flex flex-wrap gap-2">
                  <Select onValueChange={(v) => setCustomTopping(v)} defaultValue={customTopping}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={customTopping} />
                    </SelectTrigger>
                    <SelectContent>
                      {toppings.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card className="p-4">
                <CardHeader>
                  <CardTitle className="text-base">Cup Size</CardTitle>
                </CardHeader>
                <CardContent className="mt-2">
                  <div className="flex gap-2">
                    {sizes.map(s => (
                      <button
                        key={s}
                        onClick={() => setCustomSize(s)}
                        className={`px-3 py-2 rounded-md ${customSize === s ? "bg-emerald-600 text-white" : "bg-slate-100"}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-3 mt-2">
              <Button onClick={() => { addToCart({ id: `custom-${Date.now()}`, name: `Custom ${customSize} Cup`, price: 99, img: customPreview }); setIsCheckoutOpen(true); }}>
                Proceed to Checkout
              </Button>
              <Button variant="outline" onClick={() => { setCustomFruits([fruits[0]]); setCustomTopping(toppings[0]); setCustomSize(sizes[1]); }}>
                Reset
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Banner */}
      <section id="membership" className="max-w-6xl mx-auto px-4 py-6">
        <div className="rounded-xl bg-gradient-to-r from-amber-100 to-emerald-50 p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm">
          <div className="flex-1">
            <h3 className="text-xl font-bold">Premium Membership</h3>
            <p className="mt-2 text-slate-600">Get extra discounts, free delivery above ₹100, and early access to seasonal fruits.</p>
            <div className="mt-3 flex gap-3">
              <Button onClick={() => setIsPremium(true)} className="bg-amber-400 hover:bg-amber-500 text-black">Join Premium</Button>
              <Button variant="outline">Learn More</Button>
            </div>
          </div>
          <div className="w-40">
            <Image src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop" alt="premium" width={200} height={160} className="rounded-lg" />
          </div>
        </div>
      </section>

      {/* Membership & Coins */}
      <section id="wallet" className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-4">
            <CardHeader>
              <CardTitle className="text-base">Membership Plan</CardTitle>
            </CardHeader>
            <CardContent className="mt-2">
              <div className="text-2xl font-bold">Premium — ₹499 / month</div>
              <div className="text-sm text-slate-500 mt-1">Save up to 20% and enjoy free delivery.</div>
              <div className="mt-4">
                <Button className="w-full" onClick={() => setIsPremium(!isPremium)}>{isPremium ? "Manage Membership" : "Subscribe"}</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardHeader>
              <CardTitle className="text-base">Coin Wallet</CardTitle>
            </CardHeader>
            <CardContent className="mt-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{coins}</div>
                  <div className="text-sm text-slate-500">Coins balance</div>
                </div>
                <div className="w-36">
                  <Progress value={(coins / coinsForNext) * 100} className="h-3 rounded" />
                  <div className="text-xs text-slate-500 mt-2">Earn {coinsForNext - coins} more coins to next reward</div>
                </div>
              </div>
              <div className="mt-3">
                <Button onClick={() => setCoins(coins + 20)}>Earn 20 Coins</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardHeader>
              <CardTitle className="text-base">Referral Program</CardTitle>
            </CardHeader>
            <CardContent className="mt-2">
              <p className="text-sm text-slate-600">Share code and earn bonus coins when friends order.</p>
              <div className="mt-3 flex gap-2 items-center">
                <Input readOnly value={referralCode} />
                <Button onClick={() => { navigator.clipboard?.writeText(referralCode); alert("Referral code copied"); }}>Copy</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Juices & Shakes */}
      <section className="max-w-6xl mx-auto px-4 py-8 bg-slate-50 rounded-t-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-semibold">Shakes & Juices</h3>
          <Link href="/drinks" className="text-sm text-emerald-600">View all</Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {drinks.map(d => (
            <Card key={d.id} className="p-0 overflow-hidden">
              <div className="relative h-36">
                <Image src={d.img} alt={d.name} fill className="object-cover" />
              </div>
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{d.name}</h4>
                  <Badge>{d.tag}</Badge>
                </div>
                <p className="text-emerald-600 font-semibold mt-2">₹{d.price}</p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" onClick={() => addToCart(d)}>Add</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs/>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h3 className="text-2xl font-semibold mb-4">What Students Say</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {testimonials.map(t => (
            <Card key={t.id} className="p-4">
              <CardContent>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 grid place-items-center font-semibold">{t.name.split(" ")[0][0]}</div>
                  <div>
                    <div className="font-medium">{t.name}</div>
                    <div className="text-sm text-slate-500">{Array.from({length: t.rating}).map((_,i)=> "★").join("")}</div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mt-3">{t.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Floating Track Order button */}
      <button
        onClick={trackOrder}
        className="fixed right-4 bottom-20 md:bottom-10 bg-emerald-600 text-white rounded-full p-3 shadow-lg z-50 hidden md:block"
        aria-label="Track Order"
      >
        Track Order
      </button>
      {/* Quick Checkout Dialog */}
     
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>

        <DialogTrigger className="fixed right-4 bottom-20 md:bottom-10 bg-emerald-600 text-white rounded-full p-3 shadow-lg z-50 md:hidden" aria-label="Open Cart">
          <ShoppingCart className="h-5 w-5" />
          {cart.length > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full grid place-items-center">
              {cart.length}
            </div>
          )}
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-2xl text-red-200'>Checkout</DialogTitle>
            <DialogDescription>Review your items and complete order</DialogDescription>
          </DialogHeader>

          <div className="space-y-3 mt-4">
            {cart.length === 0 ? (
              <div className="text-sm text-slate-600">Your cart is empty.</div>
            ) : (
              cart.map((c, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-12 h-12 overflow-hidden rounded-md">
                    <Image src={c.img || popular[0].img} alt={c.name} width={48} height={48} className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{c.name}</div>
                    <div className="text-xs text-slate-500">₹{c.price}</div>
                  </div>
                </div>
              ))
            )}
          </div>

          <DialogFooter className="mt-4 flex justify-between items-center">
            <div>
              <div className="text-sm text-slate-600">Total</div>
              <div className="font-semibold">₹{cart.reduce((s, it) => s + (it.price || 0), 0)}</div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsCheckoutOpen(false)}>Close</Button>
              <Button onClick={() => { setCart([]); setIsCheckoutOpen(false); alert("Order placed (mock) — thanks!"); }}>Place Order</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

     
    </div>
  )
}
