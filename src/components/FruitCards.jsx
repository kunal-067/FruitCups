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
// import { setFinalPrice } from "@/redux/slices/productSlice"

const fallbackProd = {
  _id: "demo",
  name: "Unknown Product",
  price: 0,
  nutrients: [{ name: "N/A" }],
  images: [{ url: "/placeholder.png" }],
  tag: "General",
};

export function PopularCups({ p = fallbackProd }) {
    const dispatch = useDispatch();
    
    function addToCart(item) {
        dispatch(addItem({ ...item, quantity: 1, size:{name:'Small', value:2.5} }))
        toast.success(`${item.name} added to cart`)
    }



    return (
        <Card className="p-0 overflow-hidden">
            <div className="relative h-28 sm:h-36 flex items-center justify-center p-1">
                <Image src={p?.images[0]?.url} alt={p.name} height={100} width={100} className="object-cover h-full w-auto" />
            </div>
            <CardContent className="p-3 max-sm:pt-0">
                <div className="flex flex-wrap-reverse items-center justify-between">
                    <h4 className="font-medium text-sm">{p.name}</h4>
                    <Badge className='px-4'>{p?.nutrients[0]?.name}</Badge>
                </div>
                <p className="text-emerald-600 font-semibold mt-2">₹{p.price} <span className="text-black text-[12px]"> / 250g</span></p>
                <div className="mt-3 flex items-center gap-2">
                    <Button size="sm" onClick={e => addToCart(p)} >
                        Add
                    </Button>
                    <Link href={`/cups/${p._id}`} className="text-sm text-slate-500 ml-auto">Details →</Link>
                </div>
            </CardContent>
        </Card>
    )
}

export function PopularDrinks({ d }) {
    const dispatch = useDispatch();
    function addToCart(item) {
        localStorage.setItem("cart", JSON.stringify([...cart, item]))
        dispatch(addItem({ ...item, quantity: 1, size:{name:'Small', value:2.5} }))
        toast.success(`${item.name} added to cart`)
    }

    return (
        <Card key={d._id} className="p-0 overflow-hidden">
            <div className="relative h-36">
                <Image src={d.images[0]?.url} alt={d.name} fill className="object-cover" />
            </div>
            <CardContent className="p-3 max-sm:pt-0">
                <div className="flex flex-wrap-reverse items-center justify-between">
                    <h4 className="font-medium text-sm">{d.name}</h4>
                    <Badge className='px-4'>{d.tag}</Badge>
                </div>
                <p className="text-emerald-600 font-semibold mt-2">₹{d.price}</p>
                <div className="mt-3 flex gap-2">
                    <Button size="sm" onClick={e => addToCart(d)}>Add</Button>
                </div>
            </CardContent>
        </Card>
    )
}