"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from "next/link";

export default function Testimonials({ testimonials }) {
    const [visibleCount, setVisibleCount] = useState(3);

    return (
        <section className="max-w-6xl mx-auto px-4 py-8">
            <h3 className="text-2xl font-semibold mb-4">What Students Say</h3>

            <div className="relative grid md:grid-cols-3 gap-4">
                {/* Carousel for mobile */}
                <Carousel className="overflow-hidden md:hidden">
                    <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow hover:bg-gray-100">
                        &lt;
                    </CarouselPrevious>
                    <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow hover:bg-gray-100">
                        &gt;
                    </CarouselNext>

                    <CarouselContent className="flex gap-4">
                        {testimonials.slice(0, visibleCount).map((t) => (
                            <CarouselItem key={t._id} className="flex-shrink-0 w-[300px]">
                                <Card className="p-4">
                                    <CardContent>
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 grid place-items-center font-semibold">
                                                {t.name.split(" ")[0][0]}
                                            </div>
                                            <div>
                                                <div className="font-medium">{t.name}</div>
                                                <div className="text-sm text-slate-500">
                                                    {Array.from({ length: t.rating }).map((_, i) => "★").join("")}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-600 mt-3">{t.text}</p>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                {testimonials.slice(0, 3).map((t) => (
                    <Card key={t._id} className="p-4 max-md:hidden">
                        <CardContent>
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-100 grid place-items-center font-semibold">
                                    {t.name.split(" ")[0][0]}
                                </div>
                                <div>
                                    <div className="font-medium">{t.name}</div>
                                    <div className="text-sm text-slate-500">
                                        {Array.from({ length: t.rating }).map((_, i) => "★").join("")}
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-slate-600 mt-3">{t.text}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Load More Button */}
            {visibleCount < testimonials.length && (
                <div className="flex justify-center mt-4">
                    <Link
                        href={'#'}
                        className="border-b border-amber-600 text-amber-600 px-4 py-0 font-medium"
                    >
                        Load More
                    </Link>
                </div>
            )}
        </section>
    );
}
