"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Check, MapPin } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { calculateCheckoutTotal } from "@/redux/selectors";
import { setUsingAddress } from "@/redux/slices/checkOutSlice";

export default function OrderSummaryPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const { products: cart = [], addresses = [] } = useSelector(state => state.checkout);
  const address = addresses.find(ad => ad._id == searchParams.get('addressId'))
  const subtotal = useSelector(calculateCheckoutTotal)
  const delivery = 20;
  const discount = 30;
  const total = subtotal + delivery - discount;

  function proceed() {
    router.push('/checkout/payment?order=true')
  }

  useEffect(() => {
    dispatch(setUsingAddress(address));
  }, [address])

  return (
    <div className="max-w-6xl mx-auto bg-gradient-to-t from-green-50 to-white pb-12">
      {/* Header */}
      <header className="p-4 font-bold text-xl">
        🛒 Review Your Order
      </header>

      <main className="mx-auto p-2 md:p-4 lg:flex lg:gap-6">
        {/* Left Column */}
        <div className="lg:flex-1 space-y-6">
          {/* Address Card */}
          <Card className="shadow-lg border-green-100 hover:shadow-xl transition">
            <CardHeader className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-green-600" />
                <CardTitle>Delivery Address</CardTitle>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => router.push("/address")}
              >
                <Edit size={16} /> Change
              </Button>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <p className="font-medium">{address?.name}</p>
              <p>{address?.phone}</p>
              <p>
                {address?.houseNo}, {address?.street}, {address?.city}, {address?.state} -{" "}
                {address?.postalCode}
              </p>
            </CardContent>
          </Card>

          {/* Products Card */}
          <Card className="shadow-lg border-green-100 hover:shadow-xl transition">
            <CardHeader>
              <CardTitle>Products Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {cart.map((item, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center p-3 rounded-lg bg-green-50 hover:bg-green-100 transition"
                  >
                    <div>
                      <p className="font-medium">{item?.name} × {item?.quantity}</p>
                      <Badge className="ml-1 text-[10px]">{item?.size?.name}</Badge>
                    </div>
                    <span className="font-semibold">₹{item.priceAtPurchase}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Price Summary */}
        <div className="lg:w-96 space-y-6 mt-6 lg:mt-0">
          <Card className="shadow-lg sticky top-20 border-green-100 hover:shadow-xl transition">
            <CardHeader>
              <CardTitle>Price Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>₹{delivery}</span>
              </div>
              <div className="flex justify-between text-green-600 font-medium">
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <Button onClick={proceed} className="w-full mt-4 bg-green-600 text-white flex items-center justify-center gap-2">
                <Check size={18} /> Confirm & Pay ₹{total}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

    </div>
  );
}
