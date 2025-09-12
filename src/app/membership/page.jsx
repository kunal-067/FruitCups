"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, CalendarDays, Clock } from "lucide-react"

const plans = [
  {
    id: "weekly",
    title: "Weekly Subscription",
    price: 199,
    duration: "7 Days",
    description: "Perfect for trying out our Premium cups for a week.",
  },
  {
    id: "monthly",
    title: "Monthly Subscription",
    price: 699,
    duration: "30 Days",
    description: "Best value for students and professionals in Kota.",
    popular: true,
  },
  {
    id: "three-months",
    title: "3 Months Subscription",
    price: 1899,
    duration: "90 Days",
    description: "For regular customers who love long-term health benefits.",
  },
]

const timeOptions = ["Morning", "Evening", "Both"]

const MembershipPage = () => {
  const [selectedPlan, setSelectedPlan] = useState("monthly")
  const [timePref, setTimePref] = useState("Morning")
  const [daysLeft, setDaysLeft] = useState(18) // Example progress
  const totalDays = selectedPlan === "weekly" ? 7 : selectedPlan === "monthly" ? 30 : 90

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-green-800">Fruit Cup Subscription</h1>
        <p className="text-gray-600 mt-2">
          Pay once, enjoy daily fresh fruit cups with flexible scheduling and premium perks.
        </p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`border-2 transition-transform hover:scale-105 ${
              selectedPlan === plan.id ? "border-green-600 shadow-lg" : "border-gray-200"
            }`}
          >
            <CardHeader className="text-center">
              <CardTitle className="flex flex-col items-center">
                {plan.popular && (
                  <Badge className="bg-orange-500 text-white mb-2">Most Popular</Badge>
                )}
                <span className="text-xl font-semibold">{plan.title}</span>
                <span className="text-sm text-gray-500">{plan.duration}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <p className="text-3xl font-bold text-green-700 mb-2">₹{plan.price}</p>
              <p className="text-gray-500 text-center mb-4">{plan.description}</p>
              <Button
                onClick={() => setSelectedPlan(plan.id)}
                className={`w-full ${
                  selectedPlan === plan.id
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-orange-500 hover:bg-orange-600"
                } text-white`}
              >
                {selectedPlan === plan.id ? "Selected" : "Choose Plan"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Subscription Progress */}
      <div className="max-w-3xl mx-auto mt-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-green-600" />
              Subscription Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-2">
              You have <span className="font-semibold">{daysLeft}</span> days left in your{" "}
              {plans.find((p) => p.id === selectedPlan)?.title}.
            </p>
            <Progress value={(daysLeft / totalDays) * 100} className="h-3" />
          </CardContent>
        </Card>
      </div>

      {/* Time Preference */}
      <div className="max-w-3xl mx-auto mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              Delivery Time Preference
            </CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            {timeOptions.map((option) => (
              <Button
                key={option}
                variant={timePref === option ? "default" : "outline"}
                className={`${
                  timePref === option
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "border-green-600 text-green-700"
                }`}
                onClick={() => setTimePref(option)}
              >
                {option}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Perks */}
      <div className="max-w-3xl mx-auto mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Why Subscribe?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" /> Daily fresh fruit cups
                delivered to your doorstep
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" /> Custom or Business-selected
                Premium cups
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" /> Flexible scheduling (Morning,
                Evening, Both)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" /> Save more with longer plans
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Contact */}
      <div className="mt-12 text-center">
        <h2 className="text-xl font-semibold text-green-800 mb-2">Need Help?</h2>
        <p className="text-gray-600 mb-4">Chat with us for custom subscription options.</p>
        <div className="flex justify-center gap-4">
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Contact on WhatsApp
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Call Support
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MembershipPage
