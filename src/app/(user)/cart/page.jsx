"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { changeQuantity, incrementDecrement, removeItem } from "@/redux/slices/cartSlice";

export default function CartPage() {
    const cart = useSelector(state => state.cart);

    useEffect(() => { console.log(cart, 'its the cart') }, [cart])
    // Calculate totals
    const total = 90;

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-4 mb:py-10 px-3 lg:px-6">
            <div className="max-w-6xl mx-auto space-y-4 md:space-y-10">

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-green-600 mb:0 md:mb-6">
                    Your Cart 🛒 {cart.length}
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-10">

                    {/* Cart Items */}
                    <Card className="lg:col-span-2 shadow-xl rounded-2xl">
                        <CardContent className="p-4 lg:p-6 space-y-6">
                            {cart.length === 0 ? (
                                <p className="text-center text-gray-600">
                                    Your cart is empty. Add some fruits 🍓
                                </p>
                            ) : (
                                cart?.map((item) => (
                                    <CartItem key={item._id} item={item} />
                                ))
                            )}
                        </CardContent>
                    </Card>

                    {/* Summary */}
                    <Card className="shadow-xl rounded-2xl">
                        <CardContent className="p-6 space-y-6">
                            <h2 className="text-2xl font-semibold text-green-600">
                                Order Summary
                            </h2>

                            <div className="space-y-2 text-gray-700">
                                <p>Subtotal: <span className="font-semibold">₹{total}</span></p>
                                <p>Delivery Fee: <span className="font-semibold">₹20</span></p>
                                <p className="text-lg font-bold">
                                    Total: <span className="text-green-600">₹{total + 20}</span>
                                </p>
                            </div>

                            <Button className="w-full bg-orange-600 text-white text-lg py-3 rounded-xl hover:bg-orange-700 transition">
                                Proceed to Checkout
                            </Button>

                            {/* Extra: Membership CTA */}
                            <div className="bg-yellow-50 p-4 rounded-xl mt-4">
                                <h3 className="text-lg font-semibold">🍎 Save with Subscription</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    Get daily cups delivered at a lower price. Weekly, monthly, and 3-month plans available.
                                </p>
                                <Button className="mt-3 w-full bg-yellow-500 hover:bg-yellow-600">
                                    Explore Subscription Plans
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}


function CartItem({ item }) {
    const dispatch = useDispatch()
    return (
        <div
            key={item.id}
            className="flex flex-wrap gap-2 justify-between items-center border-b p-1 pb-4"
        >
            <div className="flex items-center justify-center gap-4">
                <Image
                    src={item?.images[0]?.url}
                    alt={item?.name}
                    width={60}
                    height={60}
                    className="rounded-xl"
                />
                <div>
                    <h3 className="font-semibold text-md md:text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                        Price: ₹{item.price}
                    </p>
                </div>
            </div>

            {/* Quantity Controls */}
            {item['type'] == 'shake' ? (
                <div className="flex items-center gap-3">
                    <button
                        variant="outline"
                        size="icon"
                        className="border-2 rounded-md p-1"
                    onClick={() => dispatch(incrementDecrement({_id:item._id, act:-1}))}
                    >
                        <Minus className="h-3 w-3 md:h-4 md:w-4" />
                    </button>
                    <span className="font-semibold">{item?.quantity}</span>
                    <button
                        variant="outline"
                        size="icon"
                        className="border-2 rounded-md p-1"
                                        onClick={() => dispatch(incrementDecrement({_id:item._id, act:+1}))}

                    >
                        <Plus className="w-3 h-3 md:h-4 md:w-4" />
                    </button>
                </div>) : (<div><input value={item.quantity} onChange={e=>dispatch(changeQuantity({_id:item._id, qty:e.target.value}))} className="border rounded-sm border-black w-16 text-center" /> <span className="text-[14px]">gram</span></div>)
            }

            {/* Total & Delete */}
            <div className="flex items-center gap-4">
                <span className="font-bold text-green-600">
                    ₹{item.price * item.quantity / 100}
                </span>
                <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => dispatch(removeItem({_id:item._id}))}
                >
                    <Trash2 className="h-5 w-5" />
                </Button>
            </div>
        </div>
    )
}
