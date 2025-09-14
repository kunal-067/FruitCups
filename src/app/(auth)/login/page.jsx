'use client';

import { LOGIN_API } from '@/lib/ApiRoutes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const { useForm } = require('react-hook-form');
const { zodResolver } = require('@hookform/resolvers/zod');
const { z } = require('zod');
const { Button } = require('@/components/ui/button');
const { Input } = require('@/components/ui/input');
const { Label } = require('@/components/ui/label');

const loginSchema = z.object({
  phone: z.string()
    .min(1, { message: "Phone number is required" })
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 characters"),
  // email: z.string().email('Invalid email address'),
  password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(LOGIN_API, {phone:data.phone, password:data.password})
      console.log(response);
      toast.success(response.data?.message || 'Login successfull !')
      router.push('/')
    } catch (error) {
      console.log('Error:', error);
      toast.warning(error.response?.data?.message || error.response?.data?.error || "Internal server error try later");
    }
  };

  return (
    <div className="flex items-center justify-center p-2 pt-10 md:pt-20 md:p-4">
      <div className="bg-white py-6 px-5 md:p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-xl md:text-2xl font-bold text-green-700 text-center mb-4 md:mb-6">Welcome to FruitCup</h1>
        <p className="text-center text-gray-600 text-[14px] md:text-[16px] mb-6">Log in to order fresh fruit cups and juices!</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Email</Label>
            <Input
              id="phone"
              type="number"
              {...register('phone')}
              className="mt-1 w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your email"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
            <Input
              id="password"
              type="password"
              {...register('password')}
              className="mt-1 w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div className="flex justify-between text-sm">
            <a href="/forgot-password" className="text-orange-500 hover:underline">Forgot Password?</a>
            <a href="/signup" className="text-orange-500 hover:underline">Register</a>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
          >
            {isSubmitting ? '...' : 'Log In'}
          </Button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{' '}
          <a href="/signup" className="text-orange-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}