"use client";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Check, Star } from "lucide-react";

export default function SubscriptionPage() {
  const [billing, setBilling] = useState("monthly");
  const [slot, setSlot] = useState("morning");

  const plans = [
    {
      name: "Basic",
      desc: "Perfect for starters - 3 days/week fruit delivery.",
      weekly: 149,
      monthly: 399,
      yearly: 3599,
      features: ["3 cups per week", "Morning/Evening delivery", "Basic support"],
    },
    {
      name: "Standard",
      desc: "Daily fruit cups, best for health lovers.",
      weekly: 249,
      monthly: 699,
      yearly: 6299,
      features: [
        "1 cup every day",
        "Flexible delivery slots",
        "Pause/skip days anytime",
        "Priority support",
      ],
      highlight: true,
    },
    {
      name: "Premium",
      desc: "Extra energy boost with 2 cups/day + perks.",
      weekly: 399,
      monthly: 1099,
      yearly: 9999,
      features: [
        "2 cups every day",
        "Custom scheduling",
        "Priority + WhatsApp support",
        "Exclusive seasonal fruits",
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold">🍓 Fruit Prime Subscription</h1>
        <p className="text-muted-foreground mt-2">
          Get fresh fruit cups delivered daily. <br />
          Join today and enjoy <span className="font-semibold">your first cup free!</span>
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center items-center mb-10 gap-3">
        <span
          onClick={() => setBilling("weekly")}
          className={`cursor-pointer px-2 py-1 rounded ${
            billing === "weekly" ? "bg-indigo-500 text-white" : "text-muted-foreground"
          }`}
        >
          Weekly
        </span>
        <span
          onClick={() => setBilling("monthly")}
          className={`cursor-pointer px-2 py-1 rounded ${
            billing === "monthly" ? "bg-indigo-500 text-white" : "text-muted-foreground"
          }`}
        >
          Monthly
        </span>
        <span
          onClick={() => setBilling("yearly")}
          className={`cursor-pointer px-2 py-1 rounded ${
            billing === "yearly" ? "bg-indigo-500 text-white" : "text-muted-foreground"
          }`}
        >
          Yearly <span className="text-green-600">(Save 15%)</span>
        </span>
      </div>

      {/* Delivery Slot Selection */}
      <div className="flex justify-center mb-10">
        <div className="w-64">
          <p className="text-sm font-medium mb-2">Choose Delivery Slot</p>
          <Select onValueChange={setSlot} defaultValue="morning">
            <SelectTrigger>
              <SelectValue placeholder="Select delivery slot" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">🌅 Morning (7AM - 9AM)</SelectItem>
              <SelectItem value="evening">🌆 Evening (6PM - 8PM)</SelectItem>
              <SelectItem value="custom">⏰ Custom Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative transition hover:shadow-xl ${
              plan.highlight ? "border-indigo-500 shadow-lg" : ""
            }`}
          >
            {plan.highlight && (
              <span className="absolute top-2 right-2 text-xs bg-indigo-500 text-white px-2 py-1 rounded-full">
                Best Value
              </span>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">
                ₹{plan[billing]}
                <span className="text-sm text-muted-foreground">/{billing}</span>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" /> {f}
                  </li>
                ))}
              </ul>
              <Button className="w-full">Choose {plan.name}</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Urgency */}
      <div className="mt-10 text-center bg-yellow-100 p-4 rounded-lg">
        <p className="font-medium">
          ⏰ Limited Offer: Get 10% off if you subscribe before midnight!
        </p>
      </div>

      {/* Testimonials */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-center mb-8">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-4">
              <Star className="text-yellow-500 mb-2" />
              <p>"Fresh fruits daily, never missed a delivery!"</p>
              <p className="text-sm text-muted-foreground mt-2">— Riya, Student</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <Star className="text-yellow-500 mb-2" />
              <p>"Worth every penny, I feel healthier already."</p>
              <p className="text-sm text-muted-foreground mt-2">— Arjun, Engineer</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <Star className="text-yellow-500 mb-2" />
              <p>"Easy to manage my schedule, love the flexibility."</p>
              <p className="text-sm text-muted-foreground mt-2">— Meera, Doctor</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
