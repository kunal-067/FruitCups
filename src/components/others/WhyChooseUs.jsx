import React from 'react'
import { Card, CardContent } from "@/components/ui/card"

const array = [
    { title: "Freshly cut daily", desc: "Sourced & prepared fresh every morning." },
    { title: "100% natural", desc: "No preservatives or artificial flavors." },
    { title: "Fast delivery", desc: "Quick delivery across Kota." },
    { title: "Loved by students", desc: "Affordable, healthy morning options." },
]
const WhyChooseUs = () => {
    return (
        <section className="max-w-6xl mx-auto px-4 py-8">
            <h3 className="text-2xl font-semibold mb-4">Why Choose Us</h3>
            <div className="grid md:grid-cols-4 gap-4">

                {array.map((w) => (
                    <Card key={w.title} className="p-4 text-center">
                        <CardContent>
                            <div className="font-semibold">{w.title}</div>
                            <div className="text-sm text-slate-500 mt-2">{w.desc}</div>
                        </CardContent>
                    </Card>
                ))}

            </div>
        </section>
    )
}

export default WhyChooseUs