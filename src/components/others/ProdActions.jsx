'use client'
import { MinusCircle, PlusCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { setCouponApplied, setPrice, setQuantity, setSize } from '@/redux/slices/productSlice'
import { addItem } from '@/redux/slices/cartSlice'
import { toast } from 'sonner'

export function SelectSize({ sizes = [{ name: "Small (250g)", value: 2.5 }, { name: "Regular (500g)", value: 5 }, { name: "Large (1kg)", value: 10 }] }) {
    const dispatch = useDispatch();
    const { size } = useSelector(state => state.product);
    return (
        <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
                <button
                    key={s.name}
                    onClick={() => dispatch(setSize(s))}
                    className={`px-3 py-2 rounded-lg border ${size.name === s.name ? "border-emerald-600 bg-emerald-50" : "border-gray-200 bg-white"}`}
                >
                    {s.name}
                </button>
            ))}
        </div>
    )
}

export function EditQuntity() {
    const { quantity } = useSelector(state => state.product);
    const dispatch = useDispatch()
    return (
        <div className="flex items-center gap-3">
            <button onClick={() => dispatch(setQuantity(Math.max(1, quantity - 1)))} className="p-2 rounded-md border">
                <MinusCircle />
            </button>
            <div className="px-4">{quantity}</div>
            <button onClick={() => dispatch(setQuantity(quantity + 1))} className="p-2 rounded-md border">
                <PlusCircle />
            </button>
        </div>
    )
}

export function CartOrBuy({ p }) {
    const { quantity, fruits, size, toppings, finalPrice } = useSelector(state => state.product);
  
    const dispatch = useDispatch();
    function addToCart(item) {
        dispatch(addItem({ ...item, quantity, size, toppings, finalPrice, fruits }))
        toast.success(`${item.name} added to cart`)
    }
    return (
        <>
            <Button onClick={() => addToCart(p)} className='px-8'>Add to Cart</Button>
            {/* <Button onClick={() => alert("Buy now (mock)")} className="bg-amber-500 hover:bg-amber-600">Buy Now</Button> */}
        </>
    )
}

export function CouponCard() {
    const dispatch = useDispatch();
    const { couponApplied } = useSelector(state => state.product)
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
        dispatch(setCouponApplied(d))
    }
    return (
        <div className="flex gap-3 items-center">
            <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Coupon code (e.g. STUDENT10)"
                className="flex-1 border rounded-lg px-3 py-2"
            />
            <Button onClick={applyCoupon}>Apply</Button>
            {couponApplied && (
                <div className={`text-sm ${couponApplied.discount ? "text-green-600" : "text-red-600"}`}>
                    {couponApplied.invalid ? "Invalid coupon" : `${couponApplied?.discount}% applied`}
                </div>
            )}
        </div>
    )
}

export function FinalPrice({ p }) {
    const dispatch = useDispatch();
    const { finalPrice } = useSelector(state => state.product);
    useEffect(() => {
        dispatch(setPrice(p))
    }, [dispatch, p])

    return (
        <div className="text-2xl text-green-700 px-2 font-semibold border rounded-sm border-red-400">₹{finalPrice}</div>
    );
}

