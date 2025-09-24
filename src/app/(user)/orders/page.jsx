"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";



export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function OrdersPage() {
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    const [state, setState] = useState({ fetching: true, error: null })

    useEffect(() => {
        axios.get('/api/orders', { withCredentials: true }).then(res => {
            console.log('resp peso', res)
            setOrders(res.data?.orders || []);
            setState({ fetching: false, error: null })
        }).catch(err => {
            toast.error(err.response.data?.message || 'Error in fetching order')
            setState({ fetching: false, error: err.response.data })
        })
    }, [])

    if(state?.fetching) return <OrdersSkeleton/>
    if (!orders.length) return <EmptyCart />

    return (
        <div className="bg-white text-black p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <ShoppingBag className="w-6 h-6" /> My Orders
            </h1>

            <div className="space-y-6">
                {orders.map((order, index) => (
                    <Card key={order._id} className="border border-neutral-200">
                        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <CardTitle className="text-black">Order #ORD{1200+index}</CardTitle>
                                <CardDescription className="flex items-center gap-2 text-neutral-500">
                                    <Calendar className="w-4 h-4" /> {formatDate(order.createdAt)}
                                </CardDescription>
                            </div>
                            <Badge
                                variant="outline"
                                className={`text-xs px-3 py-1 border ${order.status === "Delivered"
                                    ? "border-neutral-400 text-neutral-600"
                                    : "border-black text-black"
                                    }`}
                            >
                                {order.status}
                            </Badge>
                        </CardHeader>

                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                                {order.products.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 border p-2 rounded-md">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-12 w-12 rounded-md object-cover border border-neutral-200"
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-black">{item.name}</p>
                                            <p className="text-xs text-neutral-500">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-between">
                                <p className="font-semibold">Total: ₹{order.finalPrice}</p>
                                <Button
                                    variant="outline"
                                    className="border-black text-black hover:bg-neutral-100"
                                    onClick={() => router.push(`/orders/${order._id}`)}
                                >
                                    View Details
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

function EmptyCart() {
    return (

        <div className="flex flex-col items-center justify-center bg-white text-black p-6 h-full pt-16">
            <ShoppingBag className="w-16 h-16 text-neutral-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Orders Yet</h2>
            <p className="text-neutral-500 text-center max-w-sm mb-4">
                Looks like you haven’t ordered anything yet.
                Start exploring fresh fruit cups and place your first order!
            </p>
            <Button
                className="bg-black text-white hover:bg-neutral-800"
                onClick={() => (window.location.href = "/")}
            >
                Start Ordering
            </Button>
        </div>

    )
}

export function OrdersSkeleton() {
    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
                <Skeleton className="shimmer w-6 h-6 rounded" />
                <Skeleton className="shimmer h-6 w-32" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(2)].map((_, idx) => (
                    <div
                        key={idx}
                        className="border border-neutral-200 rounded-lg p-4 space-y-4"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center">
                            <div className="space-y-2">
                                <Skeleton className="shimmer h-4 w-32" />
                                <Skeleton className="shimmer h-3 w-24" />
                            </div>
                            <Skeleton className="shimmer h-6 w-20 rounded" />
                        </div>

                        {/* Product Thumbnails */}
                        <div className="flex gap-3 overflow-x-auto">
                            {[...Array(3)].map((_, i) => (
                                <Skeleton key={i} className="h-16 w-16 rounded-md" />
                            ))}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3">
                            <Skeleton className="shimmer h-9 w-20 rounded-md" />
                            <Skeleton className="shimmer h-9 w-20 rounded-md" />
                            <Skeleton className="shimmer h-9 w-20 rounded-md" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
