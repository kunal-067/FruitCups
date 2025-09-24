
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"

import Hero from "@/components/Hero"
import { PopularCups, PopularDrinks } from "@/components/FruitCards"
import WhyChooseUs from "@/components/others/WhyChooseUs"
import { HomeScreenCustomizingCups } from "@/components/others/CustomizeCups"
import { GET_PRODUCTS } from "@/lib/ApiRoutes"
import Testimonials from "@/components/Testimonial"
import { Skeleton } from "@/components/ui/skeleton"

// Testimonials
let testimonials = [
    { _id: 1, name: "Aman R.", text: "Perfect breakfast before college. Fresh and filling.", rating: 5 },
    { _id: 2, name: "Neha S.", text: "Affordable subscription & always on time.", rating: 5 },
    { _id: 3, name: "Rohit K.", text: "Good portion size and tasty fruits.", rating: 4 },
    { _id: 4, name: "Aman R.", text: "Perfect breakfast before college. Fresh and filling.", rating: 5 },
    { _id: 5, name: "Neha S.", text: "Affordable subscription & always on time.", rating: 5 },
    { _id: 6, name: "Rohit K.", text: "Good portion size and tasty fruits.", rating: 4 },
    { _id: 7, name: "Aman R.", text: "Perfect breakfast before college. Fresh and filling.", rating: 5 },
    { _id: 8, name: "Neha S.", text: "Affordable subscription & always on time.", rating: 5 },
    { _id: 9, name: "Rohit K.", text: "Good portion size and tasty fruits.", rating: 4 },
]
export default async function HomePage() {
    const referralCode = "KF-REF-2025";
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    let isCupLoading = true; // for future use currently useless
    let isDrinkLoading = true; // for future use

    let products = [];
    let drinks = [];

    try {
        const [res, drinkRes] = await Promise.all([
            fetch(`${baseUrl}${GET_PRODUCTS}?type=fruit`, { next: { revalidate: 3600 } }),
            fetch(`${baseUrl}${GET_PRODUCTS}?type=shake`, { next: { revalidate: 3600 } }),
        ]);

        if (!res.ok) {
            console.error(`Failed to fetch fruits: ${res.status} ${res.statusText}`);
        } else {
            const data = await res.json();
            products = data.products || [];
            isCupLoading = false;
        }

        if (!drinkRes.ok) {
            console.error(`Failed to fetch drinks: ${drinkRes.status} ${drinkRes.statusText}`);
        } else {
            const data = await drinkRes.json();
            drinks = data.products || [];
            isDrinkLoading = false;
        }
    } catch (error) {
        console.error('Error fetching products:', error);
    }

    return (
        <div className="min-h-screen bg-white text-slate-900 max-md:pb-14">

            {/* Hero - slideshow */}
            <Hero />

            {/* Popular Fruit Cups */}
            <section id="menu" className="max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-semibold">Popular Fruit Cups</h3>
                    <Link href="/menu" className="text-sm text-emerald-600">View all</Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {isCupLoading ? (
                        Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="shimmer h-48 w-full rounded-lg" />)
                    ) : (products.length === 0 ? (
                        <p className="text-sm text-slate-500">No fruit cups available</p>
                    ) : (
                        products.map((p) => <PopularCups key={p._id} p={p} />)
                    ))}
                </div>
            </section>

            {/* Customize Your Cup */}
            <section id="customize" className="max-w-6xl mx-auto px-2 md:px-4 py-8">
                <h3 className="text-2xl font-semibold mb-3">Customize Your Cup</h3>
                <HomeScreenCustomizingCups />
            </section>

            {/* Membership Banner */}
            <section id="membership" className="max-w-6xl mx-auto px-4 py-6">
                <div className="rounded-xl bg-gradient-to-r from-amber-100 to-emerald-50 p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold">Premium Membership</h3>
                        <p className="mt-2 text-slate-600">Get extra discounts, free delivery above ₹100, and early access to seasonal fruits.</p>
                        <div className="mt-3 flex gap-3">
                            <Button className="bg-amber-400 hover:bg-amber-500 text-black">Join Premium</Button>
                            <Button variant="outline">Learn More</Button>
                        </div>
                    </div>
                    <div className="w-40">
                        <Image src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop" alt="premium" width={200} height={160} className="rounded-lg object-cover" />
                    </div>
                </div>
            </section>

            {/* Membership & Coins work left*/} 
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
                                <Link href={'/membership'} className="w-full px-8 bg-black py-2 font-medium text-white rounded-sm" >"Subscribe"</Link>
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
                                    <div className="text-2xl font-bold">{20}</div>
                                    <div className="text-sm text-slate-500">Coins balance</div>
                                </div>
                                <div className="w-36">
                                    <Progress value={(20 / 80) * 100} className="h-3 rounded" />
                                    <div className="text-xs text-slate-500 mt-2">Earn {80 - 20} more coins to next reward</div>
                                </div>
                            </div>
                            <div className="mt-3">
                                {/* <Button>Earn 20 Coins</Button> */}
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
                                {/* <Button onClick={() => { navigator.clipboard?.writeText(referralCode); alert("Referral code copied"); }}>Copy</Button> */}
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
                    {isDrinkLoading ? (
                        Array.from({ length: 8 }).map((_, index) => <Skeleton key={index} className="shimmer h-48 w-full rounded-lg" />)
                    ) : (
                        drinks.length === 0 ? (
                            <p className="text-sm text-slate-500">No fruit shakes available</p>
                        ) : (
                            drinks.map(d => <PopularDrinks key={d._id} d={d} />)
                        )
                    )}
                </div>
            </section>

            {/* Why Choose Us */}
            <WhyChooseUs />

            {/* Testimonials */}
            <Testimonials testimonials={testimonials}/>

            {/* Floating Track Order button */}
            {/* <button
                // onClick={trackOrder}
                className="fixed right-4 bottom-20 md:bottom-10 bg-emerald-600 text-white rounded-full p-3 shadow-lg z-50 hidden md:block"
                aria-label="Track Order"
            >
                Track Order
            </button> */}
        </div>
    )
}
