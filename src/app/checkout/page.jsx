'use client'
import React, { useState } from "react";
import { Check, ArrowLeft, CreditCard, Wallet, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CheckoutPage() {
  const [subscription, setSubscription] = useState("one-time");
  const [timePreference, setTimePreference] = useState("morning");

  const fruits = [
    { name: "Mango", qty: 2, price: 40 },
    { name: "Papaya", qty: 1, price: 30 },
    { name: "Dry Fruits", qty: 1, price: 50 },
  ];

  const totalPrice = fruits.reduce((sum, f) => sum + f.qty * f.price, 0);

  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      {/* Header */}
      <header className="bg-green-600 text-white p-4 text-center font-bold text-xl">
        Checkout
      </header>

      <main className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Order Summary */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {fruits.map((fruit, i) => (
                <li key={i} className="flex justify-between">
                  <span>
                    {fruit.name} × {fruit.qty}
                  </span>
                  <span>₹{fruit.qty * fruit.price}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 border-t pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>

            {/* Nutritional Info */}
            <div className="mt-4 bg-green-100 rounded-lg p-3 text-sm">
              <p className="font-semibold">Nutritional Value (Estimated):</p>
              <p>Calories: 220 kcal | Fiber: 15g | Protein: 8g | Vitamin C: 95%</p>
            </div>
          </CardContent>
        </Card>

        {/* Delivery / Subscription Options */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Delivery Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3">
              <Button
                variant={subscription === "one-time" ? "default" : "outline"}
                onClick={() => setSubscription("one-time")}
              >
                One-time Order
              </Button>
              <Button
                variant={subscription === "subscription" ? "default" : "outline"}
                onClick={() => setSubscription("subscription")}
              >
                Subscription
              </Button>
            </div>

            {subscription === "subscription" && (
              <div className="space-y-2">
                <label className="block font-medium">Select Plan</label>
                <select className="w-full border p-2 rounded">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>

                <label className="block font-medium">Time Preference</label>
                <div className="flex gap-3">
                  {["morning", "evening", "both"].map((t) => (
                    <Button
                      key={t}
                      variant={timePreference === t ? "default" : "outline"}
                      onClick={() => setTimePreference(t)}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Address */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Delivery Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <input
              className="w-full border p-2 rounded"
              placeholder="Full Name"
            />
            <input
              className="w-full border p-2 rounded"
              placeholder="Phone Number"
            />
            <textarea
              className="w-full border p-2 rounded"
              placeholder="Address, Landmark, Pincode"
            ></textarea>
          </CardContent>
        </Card>

        {/* Payment */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Button className="flex items-center gap-2">
              <CreditCard size={18} /> UPI
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Wallet size={18} /> Wallet Coins
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Smartphone size={18} /> Cash on Delivery
            </Button>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="flex flex-col md:flex-row justify-between gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft size={18} /> Back to Customize
          </Button>
          <Button className="bg-green-600 text-white w-full md:w-auto flex items-center gap-2">
            <Check size={18} /> Confirm & Pay ₹{totalPrice}
          </Button>
        </div>

        {/* Membership Banner */}
        <div className="bg-yellow-100 rounded-lg p-4 text-center shadow-md">
          <p className="font-semibold">
            🎉 Save 20% with Premium Membership + Free Delivery!
          </p>
          <Button className="mt-2 bg-yellow-500 text-white">Join Premium</Button>
        </div>

        {/* Contact */}
        <div className="text-center text-sm mt-6">
          <p>Need Help? <a href="https://wa.me/919999999999" className="text-green-600 font-semibold">WhatsApp Us</a></p>
          <p className="text-gray-500">📍 Near XYZ PG, Kota</p>
        </div>
      </main>
    </div>
  );
}
