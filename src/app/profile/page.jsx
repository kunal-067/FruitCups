'use client'
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    Coins,
    Ticket,
    ShoppingBag,
    Heart,
    MapPin,
    Settings,
    LogOut,
    Edit,
    X
} from "lucide-react"

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useDispatch, useSelector } from "react-redux"
import { fetchUser } from "@/redux/slices/userSlice"
import { useRouter } from "next/navigation"

// Zod schema for form validation
const profileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address")
})

export default function ProfilePage() {
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => { dispatch(fetchUser()) }, [dispatch])
    let { data, loading, error } = useSelector(state => state.user);
    let user = data;

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [activeTab, setActiveTab] = useState("dashboard") // dashboard, orders, wishlist, addresses

    // react-hook-form
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: { name: user?.name, email: user?.email }
    })
    useEffect(() => {
        if (user) {
            reset({ name: user.name, email: user.email || 'example@mail.com' });
        }
    }, [user, reset]);


    const handleLogout = () => {
        alert("Logged out successfully!")
    }

    const onSubmit = (data) => {
        setUser({ ...user, name: data.name, email: data.email })
        setIsDialogOpen(false)
    }

    const handleCancel = () => {
        reset()
        setIsDialogOpen(false)
    }


    return (
        <div className="px-3 py-4 -sm:p-4 flex flex-col items-center max-sm:pb-24 sm:p-10">
            <div className="grid max-w-6xl lg:grid-cols-5 max-sm:gap-4 gap-8">
                {/* Sidebar */}
                <Card className="lg:col-span-2 shadow-md">
                    <CardContent className="flex flex-col items-center text-center max-sm:pb-0 p-6">
                        <Image
                            src={'/demo-b-profile.jpg'}
                            alt="User Avatar"
                            width={100}
                            height={100}
                            className="rounded-full border"
                        />
                        <h2 className="text-xl font-semibold mt-4">{user?.name}</h2>
                        <p className="text-gray-500 text-sm">{user?.email || user?.phone}</p>

                        {/* Edit Profile Dialog */}
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="mt-4 flex items-center gap-2">
                                    <Edit size={16} /> Edit Profile
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Edit Profile</DialogTitle>
                                    <DialogDescription>
                                        Update your personal information below.
                                    </DialogDescription>
                                </DialogHeader>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                                    <div>
                                        <label className="text-sm font-medium">Name</label>
                                        <Input {...register("name")} plceholder='Enter your name' className="mt-1 w-full" />
                                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Email</label>
                                        <Input {...register("email")} plceholder='Enter your email' className="mt-1 w-full" />
                                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                    </div>

                                    <DialogFooter className="flex justify-end gap-2">
                                        <Button variant="outline" type="button" onClick={handleCancel}>
                                            Cancel
                                        </Button>
                                        <Button type="submit">Save</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </CardContent>

                    <Separator />

                    <CardContent className="max-sm:pt-0 p-4 space-y-4">
                        <Button
                            variant="default"
                            className="w-full justify-start gap-2"
                            onClick={() => setActiveTab("dashboard")}
                        >
                            <Coins size={18} /> Dashboard
                        </Button>
                        <Button
                        variant={"ghost"}
                            className="w-full justify-start gap-2"
                            onClick={() => router.push('/orders')}
                        >
                            <ShoppingBag size={18} /> My Orders
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-2"
                            // onClick={() => setActiveTab("wishlist")}
                        >
                            <Heart size={18} /> Wishlist
                        </Button>
                        <Button
                            variant={"ghost"}
                            className="w-full justify-start gap-2"
                            // onClick={() => setActiveTab("addresses")}
                        >
                            <MapPin size={18} /> Addresses
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-2 text-red-600"
                            onClick={handleLogout}
                        >
                            <LogOut size={18} /> Logout
                        </Button>
                    </CardContent>
                </Card>

                {/* Right Content */}
                <div className="lg:col-span-3">
                    <div className="space-y-6">
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Coins className="text-yellow-500" /> My Coins
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='max-sm:pt-0'>
                                <p className="text-lg font-semibold"><span className="text-emerald-600 text-2xl">{user?.coins || 0}</span> Coins</p>
                                <p className="text-gray-500 text-sm">Use coins for discounts on checkout</p>
                                <Button
                                    size="sm"
                                    className="mt-3 bg-blue-600 hover:bg-blue-800"
                                >
                                    Earn Coins
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Ticket className="text-purple-500" /> My Coupons
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {!user?.coupons?.length ? (
                                    <p className="text-gray-500 -mt-4">You have no coupons</p>
                                ) : (user?.coupons.map((coupon, idx) => (
                                    <div key={idx} className="flex items-center justify-between border rounded-lg p-3">
                                        <div>
                                            <h3 className="font-semibold">{coupon.code}</h3>
                                            <p className="text-sm text-gray-500">{coupon.desc}</p>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant={appliedCoupons.includes(coupon.code) ? "secondary" : "default"}
                                            onClick={() => handleApplyCoupon(coupon.code)}
                                        >
                                            {appliedCoupons.includes(coupon.code) ? "Applied" : "Apply"}
                                        </Button>
                                    </div>
                                )))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
