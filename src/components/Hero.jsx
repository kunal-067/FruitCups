'use client'
import React from 'react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { MessageCircle, Phone } from 'lucide-react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


// Slideshow
const slides = [
    {
        id: 1,
        title: "🎉 Buy Premium Today & Get ₹105 Discount",
        subtitle: "Limited time: premium benefits & instant discounts.",
        img: "/hero1.jpeg",
    },
    {
        id: 2,
        title: "🥭 Fresh Mango Cups in Season — Order Now",
        subtitle: "Ripe mangoes, chilled & ready-to-eat.",
        img: "/hero3.jpg",
    },
    {
        id: 3,
        title: "🍹 Healthy Juices Delivered in 30 Minutes",
        subtitle: "Cold-pressed flavors for fresh energy.",
        img: "/hero4.jpg",
        textColor: "text-white"
    }
]
const Hero = () => {
    const [api, setApi] = React.useState()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!api) return

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        // ✅ define the callback
        const handleSelect = () => {
            setCurrent(api.selectedScrollSnap() + 1)
        }

        api.on("select", handleSelect)

        // Auto-slide every 2s
        const interval = setInterval(() => {
            const next = (api.selectedScrollSnap() + 1) % api.scrollSnapList().length
            api.scrollTo(next)
        }, 2000)

        return () => {
            api.off("select", handleSelect) // ✅ cleanup with the same function
            clearInterval(interval)
        }
    }, [api])

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
            <div className="max-w-6xl mx-auto px-2 md:px-4  pt-1 md:pt-4 py-8 md:py-12">
                <p className='max-sm:text-[14px] max-sm:leading-4 text-gray-600 italic'>
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


                {/* Carousel */}
                <Carousel setApi={setApi} className="w-full rounded-2xl overflow-hidden relative">
                    <CarouselContent className='gap-4'>
                        {slides.map((slide, idx) => (
                            <CarouselItem key={slide.id} className="relative w-full h-60 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg">
                                <Image src={slide.img} alt={slide.title} fill className="object-cover brightness-75" />
                                <div className="absolute inset-0 flex flex-col justify-center items-center md:items-start px-4 md:px-12 text-center md:text-left">
                                    <h2 className={`text-xl md:text-3xl font-extrabold ${slide.textColor ? slide.textColor : 'text-black'} drop-shadow-md`}>{slide.title}</h2>
                                    <p className={`mt-2 text-sm md:text-lg ${slide.textColor ? slide.textColor : 'text-black'} font-medium drop-shadow-sm`}>{slide.subtitle}</p>
                                    <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                                        <Button asChild className="bg-yellow-400 text-black hover:bg-yellow-500">
                                            <a href="/menu">Shop Now</a>
                                        </Button>
                                        <Button asChild variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-50">
                                            <a href="/premium">Get Premium</a>
                                        </Button>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <CarouselPrevious />
                    <CarouselNext />

                    {/* Slide Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        {Array.from({ length: slides.length }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => api?.scrollTo(i)}
                                className={`w-10 h-2 rounded-full transition-all ${i + 1 === current ? "bg-yellow-400" : "bg-white/60"}`}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </Carousel>
            </div>
        </section>
    )
}

export default Hero