'use client'
import { ArrowLeft, ChevronLeft, ShoppingCart, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
const NavBar = () => {
    const router = useRouter();
    const path = usePathname();
    const cart = useSelector(state => state.cart);

    return (
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

                <div className='flex flex-row-reverse items-center gap-2'>
                    <button
                        onClick={() => router.back()}
                        className="md:hidden flex items-center justify-between gap-2 rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 active:bg-gray-200 active:scale-95 transition"
                    >
                        <ChevronLeft className="h-5 -ml-1" />
                        {/* Back */}
                    </button>
                    <div className="flex items-center gap-3">
                        <div onClick={e => router.push('/')} className="w-10 h-10 rounded-lg bg-emerald-50 grid place-items-center text-emerald-700 font-bold">KF</div>
                        <div onClick={e => router.push('/')} className="hidden sm:block cursor-pointer">
                            <div className="font-semibold">KotaFruit</div>
                            <div className="text-xs text-slate-500 -mt-0.5">Fresh cups • Daily delivery</div>
                        </div>
                    </div>
                </div>

                <nav className="hidden md:flex items-center gap-6 text-sm">
                    <Link href="/" className={`hover:text-emerald-600 ${(path == '/' || path == '/home') && 'text-emerald-600'}`}>Home</Link>
                    <Link href="/menu" className={`hover:text-emerald-600 ${path == '/#menu' && 'text-emerald-600'}`}>Menu</Link>
                    <Link href="/customize" className={`hover:text-emerald-600 ${path == '/customize' && 'text-emerald-600'}`}>Customize Cup</Link>
                    <Link href="/membership" className={`hover:text-emerald-600 ${path == '/membership' && 'text-emerald-600'}`}>Membership</Link>
                    <Link href="/wallet" className={`hover:text-emerald-600 ${path == '/wallet' && 'text-emerald-600'}`}>Wallet/Coins</Link>
                    <Link href="/#contact" className={`hover:text-emerald-600 ${path == '/#contact' && 'text-emerald-600'}`}>Contact</Link>
                </nav>
                <div className="flex items-center gap-3">
                    <Link href='/profile' className={`p-2 rounded-md hover:bg-gray-200 active:bg-gray-200 ${path == '/profile' && 'bg-gray-200'}`}><User className="h-5 w-5 text-slate-700" /></Link>
                    <Link href='/cart' className={`relative p-2 rounded-md hover:bg-gray-200 active:bg-gray-200 ${path == '/cart' && 'bg-gray-200'}`} aria-label="Cart">
                        <ShoppingCart className="h-5 w-5" />
                        {cart.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs w-5 h-5 rounded-full grid place-items-center">{cart.length}</span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    )
}

export const Back = ({ className = "" }) => {
    const router = useRouter();
    const pathname = usePathname();

    // Convert "/home/orders" → ["Home", "Orders"]
    const segments = pathname
        .split("/")
        .filter(Boolean)
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1));

    return (
        <div
            className={`flex fixed bg-green-100 z-50 items-center gap-2 p-3 py-1 md:hidden ${className}`}
        >
            {/* Back button */}
            <button
                onClick={() => router.back()}
                className="flex items-center justify-between gap-2 rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 active:scale-95 transition"
            >
                <ChevronLeft className="h-5 -ml-1" />
                {/* Back */}
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-1 text-sm bg-gray-200 py-2 px-3 rounded-md font-medium">
                {segments.length === 0 ? (
                    <span>Home</span>
                ) : (
                    segments.map((seg, i) => (
                        <span key={i} className="flex items-center gap-1">
                            {seg}
                            {i < segments.length - 1 && (
                                <span className="text-gray-400">/</span>
                            )}
                        </span>
                    ))
                )}
            </div>
        </div>
    );
};

export default NavBar