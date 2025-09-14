'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { addItem } from "@/redux/slices/cartSlice"
import { useEffect } from "react"
import { toast } from "sonner"

export function PopularCups({ p }) {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    useEffect(() => {
        console.log(cart)
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(item) {
        dispatch(addItem({ ...item, quantity: 100 }))
        toast.success(`${item.name} added to cart`)
    }



    return (
        <Card key={p?._id} className="p-0 overflow-hidden">
            <div className="relative h-36 flex items-center justify-center">
                <Image src={p?.images[0]?.url} alt={p.name} height={100} width={100} className="object-cover h-full w-auto" />
            </div>
            <CardContent className="p-3">
                <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{p.name}</h4>
                    <Badge>{p.nutrients[0].name}</Badge>
                </div>
                <p className="text-emerald-600 font-semibold mt-2">₹{p.price} <span className="text-black text-[12px]"> / 100g</span></p>
                <div className="mt-3 flex items-center gap-2">
                    <Button size="sm" onClick={e => addToCart(p)} >
                        Add
                    </Button>
                    <Link href={`/product/${p.id}`} className="text-sm text-slate-500 ml-auto">Details →</Link>
                </div>
            </CardContent>
        </Card>
    )
}

export function PopularDrinks({ d }) {
    const dispatch = useDispatch();
    function addToCart(item) {
        dispatch(addItem({ ...item, quantity: 1 }))
        toast.success(`${item.name} added to cart`)
    }
    return (
        <Card key={d._id} className="p-0 overflow-hidden">
            <div className="relative h-36">
                <Image src={d.images[0]?.url} alt={d.name} fill className="object-cover" />
            </div>
            <CardContent className="p-3">
                <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{d.name}</h4>
                    <Badge>{d.tag}</Badge>
                </div>
                <p className="text-emerald-600 font-semibold mt-2">₹{d.price}</p>
                <div className="mt-3 flex gap-2">
                    <Button size="sm" onClick={e => addToCart(d)}>Add</Button>
                </div>
            </CardContent>
        </Card>
    )
}