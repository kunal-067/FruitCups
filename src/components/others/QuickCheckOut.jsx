import React from 'react'

const QuickCheckOut = () => {
  return (
    
            <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>

                <DialogTrigger className="fixed right-4 bottom-20 md:bottom-10 bg-emerald-600 text-white rounded-full p-3 shadow-lg z-50 md:hidden" aria-label="Open Cart">
                    <ShoppingCart className="h-5 w-5" />
                    {cart.length > 0 && (
                        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full grid place-items-center">
                            {cart.length}
                        </div>
                    )}
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='text-2xl text-red-200'>Checkout</DialogTitle>
                        <DialogDescription>Review your items and complete order</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-3 mt-4">
                        {cart.length === 0 ? (
                            <div className="text-sm text-slate-600">Your cart is empty.</div>
                        ) : (
                            cart.map((c, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="w-12 h-12 overflow-hidden rounded-md">
                                        <Image src={c.img || popular[0].img} alt={c.name} width={48} height={48} className="object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium text-sm">{c.name}</div>
                                        <div className="text-xs text-slate-500">₹{c.price}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <DialogFooter className="mt-4 flex justify-between items-center">
                        <div>
                            <div className="text-sm text-slate-600">Total</div>
                            <div className="font-semibold">₹{cart.reduce((s, it) => s + (it.price || 0), 0)}</div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => setIsCheckoutOpen(false)}>Close</Button>
                            <Button onClick={() => { setCart([]); setIsCheckoutOpen(false); alert("Order placed (mock) — thanks!"); }}>Place Order</Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


  )
}

export default QuickCheckOut