// app/components/ForgotPassword.js
'use client'; // For client-side rendering
const { useForm } = require('react-hook-form');
const { zodResolver } = require('@hookform/resolvers/zod');
const { z } = require('zod');
const { Button } = require('@/components/ui/button');
const { Input } = require('@/components/ui/input');
const { Label } = require('@/components/ui/label');

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
      });

      if (response.ok) {
        alert('Password reset link sent! Check your email.');
        // Redirect to OTP page (implement with next/navigation if needed)
      } else {
        const error = await response.json();
        alert(`Failed to send reset link: ${error.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center pt-10 md:pt-20 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-sm:shadow-none w-full max-w-md text-center">
        <h1 className="text-xl md:text-2xl font-bold text-green-700 mb-4">Forgot Password</h1>
        <p className="text-gray-600 text-[14px] md:text-[16px] mb-6">Enter your email to reset your password.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              className="mt-1 w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <Button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
          >
            Send Reset Link
          </Button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          Remember your password?{' '}
          <a href="/login" className="text-orange-500 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
}