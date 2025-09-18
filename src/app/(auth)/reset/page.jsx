// app/components/ResetPassword.js
'use client'; // For client-side rendering
const { useForm } = require('react-hook-form');
const { zodResolver } = require('@hookform/resolvers/zod');
const { z } = require('zod');
const { Button } = require('@/components/ui/button');
const { Input } = require('@/components/ui/input');
const { Label } = require('@/components/ui/label');

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Confirm password must match'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = async (data) => {
    try {
      // Simulate API call to reset password (replace with token validation)
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: 'mock-token', // Replace with actual token from URL/state
          password: data.password,
        }),
      });

      if (response.ok) {
        alert('Password reset successful! Redirecting to login...');
        // Redirect to login page
      } else {
        const error = await response.json();
        alert(`Reset failed: ${error.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center pt-10 md:pt-20 p-2 md:p-4">
      <div className="bg-white py-6 px-4 md:p-6 rounded-lg shadow-lg max-sm:shadow-none w-full max-w-md text-center">
        <h1 className="text-xl md:text-2xl font-bold text-green-700 mb-4">Reset Password</h1>
        <p className="text-gray-600 text-[14px] md:text-[16px] mb-6">Enter your new password.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">New Password</Label>
            <Input
              id="password"
              type="password"
              {...register('password')}
              className="mt-1 w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="Enter new password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              className="mt-1 w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="Confirm new password"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <Button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
          >
            Reset Password
          </Button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          Back to{' '}
          <a href="/login" className="text-orange-500 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
}