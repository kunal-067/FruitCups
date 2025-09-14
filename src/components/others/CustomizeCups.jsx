'use client'
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export function HomeScreenCustomizingCups() {
    const router = useRouter()

    // Fruits with prices
    const fruits = [
        { name: "Mango", price: 20, img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=800&auto=format&fit=crop" },
        { name: "Papaya", price: 15, img: "https://images.unsplash.com/photo-1613145993482-bf9d6d6b6d10?q=80&w=800&auto=format&fit=crop" },
        { name: "Watermelon", price: 18, img: "https://images.unsplash.com/photo-1592928303348-54d6d92c4e63?q=80&w=800&auto=format&fit=crop" },
        { name: "Pineapple", price: 22, img: "https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=800&auto=format&fit=crop" },
        { name: "Banana", price: 12, img: "https://images.unsplash.com/photo-1617191510513-1b7a3f1df2a6?q=80&w=800&auto=format&fit=crop" },
    ]

    // Toppings with prices
    const toppings = [
        { name: "Dry Fruits", price: 10 },
        { name: "Chia Seeds", price: 8 },
        { name: "Honey", price: 5 },
        { name: "Mint", price: 4 },
        { name: "Granola", price: 12 },
    ]

    // Sizes with multipliers
    const sizes = [
        { name: "Small", multiplier: 1 },
        { name: "Medium", multiplier: 1.5 },
        { name: "Large", multiplier: 2 },
    ]

    // State
    const [customFruits, setCustomFruits] = useState([fruits[0].name])
    const [customTopping, setCustomTopping] = useState(toppings[0].name)
    const [customSize, setCustomSize] = useState(sizes[1].name) // Medium
    const [customPreview, setCustomPreview] = useState(fruits[0].img)
    const [quantity, setQuantity] = useState(1)
    const [totalPrice, setTotalPrice] = useState(0)

    // Update preview when fruits change
    useEffect(() => {
        if (customFruits.length > 0) {
            const lastFruit = fruits.find(f => f.name === customFruits[customFruits.length - 1])
            setCustomPreview(lastFruit?.img || fruits[0].img)
        }
    }, [customFruits])

    // Calculate price
    useEffect(() => {
        const fruitCost = customFruits.reduce((sum, f) => {
            const fruitObj = fruits.find(x => x.name === f)
            return sum + (fruitObj?.price || 0)
        }, 0)

        const toppingObj = toppings.find(t => t.name === customTopping)
        const toppingCost = toppingObj?.price || 0

        const sizeObj = sizes.find(s => s.name === customSize)
        const multiplier = sizeObj?.multiplier || 1

        setTotalPrice(((fruitCost + toppingCost) * multiplier) * quantity)
    }, [customFruits, customTopping, customSize, quantity])

    // Handle fruit selection
    function manageFruitSelect(fruit) {
        if (customFruits.includes(fruit)) {
            setCustomFruits(d => d.filter(f => f !== fruit))
        } else {
            setCustomFruits(d => [...d, fruit])
        }
    }

    // Add to cart (placeholder)
    function addToCart() {
        const cartItem = {
            id: `custom-${Date.now()}`,
            fruits: customFruits,
            topping: customTopping,
            size: customSize,
            quantity,
            totalPrice,
            img: customPreview,
        }
        console.log("Added to cart:", cartItem)
        alert("Item added to cart!")
    }

    return (
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {/* Preview */}
            <Card className="flex flex-col items-center p-4">
                <div className="md:w-48 md:h-48 rounded-xl overflow-hidden">
                    <Image src={customPreview} alt="custom preview" width={400} height={400} className="object-cover max-w-full" />
                </div>
                <div className="mt-2 sm:mt-4 text-center">
                    <div className="font-medium">Custom {customSize} Cup</div>
                    <div className="text-sm text-slate-500">Fruits: {customFruits.join(", ")}</div>
                    <div className="text-sm text-slate-500">Topping: {customTopping}</div>
                    <div className="text-lg font-bold mt-2 font-mono">₹{totalPrice}</div>
                    {/* <div className="flex items-center justify-center gap-3 mt-2">
                        <Button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</Button>
                        <span>{quantity}</span>
                        <Button onClick={() => setQuantity(q => q + 1)}>+</Button>
                    </div> */}
                </div>
            </Card>

            {/* Options */}
            <div className="md:col-span-2 space-y-4">
                {/* Fruits */}
                <Card className="p-2 sm:p-4">
                    <CardHeader>
                        <CardTitle className="text-base">Choose Fruits</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2 mt-2">
                        {fruits.map(f => {
                            const selected = customFruits.includes(f.name)
                            return (
                                <button
                                    key={f.name}
                                    onClick={() => manageFruitSelect(f.name)}
                                    className={`px-3 py-2 rounded-full text-sm ${selected ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-700"}`}
                                >
                                    {f.name} <span className="text-green-500 text-[12px]">(+₹{f.price})</span>
                                </button>
                            )
                        })}
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-4">
                    {/* Toppings */}
                    <Card className="py-4 sm:p-4">
                        <CardHeader>
                            <CardTitle className="text-base">Toppings</CardTitle>
                        </CardHeader>
                        <CardContent className="sm:mt-2 flex flex-wrap gap-2">
                            <Select onValueChange={v => setCustomTopping(v)} defaultValue={customTopping}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={customTopping} />
                                </SelectTrigger>
                                <SelectContent>
                                    {toppings.map(t => (
                                        <SelectItem key={t.name} value={t.name}>{t.name} <span className="text-green-500 text-[12px]">(+₹{t.price})</span></SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>

                    {/* Sizes */}
                    <Card className="py-4 sm:p-4">
                        <CardHeader>
                            <CardTitle className="text-base">Cup Size</CardTitle>
                        </CardHeader>
                        <CardContent className="sm:mt-2">
                            <div className="flex gap-2">
                                {sizes.map(s => (
                                    <button
                                        key={s.name}
                                        onClick={() => setCustomSize(s.name)}
                                        className={`px-3 py-2 rounded-md ${customSize === s.name ? "bg-emerald-600 text-white" : "bg-slate-100"}`}
                                    >
                                        {s.name} 
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 mt-2">
                    <Button onClick={addToCart}>Add to cart</Button>
                    <Button variant="outline" onClick={() => {
                        setCustomFruits([fruits[0].name]);
                        setCustomTopping(toppings[0].name);
                        setCustomSize(sizes[1].name);
                        setQuantity(1)
                    }}>
                        Reset
                    </Button>
                    <Button onClick={() => router.push('/customize')} className='sm:ml-12'>
                        Customize in detail
                    </Button>
                </div>
            </div>
        </div>
    )
}
