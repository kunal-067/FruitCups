import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero Skeleton */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Skeleton className="shimmer h-64 w-full rounded-lg" />
      </div>

      {/* Popular Fruit Cups Skeleton */}
      <section id="menu" className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4 space-x-4">
          <Skeleton className="shimmer h-8 w-1/3" />
          <Skeleton className="shimmer h-6 w-1/6" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-48 w-full rounded-lg" />
          ))}
        </div>
      </section>

      {/* Customize Your Cup Skeleton */}
      <section id="customize" className="max-w-6xl mx-auto px-2 md:px-4 py-8">
        <Skeleton className="shimmer h-8 w-1/3 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-32 w-full rounded-lg" />
          ))}
        </div>
      </section>

      {/* Membership Banner Skeleton */}
      <section id="membership" className="max-w-6xl mx-auto px-4 py-6">
        <div className="rounded-xl bg-gradient-to-r from-amber-100 to-emerald-50 p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm">
          <div className="flex-1 space-y-4">
            <Skeleton className="shimmer h-6 w-1/2" />
            <Skeleton className="shimmer h-12 w-3/4" />
            <div className="flex gap-4">
              <Skeleton className="shimmer h-10 w-24" />
              <Skeleton className="shimmer h-10 w-24" />
            </div>
          </div>
          <Skeleton className="shimmer h-40 w-40 rounded-lg" />
        </div>
      </section>

      {/* Membership & Coins Skeleton */}
      <section id="wallet" className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="p-4">
              <CardHeader>
                <Skeleton className="shimmer h-4 w-1/3" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="shimmer h-6 w-1/2" />
                <Skeleton className="shimmer h-4 w-3/4" />
                <Skeleton className="shimmer h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Shakes & Juices Skeleton */}
      <section className="max-w-6xl mx-auto px-4 py-8 bg-slate-50 rounded-t-xl">
        <div className="flex items-center justify-between mb-4 space-x-4">
          <Skeleton className="shimmer h-8 w-1/3" />
          <Skeleton className="shimmer h-6 w-1/6" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-48 w-full rounded-lg" />
          ))}
        </div>
      </section>

      {/* Why Choose Us Skeleton */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <Skeleton className="shimmer h-8 w-1/3 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-32 w-full rounded-lg" />
          ))}
        </div>
      </section>

      {/* Testimonials Skeleton */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <Skeleton className="shimmer h-8 w-1/3 mb-4" />
        <div className="grid sm:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="p-4">
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <Skeleton className="shimmer h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="shimmer h-4 w-1/2" />
                    <Skeleton className="shimmer h-3 w-1/3" />
                  </div>
                </div>
                <Skeleton className="shimmer h-12 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Floating Track Order Button Skeleton */}
      <div className="fixed right-4 bottom-20 md:bottom-10">
        <Skeleton className="shimmer h-12 w-12 rounded-full" />
      </div>
    </div>
  );
}