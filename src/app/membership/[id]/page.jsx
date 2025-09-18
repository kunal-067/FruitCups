"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Edit, Pause, Play, RefreshCw, Phone, Copy, Calendar, Gift } from "lucide-react";

// ---------- Demo/mock defaults ----------
const DEFAULT_REFERRAL = "KF-REF-2025";
const DEFAULT_WEEK = {
  monday: { name: "Mango Cup", productId: "mango", img: "/products/prod-1.png" },
  tuesday: { name: "Papaya Cup", productId: "papaya", img: "/fruits/papaya.png" },
  wednesday: { name: "Banana Cup", productId: "banana", img: "/fruits/banana.png" },
  thursday: { name: "Mixed Fruit Cup", productId: "mixed", img: "/fruits/mixed.png" },
  friday: { name: "Apple Cup", productId: "apple", img: "/fruits/apple.png" },
  saturday: { name: "Watermelon Cup", productId: "watermelon", img: "/fruits/watermelon.png" },
  sunday: { name: "Seasonal Cup", productId: "seasonal", img: "/products/prod-seasonal.png" },
};

const PLANS = {
  monthly: { price: 499, durationDays: 30, name: "Monthly" },
  weekly: { price: 149, durationDays: 7, name: "Weekly" },
  quarterly: { price: 1299, durationDays: 90, name: "Quarterly" },
};

// ---------- Helpers ----------
const STORAGE_KEY = "prime_dashboard_v1";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { }
}

// ---------- Main component ----------
export default function DashboardPage() {
  // Demo: fetch user/subscription from backend here. For now, use mock and persist to localStorage.
  const persisted = typeof window !== "undefined" ? loadState() : null;

  const [user, setUser] = useState(
    persisted?.user || { name: "Rohan Kumar", email: "rohan@example.com", coins: persisted?.user?.coins ?? 120 }
  );

  const [subscription, setSubscription] = useState(
    persisted?.subscription || {
      plan: "monthly",
      status: "active", // active | paused | expiring
      startDate: persisted?.subscription?.startDate || new Date().toISOString(),
      endDate: persisted?.subscription?.endDate || new Date(Date.now() + PLANS.monthly.durationDays * 24 * 60 * 60 * 1000).toISOString(),
      slot: persisted?.subscription?.slot || "morning", // morning | afternoon | evening
      remainingDays: persisted?.subscription?.remainingDays ?? PLANS.monthly.durationDays,
    }
  );

  const [schedule, setSchedule] = useState(persisted?.schedule || DEFAULT_WEEK);
  const [skipped, setSkipped] = useState(persisted?.skipped || {}); // { monday: true }
  const [streak, setStreak] = useState(persisted?.streak ?? 3); // demo streak days
  const [recommendations, setRecommendations] = useState([
    { id: "papaya", name: "Papaya Cup", reason: "Popular on Fridays" },
    { id: "kiwi", name: "Kiwi Cup", reason: "High Vitamin C" },
  ]);
  const [referral] = useState(DEFAULT_REFERRAL);
  const [isPaused, setIsPaused] = useState(subscription.status === "paused");
  const [loading, setLoading] = useState(false);

  // Derived stats
  const deliveredDays = useMemo(() => {
    const planDays = PLANS[subscription.plan]?.durationDays || 30;
    return planDays - (subscription.remainingDays ?? 0);
  }, [subscription]);

  const remainingDays = subscription.remainingDays;

  // Persist to localStorage whenever important slices change
  useEffect(() => {
    const state = { user, subscription, schedule, skipped, streak };
    saveState(state);
  }, [user, subscription, schedule, skipped, streak]);

  // ---------- Actions ----------
  function handleSkipDay(day) {
    setSkipped(prev => {
      const next = { ...prev, [day]: !prev[day] }; // toggle
      return next;
    });

    // optional: adjust remainingDays
    setSubscription(prev => {
      // skipping could either extend plan or convert to credit; here we'll decrement remainingDays and increase coins as a credit
      const delta = prev.remainingDays > 0 ? -1 : 0;
      const newRemaining = Math.max(0, (prev.remainingDays || 0) + delta);
      // reward small coin for skip
      setUser(u => ({ ...u, coins: u.coins + 5 }));
      return { ...prev, remainingDays: newRemaining };
    });
  }

  function handleCustomizeDay(day) {
    // open customize page for that day
    // for demo we'll alert — in real app navigate to customize page with preselected day
    alert(`Open customize UI for ${day} (you would navigate user to customize screen).`);
  }

  function handleChangeSlot(value) {
    setSubscription(prev => ({ ...prev, slot: value }));
    // optionally call API to save
  }

  function handlePauseResume() {
    setIsPaused(prev => {
      const next = !prev;
      setSubscription(s => ({ ...s, status: next ? "paused" : "active" }));
      return next;
    });
  }

  function handleRenew() {
    setLoading(true);
    // demo renewal: extend endDate by plan duration and restore remainingDays
    setTimeout(() => {
      setSubscription(prev => {
        const planMeta = PLANS[prev.plan] || PLANS.monthly;
        const newEnd = new Date(Date.now() + planMeta.durationDays * 24 * 60 * 60 * 1000);
        return {
          ...prev,
          startDate: new Date().toISOString(),
          endDate: newEnd.toISOString(),
          remainingDays: planMeta.durationDays,
          status: "active",
        };
      });
      setLoading(false);
      alert("Subscription renewed successfully (demo).");
    }, 800);
  }

  function copyReferralToClipboard() {
    try {
      navigator.clipboard.writeText(referral);
      alert("Referral code copied!");
    } catch {
      alert("Copy failed — please select and copy manually: " + referral);
    }
  }

  function handleUpgrade() {
    alert("Open Upgrade modal (demo). In real app show plan options & payment flow.");
  }

  // ---------- small helpers ----------
  function formatDate(iso) {
    try {
      return new Date(iso).toLocaleDateString();
    } catch { return iso; }
  }

  // ---------- UI ----------
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">Welcome back, <span className="text-emerald-600">{user.name}</span> 👋</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your Prime subscription, schedule, and rewards.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-slate-500">Plan</div>
              <div className="font-medium">{PLANS[subscription.plan]?.name} • <span className="text-emerald-600">{remainingDays} days left</span></div>
            </div>
            <Badge variant={subscription.status === "active" ? "default" : "secondary"}>{subscription.status.toUpperCase()}</Badge>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Remaining Days</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{remainingDays}</div>
              <div className="text-xs text-slate-500 mt-1">of {PLANS[subscription.plan]?.durationDays} days</div>
              <div className="mt-3"><Progress value={Math.round(((PLANS[subscription.plan]?.durationDays - remainingDays) / PLANS[subscription.plan]?.durationDays) * 100) || 0} /></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Cups Delivered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{deliveredDays}</div>
              <div className="text-xs text-slate-500 mt-1">deliveries completed</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Coins</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.coins}</div>
              <div className="text-xs text-slate-500 mt-1">earned (use at checkout)</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Skipped Days</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Object.values(skipped).filter(Boolean).length}</div>
              <div className="text-xs text-slate-500 mt-1">days skipped</div>
            </CardContent>
          </Card>
        </div>

        {/* Schedule + Delivery slot */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {Object.entries(schedule).map(([day, info]) => {
                    const isSkipped = !!skipped[day];
                    return (
                      <div key={day} className={`border rounded-lg p-3 bg-white flex flex-col`}>
                        <div className="flex items-center gap-2">
                          <div className={`w-12 h-12 rounded-md bg-slate-100 grid place-items-center overflow-hidden`}>
                            {/* Use Image if you have real assets */}
                            <Image src={info.img || "/placeholder.png"} alt={info.name} width={48} height={48} className="object-cover" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium capitalize">{day}</div>
                            <div className={`text-sm ${isSkipped ? "line-through text-slate-400" : "text-slate-700"}`}>{info.name}</div>
                          </div>
                        </div>

                        <div className="mt-3 flex gap-2">
                          <Button size="sm" onClick={() => handleCustomizeDay(day)}><Edit size={14} className="mr" /><span className="max-sm:hidden">Customize</span></Button>
                          <Button size="sm" variant={isSkipped ? "destructive" : "outline"} onClick={() => handleSkipDay(day)}>
                            {isSkipped ? "Unskip" : "Skip"}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations & Streak */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>🎯 Streak & Rewards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold">{streak} days</div>
                      <div className="text-sm text-slate-500">Current healthy streak</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-500">Next reward</div>
                      <div className="font-medium">Free cup after 7 days</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Progress value={(streak / 7) * 100} />
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2">
                    <Button onClick={() => { setUser(u => ({ ...u, coins: u.coins + 20 })); alert("You claimed a small reward +20 coins (demo)."); }}>Claim 20 Coins</Button>
                    <Button variant="link" onClick={() => alert("View rewards history (demo).")}>View Rewards</Button>
                  </div>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommended for you</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recommendations.map(rec => (
                      <div key={rec.id} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{rec.name}</div>
                          <div className="text-xs text-slate-500">{rec.reason}</div>
                        </div>
                        <div>
                          <Button size="sm" onClick={() => alert(`Added ${rec.name} to your schedule (demo).`)}>Add</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right column: slot, referral, support */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Slot</CardTitle>
              </CardHeader>
              <CardContent>
                <Select onValueChange={handleChangeSlot}>
                  <SelectTrigger>
                    <SelectValue>{subscription.slot}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (7–9 AM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12–2 PM)</SelectItem>
                    <SelectItem value="evening">Evening (6–8 PM)</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-xs text-slate-500 mt-3">Change your preferred delivery window. We prioritize orders for the selected slot.</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Referral</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 items-center">
                  <Input readOnly value={referral} />
                  <Button onClick={copyReferralToClipboard}><Copy size={14} /></Button>
                </div>
                <div className="text-xs text-slate-500 mt-2">Share referral to earn coins when friends order.</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-slate-700">Need help with scheduling or deliveries? Our team is ready.</div>
                <div className="mt-3 flex gap-2">
                  <Link href="https://wa.me/911234567890" target="_blank">
                    <Button><Phone size={14} className="mr-2" />WhatsApp</Button>
                  </Link>
                  <Button variant="outline" onClick={() => alert("Open support chat (demo).")}>Chat</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator />

        {/* FAQ */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="faq-1">
              <AccordionTrigger>How do I pause my subscription?</AccordionTrigger>
              <AccordionContent>
                You can pause from the dashboard by clicking <strong>Pause</strong>. While paused, deliveries stop and your remaining days will be preserved for when you resume.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2">
              <AccordionTrigger>Can I skip a delivery?</AccordionTrigger>
              <AccordionContent>
                Yes — use the <strong>Skip</strong> button on the specific day in your weekly schedule. Skipped days can be refunded as coins or added back to your plan depending on policy.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-3">
              <AccordionTrigger>How does customization work?</AccordionTrigger>
              <AccordionContent>
                You can customize a day&apos;s cup from the customize page — the dashboard will link you there for each day. Customization may change price for that day.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed left-0 right-0 bottom-0 md:bottom-6 flex justify-center pointer-events-none">
        <div className="max-w-6xl w-full px-4 md:px-0 pointer-events-auto">
          <div className="bg-white rounded-xl shadow-lg p-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div>
                <div className="text-sm text-slate-500">Plan</div>
                <div className="font-medium">{PLANS[subscription.plan]?.name} • ₹{PLANS[subscription.plan]?.price}</div>
              </div>

              <div className="hidden md:block">
                <div className="text-xs text-slate-500">Expiry</div>
                <div className="text-sm">{formatDate(subscription.endDate)}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button onClick={handleRenew} disabled={loading}><RefreshCw size={16} className="mr-2" />{loading ? "Renewing..." : "Renew"}</Button>
              <Button variant="outline" onClick={handlePauseResume}>{isPaused ? <Play size={16} className="mr-2" /> : <Pause size={16} className="mr-2" />}{isPaused ? "Resume" : "Pause"}</Button>
              <Button onClick={handleUpgrade} className="bg-amber-400 text-black"><Gift size={16} className="mr-2" />Upgrade</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
