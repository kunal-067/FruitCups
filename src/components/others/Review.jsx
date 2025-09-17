'use client'
import { POST_REVIEW } from '@/lib/ApiRoutes';
import axios from 'axios';
import { Star } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'sonner';
import { Button } from '../ui/button';

function WriteReview() {
    const [newReviewName, setNewReviewName] = useState('');
    const [newReviewRating, setNewReviewRating] = useState(5);
    const [newReviewText, setNewReviewText] = useState('');

    async function submitReview() {
        try {
            const res = await axios.post(POST_REVIEW, { userName: newReviewName, rating: newReviewRating, comment: newReviewText }, { withCredentials: true });
            toast(res.data?.message)
        } catch (error) {
            console.log(error)
            toast(res.response?.data?.message || 'something went wrong !')
        }
    }
    return (
        <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">Write a review</h4>
            <div className="grid gap-2">
                <input value={newReviewName} onChange={(e) => setNewReviewName(e.target.value)} placeholder="Your name" className="border rounded-md px-3 py-2" />
                <div className="flex items-center gap-2">
                    <div className="text-sm">Your rating:</div>
                    <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => {
                            const v = i + 1;
                            return (
                                <button key={i} onClick={() => setNewReviewRating(v)} className={v <= newReviewRating ? "text-yellow-500" : "text-gray-300"}>
                                    <Star />
                                </button>
                            );
                        })}
                    </div>
                </div>
                <textarea value={newReviewText} onChange={(e) => setNewReviewText(e.target.value)} rows={4} placeholder="Share your experience" className="border rounded-md p-2" />
                <div className="flex justify-end">
                    <Button onClick={submitReview}>Submit Review</Button>
                </div>
            </div>
        </div>
    )
}

export default WriteReview