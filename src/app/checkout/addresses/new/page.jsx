"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { addAddresses } from "@/redux/slices/checkOutSlice";
import {MapSelector} from "@/components/LocationPicker";
import axios from "axios";
import { toast } from "sonner";
import { Spinner } from "@/components/others/Spinner";

// Schema with address + contact details
const addressSchema = z.object({
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(10, "Enter a valid phone number"),
  houseNo: z.string().min(1, "House number is required"),
  street: z.string().min(2, "Street is required"),
  city: z.string().min(2, "City is required").default("Kota"),
  district: z.string().min(2, "District is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().min(5, "Enter a valid postal code"),
  country: z.string().default("India"),
  landMark: z.string().optional(),
});


export default function AddressForm() {
  const dispatch = useDispatch();
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      houseNo: "",
      street: "",
      city: "Kota",
      district: "",
      state: "",
      postalCode: "",
      country: "India",
      landMark: "",
    },
  });

  function onSubmit(values) {
    axios.post(`/api/profile/address`,{...values},{withCredentials:true}).then(res=>{
      dispatch(addAddresses(res.data?.data));
      router.push(`/checkout/summary?addressId=${res.data?.addedAddress._id}`)
    }).catch(err=>{
      toast.error(err.response?.data?.message || 'Error in saving address')
    })
  }

  return (
    <div className="max-w-xl mx-auto max-sm:p-4 p-6 max-sm:pb-18 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Delivery Address & Contact</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* House No */}
          <FormField
            control={form.control}
            name="houseNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>House No</FormLabel>
                <FormControl>
                  <Input placeholder="Enter house/flat no" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Street */}
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input placeholder="Street / Area" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* City */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* District */}
          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel>District</FormLabel>
                <FormControl>
                  <Input placeholder="District" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* State */}
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="State" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Postal Code */}
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pincode</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Pincode" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Landmark */}
          <FormField
            control={form.control}
            name="landMark"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Landmark (Optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Nearby landmark" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Country */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button disabled={form.formState.isSubmitting} type="submit" className="w-full bg-green-600 text-white">
            {form.formState.isSubmitting ? <Spinner/> :'Save & Continue'}
          </Button>

          {/* Location Map */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Location on Map</FormLabel>
                <FormControl>
                  <div>
                    <MapSelector
                      onSelect={(coords) => {
                        field.onChange(coords); // update form with lat/lng
                      }}
                    />
                    {field.value && (
                      <p className="text-sm text-gray-500 mt-2">
                        Selected: {field.value.lat.toFixed(4)}, {field.value.lng.toFixed(4)}
                      </p>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>

            )} />

        </form>
      </Form>
    </div>
  );
}
