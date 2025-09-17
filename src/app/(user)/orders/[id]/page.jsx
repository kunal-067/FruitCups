'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Phone, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';

import { Skeleton } from "@/components/ui/skeleton";
import axios from 'axios';
import { useParams, useSearchParams } from 'next/navigation';


const steps = ['Order Placed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];

export default function OrderTrackingPage() {
  const params = useParams();
  const [order, setOrder] = useState(null);
  const [state, setState] = useState({fetching:true, error:null})

  useEffect(() => {
    axios.get(`/api/orders/${params.id}`,{withCredentials:true}).then(res=>{
        setOrder(res.data?.order);
        setState({fetching:false, error:null});
    }).catch(err=>{
      console.log(err)
        setState({fetching:false, error:err.response.data})
    })
  }, []);

  if (state.fetching) return <OrderTrackingSkeleton/>

  const currentStepIndex = steps.indexOf(order.status);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
     <div className="container max-w-6xl mx-auto p-4 lg:p-8 space-y-6 pb-16">
      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <span>Order #{order._id}</span>
            <Badge variant="secondary">{order.status}</Badge>
          </CardTitle>
          <p className="text-sm text-gray-500">
            Ordered on {new Date(order.createdAt).toLocaleString()}
          </p>
        </CardHeader>
        <CardContent className="grid gap-2 sm:grid-cols-2">
          <p>Total: ₹{order.totalPrice}</p>
          <p>Final: <span className="font-semibold">₹{order.finalPrice}</span></p>
          <p>Payment: {order.payment.method.toUpperCase()}</p>
          <p>Status: {order.payment.status}</p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Info */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Address</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                {order.address.houseNo}, {order.address.street}
              </p>
              <p>
                {order.address.city}, {order.address.state} -{" "}
                {order.address.postalCode}
              </p>
              <p>{order.address.country}</p>
              <p className="mt-2 text-sm text-gray-500">
                Expected by {new Date(order.deliveryWithin).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}
              </p>
            </CardContent>
          </Card>

          {/* Order Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {steps.map((step, i) => {
                  const isDone =
                    steps.indexOf(order.status) >= i ||
                    order.status === "Delivered";
                  return (
                    <li key={i} className="flex items-center gap-3">
                      <div
                        className={`h-4 w-4 rounded-full ${
                          isDone ? "bg-green-600" : "bg-gray-300"
                        }`}
                      ></div>
                      <span
                        className={`${
                          isDone ? "text-green-700 font-medium" : "text-gray-500"
                        }`}
                      >
                        {step}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          {/* Delivery Boy */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Partner</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Image
                src={order.deliveryBoy?.avatar || '/demo-b-profile.jpg'}
                alt={order.deliveryBoy?.name||"demo-img"}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="flex-1">
                <p className="font-semibold">{order.deliveryBoy?.name||'Demmo Partner'}</p>
                <p className="text-sm text-gray-500">{order.deliveryBoy?.phone || 9122874046}</p>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="outline">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Products */}
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.products.map((p) => (
                <div
                  key={p._id}
                  className="flex items-center gap-4 border-b pb-2 last:border-0"
                >
                  <Image
                    src={p.image || '/faildimg.jpg'}
                    alt={p.name}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{p.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {p.quantity} × ₹{p.priceAtPurchase}
                    </p>
                  </div>
                  <p className="font-semibold">₹{p.quantity * p.priceAtPurchase}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function OrderTrackingSkeleton() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Order Summary */}
      <div className="border border-neutral-200 rounded-lg p-4 space-y-4">
        <div className="flex justify-between">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Shipping Info */}
      <div className="border border-neutral-200 rounded-lg p-4 space-y-3">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      {/* Progress Steps */}
      <div className="space-y-4">
        {[...Array(5)].map((_, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <Skeleton className="w-5 h-5 rounded-full" />
            <Skeleton className="h-4 w-40" />
          </div>
        ))}
      </div>

      {/* Contact Delivery Boy Button */}
      <Skeleton className="h-10 w-40 rounded-md" />
    </div>
  );
}
