'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { REGISTER_API } from '@/lib/ApiRoutes';
import axios from 'axios';
import { useRouter } from 'next/navigation';

//form validation 
const registrationSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    phone: z.string()
        .min(1, { message: "Phone number is required" })
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number must not exceed 15 characters"),
    // email: z.string().email('Invalid email address'),
    password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),

    terms: z.literal(true, 'You must agree to the terms and conditions'),

}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

export default function Registration() {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(registrationSchema), //connect zod schema with useForm-hook
        // defaultValues: { name: '', email: '', password: '', confirmPassword: '', terms: false },
        mode: 'onChange'
    });


    const onSubmit = async (data) => {
        try {
            const response = await axios.post(REGISTER_API, {
                name: data.name,
                phone: data.phone,
                password: data.password,
            });

            toast(response.data?.message || "Otp sent successfully!");
            const user = response?.data?.user
            router.push(`/otp?verificationId=${user?.verificationId}&mobileNumber=${user.phone}`)
        } catch (error) {
            console.log(error)
            if (axios.isAxiosError(error)) {
                toast.warning(
                    error.response?.data?.message || error.response?.data?.error || "Something went wrong"
                );
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="flex items-center justify-center md:pt-10 md:p-4">
            <div className="bg-white py-6 px-5 md:px-6 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-xl md:text-2xl font-bold text-green-700 text-center mb-2 md:mb-6">Join FruitCup</h1>
                <p className="text-center text-gray-600 text-[14px] md:text-[16px] mb-6">Sign up to enjoy fresh fruit cups and juices!</p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
                        <Input
                            id="name"
                            {...register('name')}
                            className="mt-1 w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter your name"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Mobile No.</Label>
                        <Input
                            id="phone"
                            {...register('phone')}
                            className="mt-1 w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter your Phone no"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                    </div>

                    {/* <div>
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                        <Input
                            id="email"
                            //   type="email"
                            {...register('email')}
                            className="mt-1 w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div> */}

                    <div>
                        <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            {...register('password')}
                            className="mt-1 w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            placeholder="Create a password"
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
                            placeholder="Confirm your password"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                    </div>

                    <div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" onCheckedChange={(c) => (setValue('terms', c))} />
                            <Label htmlFor="terms" className="text-sm text-gray-700">
                                I agree to the{' '},
                                <a href="/terms" className="text-orange-500 hover:underline">Terms and Conditions</a>
                            </Label>
                        </div>
                        {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>}
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
                    >
                        {isSubmitting ? '...'  : 'Register'}
                    </Button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{' '}
                    <a href="/login" className="text-orange-500 hover:underline">Log in</a>
                </p>
            </div>
        </div>
    );
}