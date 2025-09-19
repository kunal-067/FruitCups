"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Wallet, CreditCard, Smartphone, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import axios from "axios";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/redux/slices/cartSlice";
import { clearCheckout } from "@/redux/slices/checkOutSlice";
import { Spinner } from "@/components/others/Spinner";

export default function PaymentPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [payingAmount, setPyingAmount] = useState(searchParams.get('pay' || ''))

  const { products, usingAddress } = useSelector(state => state.checkout)
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [ordering, setOrdering] = useState(false);

  // UPI state
  const [upiApp, setUpiApp] = useState("");
  const [upiId, setUpiId] = useState("");

  // Card state
  const [savedCards, setSavedCards] = useState([
    { id: 1, type: "Visa", last4: "1234" },
    { id: 2, type: "MasterCard", last4: "5678" },
  ]);
  const [selectedCard, setSelectedCard] = useState(savedCards[0]?.id);

  // New card modal
  const [showNewCardModal, setShowNewCardModal] = useState(false);
  const [newCardName, setNewCardName] = useState("");
  const [newCardNumber, setNewCardNumber] = useState("");
  const [newExpiry, setNewExpiry] = useState("");
  const [newCvv, setNewCvv] = useState("");

  const handleAddNewCard = () => {
    if (!newCardName || !newCardNumber || !newExpiry || !newCvv) {
      alert("Please fill all card details");
      return;
    }

    const newCard = {
      id: savedCards.length + 1,
      type: "New Card",
      last4: newCardNumber.slice(-4),
    };

    setSavedCards([...savedCards, newCard]);
    setSelectedCard(newCard.id);
    setShowNewCardModal(false);

    // Clear modal inputs
    setNewCardName("");
    setNewCardNumber("");
    setNewExpiry("");
    setNewCvv("");
  };

  const handleSubmit = () => {
    setOrdering(true);

    if (searchParams.get('order')) {
      const paymentDetails = {
        method: paymentMethod,
        upiApp: paymentMethod === "upi" ? upiApp : null,
        upiId: paymentMethod === "upi" ? upiId : null,
        // card: paymentMethod === "card" ? savedCards.find(c => c.id === selectedCard) : null,
      };

      const data = {
        products,
        address: usingAddress,
        payment: paymentDetails
      };
      axios.post('/api/orders', data, { withCredentials: true }).then(res => {
        dispatch(clearCart());
        dispatch(clearCheckout());
        router.push(`/checkout/success?order=true&orderId=${res.data.order?._id}`)
        toast.success(res.data?.message || 'Order completed !');
      }).catch(err => {
        console.log(err)
        setOrdering(false)
        toast.error(err.response.data?.message || 'Error while ordering')
      })
    }

    const membershipId = searchParams.get('membership'); 
    if(membershipId){
      axios.patch('/api/membership', {membershipId, upiId}, {withCredentials:true}).then(res=>{
        router.push(`/checkout/success?membership=true&pay=${payingAmount}`)
        toast.success(res.data?.message || 'Payment completed !');
      }).catch(err => {
        console.log(err)
        setOrdering(false)
        toast.error(err.response.data?.message || 'Error while ordering')
      })
    }
  };

  return (
    <div className="bg-gradient-to-b from-green-50 to-white p-2 pb-18 sm:p-6">

      <div className="max-w-md mx-auto space-y-6">
        <Card className="shadow-md py-4 sm:p-4">
          <CardHeader>
            <CardTitle className="text-lg">Select Payment Method</CardTitle>
            <CardDescription>Use testdemo@upi for demo use</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-1">

              {/* COD */}
              <div className={`flex flex-col p-3 border rounded-lg cursor-pointer transition ${paymentMethod === "cod" ? "border-red-400 bg-red-50" : "hover:bg-gray-50"}`}>
                <div className="flex items-center">
                  <RadioGroupItem value="cod" id="cod" />
                  <label htmlFor="cod" className="ml-2 flex items-center gap-2 cursor-pointer w-full">
                    <Wallet size={18} className="text-green-600" /> Cash on Delivery
                  </label>
                </div>
                <p className="text-[14px] text-red-600 font-medium ">Cod not avaliable</p>
              </div>

              {/* UPI */}
              <div className={`flex flex-col p-3 border rounded-lg cursor-pointer transition ${paymentMethod === "upi" ? "border-green-600 bg-green-50" : "hover:bg-gray-50"}`}>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="upi" id="upi" />
                  <label htmlFor="upi" className="flex items-center gap-2 cursor-pointer w-full">
                    <Smartphone size={18} className="text-green-600" /> UPI
                  </label>
                </div>
                {paymentMethod === "upi" && (
                  <div className="mt-3 space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {["GooglePay", "PhonePe", "Paytm"].map(app => (
                        <Button
                          key={app}
                          variant={upiApp === app ? "default" : "outline"}
                          onClick={() => setUpiApp(app)}
                          size="sm"
                          className="flex-1"
                        >
                          {app}
                        </Button>
                      ))}
                    </div>
                    <Input
                      placeholder="Enter new UPI ID (e.g. rohan@upi)"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full mt-2"
                    />
                  </div>
                )}
              </div>

              {/* Card */}
              <div className={`flex flex-col p-3 border rounded-lg cursor-pointer transition ${paymentMethod === "card" ? "border-green-600 bg-green-50" : "hover:bg-gray-50"}`}>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="card" id="card" />
                  <label htmlFor="card" className="flex items-center gap-2 cursor-pointer w-full">
                    <CreditCard size={18} className="text-green-600" /> Card
                  </label>
                </div>

                {paymentMethod === "card" && (
                  <div className="mt-3 space-y-2">
                    <p className="text-sm font-medium">Select Saved Card</p>
                    <div className="flex flex-col gap-2">
                      {savedCards.map(card => (
                        <Button
                          key={card.id}
                          variant={selectedCard === card.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCard(card.id)}
                          className="w-full"
                        >
                          {card.type} ending {card.last4}
                        </Button>
                      ))}
                      <Dialog open={showNewCardModal} onOpenChange={setShowNewCardModal}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="w-full">
                            + Add New Card
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Add New Card</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-3">
                            <Input
                              placeholder="Cardholder Name"
                              value={newCardName}
                              onChange={(e) => setNewCardName(e.target.value)}
                              className="w-full"
                            />
                            <Input
                              placeholder="Card Number"
                              value={newCardNumber}
                              onChange={(e) => setNewCardNumber(e.target.value)}
                              className="w-full"
                              maxLength={16}
                            />
                            <div className="flex gap-2">
                              <Input
                                placeholder="Expiry (MM/YY)"
                                value={newExpiry}
                                onChange={(e) => setNewExpiry(e.target.value)}
                                className="flex-1"
                                maxLength={5}
                              />
                              <Input
                                placeholder="CVV"
                                value={newCvv}
                                onChange={(e) => setNewCvv(e.target.value)}
                                className="w-24"
                                maxLength={3}
                              />
                            </div>
                            <div className="flex justify-end gap-2 mt-2">
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <Button onClick={handleAddNewCard}>Save Card</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                )}
              </div>

            </RadioGroup>

            {/* Confirm Button */}
            <Button
              disabled={ordering}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 mt-4"
              onClick={handleSubmit}
            >
              {ordering ? <Spinner /> : `Confirm & Pay ${payingAmount}`}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
