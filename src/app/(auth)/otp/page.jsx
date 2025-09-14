// app/components/OTP.js
'use client';
import { RESEND_OTP, VERIFY_OTP } from '@/lib/ApiRoutes';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';

const { useForm } = require('react-hook-form');
const { zodResolver } = require('@hookform/resolvers/zod');
const { z } = require('zod');
const { Button } = require('@/components/ui/button');
const { Input } = require('@/components/ui/input');
const { Label } = require('@/components/ui/label');

// ✅ Schema for 6-digit OTP
const otpSchema = z.object({
  otp: z
    .string()
    .length(4, 'OTP must be 6 digits')
    .regex(/^\d+$/, 'OTP must contain only numbers'),
});

export default function OTP() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const mobileNumber = searchParams.get('mobileNumber');
  const type = searchParams.get('type');

  const [verificationId, setVerificationId] = useState(
    searchParams.get('verificationId')
  );

  // ⏳ Timer for resend button
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timeLeft]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  });

  // ✅ Verify OTP
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(VERIFY_OTP, {
        mobileNumber,
        verificationId,
        otp: data.otp,
        type,
      });

      toast.success(response.data?.message);
      router.push('/');
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.warning(
          error.response?.data?.message ||
            error.response?.data?.error ||
            'Something went wrong'
        );
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  // ✅ Resend OTP
  const resendOtp = async (phone) => {
    if (timeLeft > 0) return; // prevent spam

    try {
      const res = await axios.post(RESEND_OTP, { phone });
      setVerificationId(res.data?.data?.verificationId);

      toast.success(res.data?.message || 'OTP sent successfully!');
      setTimeLeft(60); // start 60s cooldown
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.warning(
          error.response?.data?.message ||
            error.response?.data?.error ||
            'Something went wrong'
        );
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2 md:p-4">
      <div className="bg-white py-6 px-5 md:p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-xl md:text-2xl font-bold text-green-700 mb-4">
          Verify Your OTP
        </h1>
        <p className="text-gray-600 text-[14px] md:text-[16px] mb-6">
          Enter the code sent to your mobile {mobileNumber}.
        </p>

        {/* OTP Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label
              htmlFor="otp"
              className="text-sm font-medium text-gray-700"
            >
              OTP
            </Label>
            <Input
              id="otp"
              {...register('otp')}
              className="mt-1 w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-center"
              placeholder="Enter 4-digit code"
              maxLength={6}
            />
            {errors.otp && (
              <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
          >
            Verify OTP
          </Button>
        </form>

        {/* Resend OTP */}
        <p className="text-sm text-gray-600 mt-4">
          Didn’t receive a code?{' '}
          <button
            onClick={() => resendOtp(mobileNumber)}
            className={`text-orange-500 hover:underline disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={timeLeft > 0}
          >
            {timeLeft > 0
              ? `Resend in ${timeLeft}s`
              : 'Resend'}
          </button>
        </p>
      </div>
    </div>
  );
}
