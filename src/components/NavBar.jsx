'use client'
import React, { useState } from 'react'
import { ShoppingCart, User } from 'lucide-react'
import Link from 'next/link'
const NavBar = () => {
    const [cart, setCart] = useState([]); 
    
    return (
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 grid place-items-center text-emerald-700 font-bold">KF</div>
                    <div className="hidden sm:block">
                        <div className="font-semibold">KotaFruit</div>
                        <div className="text-xs text-slate-500 -mt-0.5">Fresh cups • Daily delivery</div>
                    </div>
                </div>

                <nav className="hidden md:flex items-center gap-6 text-sm">
                    <Link href="#" className="hover:text-emerald-600">Home</Link>
                    <Link href="#menu" className="hover:text-emerald-600">Menu</Link>
                    <Link href="#customize" className="hover:text-emerald-600">Customize Cup</Link>
                    <Link href="#membership" className="hover:text-emerald-600">Membership</Link>
                    <Link href="#wallet" className="hover:text-emerald-600">Wallet/Coins</Link>
                    <Link href="#contact" className="hover:text-emerald-600">Contact</Link>
                </nav>

                <div className="flex items-center gap-3">
                    <button className="p-2 rounded-md hover:bg-slate-100"><User className="h-5 w-5 text-slate-700" /></button>
                    <button className="relative p-2 rounded-md hover:bg-slate-100" aria-label="Cart">
                        <ShoppingCart className="h-5 w-5" />
                        {cart.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs w-5 h-5 rounded-full grid place-items-center">{cart.length}</span>
                        )}
                    </button>
                </div>
            </div>
        </header>
    )
}

export default NavBar