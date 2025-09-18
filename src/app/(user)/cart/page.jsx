"use client";
import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, incrementDecrement, removeItem } from "@/redux/slices/cartSlice";
import { Badge } from "@/components/ui/badge";
import { addAddresses, addCheckoutProducts } from "@/redux/slices/checkOutSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { calculateFinalPrice } from "@/redux/selectors";
import axios from "axios";

export default function CartPage() {
    const dispatch = useDispatch();
    const router = useRouter()
    const cart = useSelector(state => state.cart);
    const { addresses } = useSelector(state => state.checkout)
    const { isVerified } = useSelector(state => state.auth);

    const cartTotal = useMemo(() => {
        return cart.reduce((acc, curr) => acc += (curr.finalPrice || curr.price), 0)
    }, [cart])

    useEffect(() => {
        axios.get(`/api/profile/address`, { withCredentials: true }).then(res => {
            dispatch(addAddresses(res.data?.addresses || []))
        }).catch(err => {
            console.log('error in getting address', err)
        })
    }, [])
    function proceed() {
        cart.forEach(item => {
            const { _id, toppings, fruits, price } = item
            dispatch(addCheckoutProducts({ ...item, customizations: { toppings, fruits }, priceAtPurchase: price, productId: _id }))
        })
        if (isVerified) {
            if (addresses?.length !== 0) {
                router.push('/checkout/address/new')
            } else {
                router.push(`/checkout/summay?addressId=${addresses[0]._id}`)
            }
        } else {
            router.push('/login')
        }
    }

    return (
        <div className="bg-gradient-to-b to-white py-4 max-sm:pb-24 sm:py-10 px-2 lg:px-6">
            <div className="max-w-6xl mx-auto space-y-2 md:space-y-10">

                {/* Title */}
                <h1 className="text-xl sm:text-3xl font-bold text-green-900 sm:mb-6">
                    Your Cart 🛒
                </h1>

                {cart.length == 0 ? (
                    <Card className='border-none shadow-none'>
                        <CardContent className='flex flex-col items-center border-none'>
                            <p className="text-center text-gray-600">
                                Your cart is empty. Add some fruits 🍓
                            </p>
                            <Button className='mx-auto px-12 mt-4'>Explore Cups</Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-10">

                        {/* Cart Items */}
                        <Card className="lg:col-span-2 shadow-xl rounded-2xl">
                            <CardContent className="p-2 md:p-4 lg:p-6 space-y-6">
                                {cart.length === 0 ? (
                                    <p className="text-center text-gray-600">
                                        Your cart is empty. Add some fruits 🍓
                                    </p>
                                ) : (
                                    cart?.map((item, index) => (
                                        <CartItem key={item._id + index} item={item} />
                                    ))
                                )}
                            </CardContent>
                        </Card>

                        {/* Summary */}
                        <Card className="shadow-xl rounded-2xl">
                            <CardContent className="space-y-4 max-sm:px-4">
                                <h2 className="text-xl font-semibold text-green-900">
                                    Order Summary
                                </h2>

                                <div className="space-y-1 text-gray-700">
                                    <p>Subtotal: <span className="font-semibold">₹{cartTotal}</span></p>
                                    <p>Delivery Fee: <span className="font-semibold">₹20</span></p>
                                    <p className=" text-md font-bold">
                                        Total: <span className="text-emerald-700 text-lg font-medium">₹{cartTotal + 20}</span>
                                    </p>
                                </div>

                                <CouponCard />
                                <Button onClick={proceed} className="w-full bg-orange-600 text-white text-lg py-3 rounded-md hover:bg-orange-700 transition">
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
                )}
            </div>
        </div>
    );
}


function CartItem({ item }) {
    const dispatch = useDispatch()
    const finalPrice = useSelector(calculateFinalPrice(item._id, item.size));
    function deleteItem() {
        dispatch(removeItem({ _id: item._id, size: item.size }))
        toast.warning(`${item.name} removed from the card`)
    }

    return (
        <div
            className="flex flex-wrap gap-2 justify-between items-center border-b p-1 pb-4"
        >
            <div className="flex items-center justify-center gap-4">
                <Image
                    src={item?.img || '/hello.png'}
                    alt={item?.name}
                    width={60}
                    height={60}
                    className="rounded-xl"
                />
                <div>
                    <h3 className="font-semibold text-md md:text-lg">{item.name}</h3>
                    {(item.toppings || item.fruits) && (
                        <div className="text-[12px] flex gap-2 text-gray-500">
                            <div>{item.toppings?.map(t => <span key={t.id} className="border-r pr-1">{t.name}</span>)}</div>
                            <div>{item.fruits?.map(f => <span key={f.id} className="border-r pr-1">{f.name}</span>)}</div>
                        </div>
                    )}
                    <p className="text-sm text-gray-500">
                        Price: ₹{item.price}
                    </p>
                </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
                <button
                    variant="outline"
                    size="icon"
                    className="border-2 rounded-md p-1"
                    onClick={() => dispatch(incrementDecrement({ _id: item._id, size: item.size, act: -1 }))}
                >
                    <Minus className="h-3 w-3 md:h-4 md:w-4" />
                </button>
                <span className="font-semibold">{item?.quantity}</span>
                <button
                    variant="outline"
                    size="icon"
                    className="border-2 rounded-md p-1"
                    onClick={() => dispatch(incrementDecrement({ _id: item._id, size: item.size, act: +1 }))}

                >
                    <Plus className="w-3 h-3 md:h-4 md:w-4" />
                </button>
            </div>

            {/* work left for changing cart on weight basis */}
            {/* <div><input value={item.quantity} onChange={e => dispatch(changeQuantity({ _id: item._id, qty: e.target.value }))} className="border rounded-sm border-black w-16 text-center" /> <span className="text-[14px]">gram</span></div> */}

            {/* Total & Delete */}
            <div className="flex items-center gap-4">
                <div className="flex flex-col">
                    <Badge>{item.size?.name}</Badge>
                    <span className="font-bold text-green-900">
                        ₹{finalPrice}
                    </span>
                </div>
                <Button
                    variant="destructive"
                    size="icon"
                    className=' cursor-pointer'
                    onClick={() => deleteItem()}
                >
                    <Trash2 className="h-5 w-5" />
                </Button>
            </div>
        </div>
    )
}


export function CouponCard() {
    const [coupon, setCoupon] = useState('');
    function applyCoupon() {
        let d;
        if (coupon == "USER50") {
            d = {
                invalid: false,
                discount: 50
            }
        } else {
            d = {
                invalid: true,
                discount: 0
            }
        }
    }
    return (
        <div className="flex flex-wrap gap-2 items-center">
            <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Coupon code (e.g. STUDENT10)"
                className="flex-1 border rounded-lg px-3 py-2"
            />
            <Button onClick={applyCoupon}>Apply</Button>
            {/* {couponApplied && (
                <div className={`text-sm ${couponApplied.discount ? "text-green-900" : "text-red-600"}`}>
                    {couponApplied.invalid ? "Invalid coupon" : `${couponApplied?.discount}% applied`}
                </div>
            )} */}
        </div>
    )
}

