"use client"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

export default function Success() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const order = searchParams.get('order');
  const membership = searchParams.get('membership')

  return (
    <div className="container mx-auto flex justify-center items-center min-h-[70vh] px-4">
      <Card className="max-w-md w-full text-center p-6 shadow-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="text-green-500 w-12 h-12" />
          </div>
          <CardTitle className="text-xl font-bold">
            {order && 'Order Placed Successfully!'}
            { membership && 'Subscribed Successfully!'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-2">Thank you for your purchase.</p>
          {/* <p className="text-sm">Your order ID: <span className="font-mono">#ORD123456</span></p> */}
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full" onClick={() => router.push("/")}>
            Continue Shopping
          </Button>
          <Button variant="outline" className="w-full"
            onClick={() => {
              if (order) {
                return router.push("/orders")
              } else if (membership) {
                return router.push("/membership/track")
              }
            }}>
            {order&&'View My Orders'}
            {membership&&'View My Prime'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
