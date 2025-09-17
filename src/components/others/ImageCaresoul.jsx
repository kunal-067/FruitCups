'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react'
import { Button } from '../ui/button';
import Image from 'next/image';

const fallbackProd = {
    _id: "demo",
    name: "Unknown Product",
    price: 0,
    nutrients: [{ name: "N/A" }],
    images: [{ url: "/placeholder.png" }],
    tag: "General",
};

export const ImageCaresoul = ({ product = fallbackProd }) => {
    const [mainIndex, setMainIndex] = useState(0);

    return (
        <div className="md:w-1/2 border-r border-gray-100 p-4 md:p-6">
            <div className="flex gap-4">


                {/* this section is for multiple img so commented */}

                {/* 
                <div className="hidden md:flex flex-col gap-3 w-20 h-[520px] overflow-y-auto">
                    {product.images.map((src, i) => (
                        <button
                            key={src + i}
                            onClick={() => setMainIndex(i)}
                            className={`p-1 rounded-lg flex items-center justify-center border ${mainIndex === i ? "border-emerald-600 ring-2 ring-emerald-100" : "border-transparent"}`}
                            aria-label={`Show image ${i + 1}`}
                        >
                            <Image src={src.url} width={72} height={72} alt={`${product.name} ${i + 1}`} className="w-full h-auto drop-shadow-sm" />
                        </button>
                    ))}
                </div> */}



                <div className="relative flex-1 flex flex-col items-center justify-center">
                    
                    <div className="w-full md:h-[520px] flex items-center justify-center bg-gray-50 rounded-lg p-4">
                        <Image src={product.images[mainIndex].url} alt={product.name} width={520} height={520} className="max-h-[480px] w-auto h-auto object-contain" />
                    </div>



                    {/* this section is for multiple img so commented */}

                    {/* 
                    <div className="md:hidden flex gap-3 mt-3 overflow-x-auto px-2">
                        {product.images.map((src, i) => (
                            <button key={src + i} onClick={() => setMainIndex(i)} className={`p-1 rounded-lg flex-shrink-0 ${mainIndex === i ? "ring-2 ring-emerald-200" : ""}`}>
                                <Image src={src.url} width={72} height={72} alt={`thumb-${i}`} className="drop-shadow-sm" />
                            </button>
                        ))}
                    </div>

                    <button
                        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 items-center justify-center bg-white rounded-full p-2 shadow cursor-pointer"
                        onClick={() => setMainIndex((m) => (m - 1 + product.images.length) % product.images.length)}
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-center bg-white rounded-full p-2 shadow cursor-pointer"
                        onClick={() => setMainIndex((m) => (m + 1) % product.images.length)}
                        aria-label="Next image"
                    >
                        <ChevronRight size={18} />
                    </button> */}


                </div>
            </div>

            <div className="flex gap-3 mt-4 md:hidden justify-center">
                <Button className="flex-1" onClick={() => alert("Add to cart mock")}>Add to Cart</Button>
                <Button className="flex-1" onClick={() => alert("Buy now mock")}>Buy Now</Button>
            </div>
        </div>
    )
}
