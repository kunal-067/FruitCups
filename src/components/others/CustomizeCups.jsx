'use client'
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useDispatch, useSelector } from "react-redux"
import { setNutrition, toggleFruits, toggleToppings } from "@/redux/slices/productSlice"


const fruits = [
    {
        id: "f1",
        name: "Mango",
        price: 20,
        img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=800&auto=format&fit=crop",
        nutrients: [
            { name: "Calories", quantity: 60 },
            { name: "Vitamin C", quantity: 44 }, // %DV
            { name: "Vitamin A", quantity: 21 },
            { name: "Fiber", quantity: 1.6 },
            { name: "Sugar", quantity: 14 },
        ],
    },
    {
        id: "f2",
        name: "Papaya",
        price: 15,
        img: "https://images.unsplash.com/photo-1613145993482-bf9d6d6b6d10?q=80&w=800&auto=format&fit=crop",
        nutrients: [
            { name: "Calories", quantity: 43 },
            { name: "Vitamin A", quantity: 33 },
            { name: "Vitamin C", quantity: 75 },
            { name: "Fiber", quantity: 2 },
            { name: "Folate", quantity: 14 },
        ],
    },
    {
        id: "f3",
        name: "Watermelon",
        price: 18,
        img: "https://images.unsplash.com/photo-1592928303348-54d6d92c4e63?q=80&w=800&auto=format&fit=crop",
        nutrients: [
            { name: "Calories", quantity: 30 },
            { name: "Vitamin A", quantity: 11 },
            { name: "Vitamin C", quantity: 13 },
            { name: "Lycopene", quantity: 4.5 },
            { name: "Potassium", quantity: 5 },
        ],
    },
    {
        id: "f4",
        name: "Pineapple",
        price: 22,
        img: "https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=800&auto=format&fit=crop",
        nutrients: [
            { name: "Calories", quantity: 50 },
            { name: "Vitamin C", quantity: 79 },
            { name: "Manganese", quantity: 45 },
            { name: "Bromelain", quantity: 3 },
            { name: "Fiber", quantity: 1.4 },
        ],
    },
    {
        id: "f5",
        name: "Banana",
        price: 12,
        img: "https://images.unsplash.com/photo-1617191510513-1b7a3f1df2a6?q=80&w=800&auto=format&fit=crop",
        nutrients: [
            { name: "Calories", quantity: 89 },
            { name: "Potassium", quantity: 10 },
            { name: "Vitamin B6", quantity: 20 },
            { name: "Vitamin C", quantity: 15 },
            { name: "Fiber", quantity: 2.6 },
        ],
    },
    {
        id: "f6",
        name: "Apple",
        price: 17,
        img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=800&auto=format&fit=crop",
        nutrients: [
            { name: "Calories", quantity: 52 },
            { name: "Fiber", quantity: 2.4 },
            { name: "Vitamin C", quantity: 7 },
            { name: "Potassium", quantity: 6 },
            { name: "Sugar", quantity: 10 },
        ],
    },
    {
        id: "f7",
        name: "Kiwi",
        price: 25,
        img: "https://images.unsplash.com/photo-1604152135912-04a022e23696?q=80&w=800&auto=format&fit=crop",
        nutrients: [
            { name: "Calories", quantity: 61 },
            { name: "Vitamin C", quantity: 154 },
            { name: "Vitamin E", quantity: 12 },
            { name: "Fiber", quantity: 3 },
            { name: "Potassium", quantity: 9 },
        ],
    },
    {
        id: "f8",
        name: "Grapes",
        price: 16,
        img: "https://images.unsplash.com/photo-1560807707-8cc77767d783?q=80&w=800&auto=format&fit=crop",
        nutrients: [
            { name: "Calories", quantity: 69 },
            { name: "Vitamin K", quantity: 28 },
            { name: "Vitamin C", quantity: 18 },
            { name: "Resveratrol", quantity: 2 },
            { name: "Sugar", quantity: 15 },
        ],
    },
    {
        id: "f9",
        name: "Strawberry",
        price: 28,
        img: "https://images.unsplash.com/photo-1514516870926-2060a3dbe4d9?q=80&w=800&auto=format&fit=crop",
        nutrients: [
            { name: "Calories", quantity: 32 },
            { name: "Vitamin C", quantity: 97 },
            { name: "Manganese", quantity: 19 },
            { name: "Folate", quantity: 6 },
            { name: "Fiber", quantity: 2 },
        ],
    },
    {
        id: "f10",
        name: "Pomegranate",
        price: 30,
        img: "https://images.unsplash.com/photo-1570197788417-0e823b4e1b3d?q=80&w=800&auto=format&fit=crop",
        nutrients: [
            { name: "Calories", quantity: 83 },
            { name: "Vitamin C", quantity: 17 },
            { name: "Fiber", quantity: 4 },
            { name: "Potassium", quantity: 12 },
            { name: "Antioxidants", quantity: 5 },
        ],
    },
];
const toppings = [
    {
        id: "t1",
        name: "Dry Fruits",
        price: 10,
        nutrients: [
            { name: "Protein", quantity: 3 },
            { name: "Fiber", quantity: 2 },
            { name: "Healthy Fats", quantity: 5 },
        ],
    },
    {
        id: "t2",
        name: "Chia Seeds",
        price: 8,
        nutrients: [
            { name: "Omega-3", quantity: 5 },
            { name: "Fiber", quantity: 4 },
            { name: "Protein", quantity: 2 },
        ],
    },
    {
        id: "t3",
        name: "Honey",
        price: 5,
        nutrients: [
            { name: "Calories", quantity: 64 },
            { name: "Sugars", quantity: 17 },
            { name: "Antioxidants", quantity: 2 },
        ],
    },
    {
        id: "t4",
        name: "Mint",
        price: 4,
        nutrients: [
            { name: "Vitamin A", quantity: 12 },
            { name: "Iron", quantity: 6 },
            { name: "Fiber", quantity: 1 },
        ],
    },
    {
        id: "t5",
        name: "Granola",
        price: 12,
        nutrients: [
            { name: "Protein", quantity: 4 },
            { name: "Fiber", quantity: 3 },
            { name: "Iron", quantity: 8 },
        ],
    },
    {
        id: "t6",
        name: "Peanut Butter",
        price: 15,
        nutrients: [
            { name: "Protein", quantity: 8 },
            { name: "Healthy Fats", quantity: 16 },
            { name: "Vitamin E", quantity: 9 },
        ],
    },
    {
        id: "t7",
        name: "Dark Chocolate",
        price: 18,
        nutrients: [
            { name: "Iron", quantity: 11 },
            { name: "Magnesium", quantity: 8 },
            { name: "Antioxidants", quantity: 10 },
        ],
    },
    {
        id: "t8",
        name: "Coconut Flakes",
        price: 7,
        nutrients: [
            { name: "Fiber", quantity: 2 },
            { name: "Healthy Fats", quantity: 4 },
            { name: "Manganese", quantity: 17 },
        ],
    },
];


export function HomeScreenCustomizingCups() {
    const router = useRouter()
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


export function ProdDetailScreenCustomizing({ nutrients = [] }) {
    const dispatch = useDispatch();
    const { fruits: selectedFruits, toppings: selectedToppings, nutrition } = useSelector(state => state.product);

    useEffect(() => {
        let arr = [...nutrients];
        if (selectedFruits.length) {
            selectedFruits.forEach(fruit => {
                fruit.nutrients.forEach(n => {
                    const existing = arr.find(e => e.name === n.name);
                    if (existing) {
                        arr = arr.map(e => e.name === n.name ? { ...e, quantity: e.quantity + n.quantity } : e);
                    } else {
                        arr.push({ ...n });
                    }
                });
            });
        }
        if (selectedToppings.length) {
            selectedToppings.forEach(topping => {
                topping.nutrients.forEach(n => {
                    const existing = arr.find(e => e.name === n.name);
                    if (existing) {
                        arr = arr.map(e => e.name === n.name ? { ...e, quantity: e.quantity + n.quantity } : e);
                    } else {
                        arr.push({ ...n });
                    }
                });
            });
        }
        dispatch(setNutrition(arr));
    }, [dispatch, selectedFruits, selectedToppings]);

    return (
        <div className="grid md:grid-cols-3 gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Fruits</CardTitle>
                    <CardDescription>Price mentioned is applicable per 250g</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {fruits.map((f) => (
                            <button
                                key={f.name}
                                onClick={() => dispatch(toggleFruits(f))}
                                className={`px-3 py-2 rounded-md flex justify-center items-center gap-1 ${selectedFruits.find(e => e.id == f.id) ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-800"}`}
                            >
                                {f.name}<span className=" text-green-500 text-[12px]">(+{f.price})</span>
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Toppings</CardTitle>
                    <CardDescription>Price mentioned is applicable per 250g</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {toppings.map((t) => (
                            <button
                                key={t.name}
                                onClick={() => dispatch(toggleToppings(t))}
                                className={`px-3 py-2 rounded-md flex justify-center items-center gap-1 ${selectedToppings.find(e => e.id == t.id) ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-800"}`}
                            >
                                {t.name}<span className=" text-green-500 text-[12px]">(+{t.price})</span>
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Nutrition Preview</CardTitle>
                    <CardDescription>Nutrients mentioned is applicable per cup</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-sm">
                        {nutrition.map(n =>
                        (
                            <div key={n.name} className="flex justify-between py-1"><span>{n.name}</span><span className="font-medium">{n.quantity} {n.name == "Calories" ? ' kcal' : ' mg'}</span></div>
                        )
                        )}
                    </div>
                    <div className="text-xs text-slate-500 mt-2">Tip: pick at least 2 fruits for better nutrient balance.</div>
                    <div className="mt-3">
                        <Button onClick={() => alert("Custom cup added to cart (mock)")}>Add Custom Cup</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
