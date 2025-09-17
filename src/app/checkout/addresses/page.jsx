"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MapPin, Plus, Edit } from "lucide-react";

export default function SelectAddressPage() {
  const router = useRouter();

  // Mock saved addresses
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Rohan Yadav",
      phone: "9876543210",
      houseNo: "123",
      street: "Near XYZ PG",
      city: "Kota",
      state: "Rajasthan",
      postalCode: "324005",
    },
    {
      id: 2,
      name: "Sidhi Sharma",
      phone: "9876543211",
      houseNo: "456",
      street: "MG Road",
      city: "Kota",
      state: "Rajasthan",
      postalCode: "324006",
    },
  ]);

  const [selectedAddress, setSelectedAddress] = useState(addresses[0]?.id);

  const handleCreateNew = () => {
    router.push("/address/new");
  };

  const handleEdit = (id) => {
    router.push(`/address/edit/${id}`);
  };

  const handleContinue = () => {
    const address = addresses.find(a => a.id === selectedAddress);
    console.log("✅ Selected address:", address);
    router.push("/review-order");
  };

  return (
    <div className="max-w-6xl mx-auto bg-gradient-to-t from-green-50 to-white p-2 pb-18 md:p-4 lg:p-8">
      {/* <header className="bg-green-600 text-white p-4 text-center font-bold text-2xl rounded-md shadow-md mb-6">
        🏠 Select Delivery Address
      </header> */}

      <Button
        variant="outline"
        className="flex items-center mb-4 gap-2 w-full sm:w-auto justify-center"
        onClick={handleCreateNew}
      >
        <Plus size={16} /> Create New Address
      </Button>


      <main className="mx-auto space-y-6">
        <RadioGroup
          value={selectedAddress}
          onValueChange={setSelectedAddress}
          className="space-y-4"
        >
          {addresses.map((address) => (
            <Card
              key={address.id}
              className={`group relative cursor-pointer border rounded-xl transition-shadow shadow-md hover:shadow-xl flex justify-between items-start ${selectedAddress === address.id
                  ? "border-green-600 bg-green-50"
                  : "border-gray-200 bg-white"
                }`}
            >
              <div className="flex-1 p-4">
                <RadioGroupItem value={address.id} className=" absolute top-4 left-4 " />
                <CardHeader className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin size={20} className="text-green-600" />
                    <CardTitle className="text-md md:text-lg">{address.name}</CardTitle>
                  </div>
                  <span className="text-sm text-gray-600">{address.phone}</span>
                </CardHeader>
                <CardContent className="text-sm text-gray-700">
                  {address.houseNo}, {address.street}, {address.city}, {address.state} - {address.postalCode}
                </CardContent>
              </div>

              {/* Edit Button */}
              <Button
                variant="outline"
                size="sm"
                className="absolute top-3 right-3 flex items-center gap-1"
                onClick={() => handleEdit(address.id)}
              >
                <Edit size={14} /> Edit
              </Button>

              {/* Selected Indicator */}
              {/* {selectedAddress === address.id && (
                <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-green-600 animate-pulse"></div>
              )} */}
            </Card>
          ))}
        </RadioGroup>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button
            className="bg-green-600 text-white w-full sm:w-auto flex items-center justify-center"
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>
      </main>

    </div>
  );
}
