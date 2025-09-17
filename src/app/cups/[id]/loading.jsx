import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Top section: Image + Details */}
      <div className="md:flex gap-8">
        
        {/* Image skeleton */}
        <div className="md:w-1/2">
          <Skeleton className="shimmer w-full h-80 rounded-xl" />
        </div>

        {/* Product details skeleton */}
        <div className="md:w-1/2 space-y-4">
          <Skeleton className="shimmer h-8 w-3/4" /> {/* title */}
          <Skeleton className="shimmer h-4 w-1/2" /> {/* brand */}
          
          <div className="flex gap-3">
            <Skeleton className="shimmer h-6 w-16" />
            <Skeleton className="shimmer h-6 w-20" />
          </div>

          <Skeleton className="shimmer h-10 w-32" /> {/* price */}

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Skeleton className="shimmer h-10 w-full" />
            <Skeleton className="shimmer h-10 w-full" />
          </div>

          <div className="flex gap-4 mt-6">
            <Skeleton className="shimmer h-10 w-24" />
            <Skeleton className="shimmer h-10 w-24" />
          </div>
        </div>
      </div>

      {/* Tabs skeleton */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <Skeleton className="shimmer h-8 w-20" />
          <Skeleton className="shimmer h-8 w-20" />
          <Skeleton className="shimmer h-8 w-20" />
        </div>
        <Skeleton className="shimmer h-24 w-full" />
      </div>

      {/* Related products */}
      <div>
        <Skeleton className="shimmer h-6 w-40 mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-40 w-full rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  )
}
