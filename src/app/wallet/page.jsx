"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, Coins, ArrowDownCircle, ArrowUpCircle, Share2 } from "lucide-react";

export default function WalletPage() {
  const [coins, setCoins] = useState(320);

  const transactions = [
    { id: 1, type: "earn", desc: "Referral Bonus", amount: 50, date: "10 Sept 2025" },
    { id: 2, type: "spend", desc: "Fruit Cup Order", amount: -120, date: "08 Sept 2025" },
    { id: 3, type: "earn", desc: "Membership Reward", amount: 100, date: "05 Sept 2025" },
  ];

  return (
    <div className="bg-gradient-to-b from-orange-50 to-white min-h-screen">
      {/* Header */}
      {/* <header className="sticky top-0 z-50 bg-green-600 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-lg font-bold">Wallet & Rewards</h1>
        <span className="font-semibold">FruitCup 🍹</span>
      </header> */}

      <main className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Wallet Balance */}
        <Card className="shadow-lg bg-green-100 border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Coins className="text-yellow-500" /> My Coins
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-3">
            <p className="text-4xl font-bold text-green-700">{coins} 🪙</p>
            <p className="text-sm text-gray-600">≈ ₹{coins / 2} value</p>
            <Button className="bg-green-600 text-white">Add Coins</Button>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex justify-between items-center border-b pb-2">
                <div className="flex items-center gap-2">
                  {tx.type === "earn" ? (
                    <ArrowDownCircle className="text-green-600" />
                  ) : (
                    <ArrowUpCircle className="text-red-500" />
                  )}
                  <div>
                    <p className="font-medium">{tx.desc}</p>
                    <p className="text-xs text-gray-500">{tx.date}</p>
                  </div>
                </div>
                <span className={`font-bold ${tx.type === "earn" ? "text-green-600" : "text-red-500"}`}>
                  {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Referral Program */}
        <Card className="shadow-lg bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="text-yellow-500" /> Referral Program
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-center">
            <p className="font-semibold">Invite your friends & Earn 50 Coins 🎉</p>
            <div className="bg-white border rounded-lg p-3 flex justify-between items-center">
              <span className="font-mono">FRUIT123</span>
              <Button variant="outline" size="sm" className="flex gap-1">
                <Share2 size={16} /> Share
              </Button>
            </div>
            <p className="text-xs text-gray-600">Your friend also gets 25 bonus coins on signup.</p>
          </CardContent>
        </Card>

        {/* Membership Shortcut */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Membership Status</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-3">🚀 Upgrade to Premium & Get Daily Fresh Cups at Discount</p>
            <Button className="bg-yellow-500 text-white">Upgrade Now</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
