"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Gift, CheckCircle, Calendar, Star, Check, Phone } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { plans } from "@/lib/planConfigs";

export default function SubscribePage() {
  const [selectedPlan, setSelectedPlan] = useState("#PLAN2");
  const [slot, setSlot] = useState("morning");
  const [billing, setBilling] = useState("monthly");
  const auth = useSelector(state => state.auth);
  const router = useRouter();

  const plan = plans.find((p) => p.id === selectedPlan);

  function handleCheckout() {
    if (!auth.isVerified) {
      return router.push(`/login?prime=true&slot=${slot}&billing=${billing}`)
    }
    axios.post('/api/membership', { planId: selectedPlan, slot, billing }).then(res => {
      console.log(res.data);
      router.push(`/checkout/payment?membership=${res.data.data?._id}&pay=${plan[res.data.data?.billing || 'montly']}`);
      toast(res.data?.message || "Subscribed successfully")
    }).catch(err => {
      console.log(err);
      toast(err.response.data?.message || 'Error while subscribing')
    })
  }

  return (
    <main className="max-w-6xl mx-auto bg-gray-50 p-4 max-md:mb-16 md:p-8">
      <div className="mx-auto space-y-8">
        {/* Hero */}
        <section className="text-center space-y-1">
          <Button onClick={e=>router.push('/membership/track')} className='active:bg-gray-700 hover:bg-gray-700 px-8'>You Prime</Button>
          <h1 className="text-2xl md:text-3xl font-bold">Join Prime 🍓</h1>
          <p className="max-sm:text-[14px] text-muted-foreground max-w-2xl mx-auto">
            Fresh fruit cups delivered to your door every day. Choose a plan, pick your time slot, and enjoy health on autopilot.
          </p>
        </section>

        {/* Uregency to buy in hurry */}
        <div className="max-sm:-mt-4 mt-0 text-[14px] text-center bg-yellow-100 p-4 rounded-lg">
          <p className="font-medium">
            ⏰ Limited Offer: Get 10% off if you subscribe before midnight!
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              onClick={e => setSelectedPlan(plan.id)}
              key={plan.name}
              className={`relative transition hover:shadow-xl ${selectedPlan === plan.id ? "border-indigo-500 shadow-lg shadow-indigo-100" : ""
                }`}
            >
              {plan.highlight && (
                <span className="absolute top-2 right-2 text-xs bg-indigo-400 text-white px-2 py-1 rounded-full">
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

        {/* choose timeperiod */}
        <div className="flex justify-center max-sm:text-[14px] font-medium items-center mb-10 gap-1 sm:gap-3">
          <span
            onClick={() => setBilling("weekly")}
            className={`cursor-pointer px-2 py-1 rounded ${billing === "weekly" ? "bg-gray-400 text-white" : "text-muted-foreground"
              }`}
          >
            Weekly
          </span>
          <span
            onClick={() => setBilling("monthly")}
            className={`cursor-pointer px-2 py-1 rounded ${billing === "monthly" ? "bg-gray-400 text-white" : "text-muted-foreground"
              }`}
          >
            Monthly
          </span>
          <span
            onClick={() => setBilling("yearly")}
            className={`cursor-pointer px-2 py-1 rounded ${billing === "yearly" ? "bg-gray-400 text-white" : "text-muted-foreground"
              }`}
          >
            Yearly <span className="text-green-600">(Save 15%)</span>
          </span>
        </div>


        <Separator />

        {/* Delivery Slot Selection */}
        <div className="w-full sm:w-72">
          <p className="text-sm font-medium mb-2">Choose Delivery Slot</p>
          <Select onValueChange={setSlot} defaultValue="morning">
            <SelectTrigger>
              <SelectValue placeholder="Select delivery slot" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">🌅 Morning (7AM - 9AM)</SelectItem>
              <SelectItem value="evening">🌆 Evening (6PM - 8PM)</SelectItem>
              {/* <SelectItem value="custom">⏰ Custom Time</SelectItem> */}
            </SelectContent>
          </Select>
        </div>

        {/* Checkout */}
        <section className="bg-white max-md:px- p-6 rounded-xl shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">Selected Plan</div>
              <div className="font-semibold">
                {plan.name} • ₹{plan[billing]}
              </div>
            </div>
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700" onClick={handleCheckout}>
              Subscribe Now
            </Button>
          </div>
          <div className="text-xs text-slate-500">
            Secure checkout • Cancel or pause anytime • 100% freshness guarantee
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="faq-1">
              <AccordionTrigger>Can I pause my plan?</AccordionTrigger>
              <AccordionContent>
                Yes! You can pause or resume anytime from your dashboard. Remaining days will be preserved.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2">
              <AccordionTrigger>Do you deliver on Sundays?</AccordionTrigger>
              <AccordionContent>
                Absolutely. We deliver fresh fruit cups 7 days a week, including Sundays.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-3">
              <AccordionTrigger>Can I customize my daily cup?</AccordionTrigger>
              <AccordionContent>
                Yes — customization is available from your dashboard on a day-by-day basis.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Support */}
        <section className="bg-white p-6 rounded-xl shadow-md text-center space-y-3">
          <h2 className="text-lg font-semibold flex items-center justify-center gap-2">
            <Phone size={18} /> Need help?
          </h2>
          <p className="text-sm text-slate-600">
            Our support team is just one click away. Reach out if you have any questions about plans or delivery.
          </p>
          <div className="flex justify-center gap-3">
            <Link href="https://wa.me/911234567890" target="_blank">
              <Button className="bg-emerald-600 hover:bg-emerald-700">WhatsApp</Button>
            </Link>
            <Button variant="outline">Chat Now</Button>
          </div>
        </section>

        {/* Testimonials */}
        <div className="mt-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4">What Our Customers Say</h2>

          <div className="overflow-x-auto snap-x snap-mandatory scrollbar-hide">
            <div className="flex gap-6 w-max px-2 sm:px-4">
              <Card className="max-sm:max-w-[280px] max-w-[330px] sm:min-w-[280px] snap-center shrink-1">
                <CardContent className="p-4">
                  <Star className="text-yellow-500 mb-2" />
                  <p>"Fresh fruits daily, never missed a delivery!"</p>
                  <p className="text-sm text-muted-foreground mt-2">— Riya, Student</p>
                </CardContent>
              </Card>
              <Card className="max-sm:max-w-[280px] max-w-[330px] sm:min-w-[280px] snap-center shrink-0">
                <CardContent className="p-4">
                  <Star className="text-yellow-500 mb-2" />
                  <p>"Worth every penny, I feel healthier already."</p>
                  <p className="text-sm text-muted-foreground mt-2">— Arjun, Engineer</p>
                </CardContent>
              </Card>
              <Card className="max-sm:max-w-[280px] max-w-[330px] sm:min-w-[280px] snap-center shrink-0">
                <CardContent className="p-4">
                  <Star className="text-yellow-500 mb-2" />
                  <p>"Easy to manage my schedule, love the flexibility."</p>
                  <p className="text-sm text-muted-foreground mt-2">— Meera, Doctor</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
