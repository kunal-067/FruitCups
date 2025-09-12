import React from 'react'
import { ShoppingCart, User, Home, Tag, Coffee, Gift } from "lucide-react"
import Link from 'next/link'

const Footer = () => {
    return (
        <>
            {/* Sticky bottom nav for mobile */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden">
                <div className="max-w-6xl mx-auto px-4 flex justify-between items-center py-2">
                    <button className="flex flex-col items-center text-xs text-slate-700"><Home className="h-5 w-5" /><span>Home</span></button>
                    <button className="flex flex-col items-center text-xs text-slate-700"><Tag className="h-5 w-5" /><span>Menu</span></button>
                    <button className="flex flex-col items-center text-xs text-slate-700"><Coffee className="h-5 w-5" /><span>Customize</span></button>
                    <button className="flex flex-col items-center text-xs text-slate-700"><Gift className="h-5 w-5" /><span>Offers</span></button>
                    <button className="flex flex-col items-center text-xs text-slate-700"><ShoppingCart className="h-5 w-5" /><span>Cart</span></button>
                </div>
            </nav>

            {/* Footer */}
            <footer id="contact" className="mt-12 bg-slate-900 text-white">
                <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">
                    <div>
                        <div className="font-bold text-lg">KotaFruit</div>
                        <p className="text-sm text-slate-300 mt-2">Fresh fruit cups & juices — delivered across Kota.</p>
                        <div className="text-sm text-slate-300 mt-4">© {new Date().getFullYear()} KotaFruit</div>
                    </div>

                    <div>
                        <div className="font-semibold">Quick Links</div>
                        <ul className="mt-2 text-sm text-slate-300 space-y-1">
                            <li><Link href="#">Home</Link></li>
                            <li><Link href="#menu">Menu</Link></li>
                            <li><Link href="#customize">Customize Cup</Link></li>
                            <li><Link href="#membership">Membership</Link></li>
                        </ul>
                    </div>

                    <div>
                        <div className="font-semibold">Contact</div>
                        <div className="text-sm text-slate-300 mt-2">📍 Shop: Near XYZ, Kota, Rajasthan</div>
                        <div className="text-sm text-slate-300">📞 +91 9XXXXXXXXX</div>
                        <div className="text-sm text-slate-300">✉️ hello@kotafruit.example</div>
                        <div className="mt-3 flex gap-2">
                            <a href="#" className="text-slate-300">Instagram</a>
                            <a href="#" className="text-slate-300">WhatsApp</a>
                            <a href="#" className="text-slate-300">Facebook</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer