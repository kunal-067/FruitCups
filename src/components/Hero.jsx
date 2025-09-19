'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle, Phone } from 'lucide-react'


// Slideshow
const slides = [
    {
        id: 1,
        title: "🎉 Buy Premium Today & Get ₹105 Discount",
        subtitle: "Limited time: premium benefits & instant discounts.",
        img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "🥭 Fresh Mango Cups in Season — Order Now",
        subtitle: "Ripe mangoes, chilled & ready-to-eat.",
        img: "https://images.unsplash.com/photo-1592928303348-54d6d92c4e63?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "🍹 Healthy Juices Delivered in 30 Minutes",
        subtitle: "Cold-pressed flavors for fresh energy.",
        img: "https://images.unsplash.com/photo-1502741126161-b048400d2b8b?q=80&w=1200&auto=format&fit=crop",
    },
]
const popular = [
    {
        id: "mango-cup",
        name: "Mango Cup",
        price: 69,
        img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=800&auto=format&fit=crop",
        nutrients: ["Vitamin C", "Fiber"],
    },
    {
        id: "mixed-cup",
        name: "Mixed Fruit Cup",
        price: 79,
        img: "https://images.unsplash.com/photo-1572441710519-51e4f3c1d7d4?q=80&w=800&auto=format&fit=crop",
        nutrients: ["Vitamin A", "Antioxidants"],
    },
    {
        id: "papaya-cup",
        name: "Papaya Slices",
        price: 59,
        img: "https://images.unsplash.com/photo-1613145993482-bf9d6d6b6d10?q=80&w=800&auto=format&fit=crop",
        nutrients: ["Vitamin C", "Digestive Enzymes"],
    },
    {
        id: "pineapple-cup",
        name: "Pineapple Bowl",
        price: 85,
        img: "https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=800&auto=format&fit=crop",
        nutrients: ["Vitamin C", "Bromelain"],
    },
]

const Hero = () => {
    const [slideIndex, setSlideIndex] = useState(0)

    const phoneNumber = "+919241033110"; // replace with your number
    const whatsappNumber = "919122874046"; // without "+" for WhatsApp link

    const handleWhatsApp = () => {
        window.open(`https://wa.me/${whatsappNumber}`, "_blank");
    };

    const handleCall = () => {
        window.location.href = `tel:${phoneNumber}`;
    };

    return (
        <section className="relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
                <p className=''>
                    Make for demo and show case only so there is no proper auth / nav and other functions conact us for development
                </p>
                <div className='flex pb-4 gap-2 pt-1'>
                    <Button
                        onClick={handleWhatsApp}
                        className="bg-green-700 hover:bg-green-900 text-white flex items-center gap-2"
                    >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                    </Button>

                    {/* Call Button */}
                    <Button
                        onClick={handleCall}
                        className="bg-blue-700 hover:bg-blue-900 text-white flex items-center gap-2"
                    >
                        <Phone className="w-4 h-4" />
                        Call +91-9241033110
                    </Button>
                </div>
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-50 to-white shadow-md">
                    {/* image background */}
                    <div className="absolute inset-0">
                        <Image
                            src={slides[slideIndex].img}
                            alt={slides[slideIndex].title}
                            fill
                            className="object-cover brightness-75"
                        />
                    </div>
                    <div className="relative z-10 px-6 py-10 md:py-16 flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-1 text-white md:text-black">
                            <h2 className="text-2xl md:text-3xl font-extrabold">{slides[slideIndex].title}</h2>
                            <p className="mt-2 text-sm md:text-base">{slides[slideIndex].subtitle}</p>
                            <div className="mt-4 flex gap-3">
                                <Button asChild className="bg-yellow-400 text-black hover:bg-yellow-500">
                                    <Link href="/menu">Shop Now</Link>
                                </Button>
                                <Button asChild variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-50">
                                    <Link href="/premium">Get Premium</Link>
                                </Button>
                            </div>
                        </div>

                        <div className="w-full md:w-1/3 flex justify-center">
                            <div className="w-48 h-48 md:w-64 md:h-64 rounded-xl overflow-hidden shadow-xl bg-white/60 p-2">
                                <Image src={'https://images.pexels.com/photos/5945726/pexels-photo-5945726.jpeg?auto=compress&cs=tinysrgb&h=350'} alt="featured cup" width={400} height={400} className="object-cover rounded-lg" />
                            </div>
                        </div>
                    </div>

                    {/* slide controls */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        {slides.map((s, i) => (
                            <button
                                key={s.id}
                                onClick={() => setSlideIndex(i)}
                                className={`w-10 h-2 rounded-full ${i === slideIndex ? "bg-yellow-400" : "bg-white/60"}`}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero