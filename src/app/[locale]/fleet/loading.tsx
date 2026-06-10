export default function FleetLoading() {
  return (
    <div className="container mx-auto px-4 py-12 pt-32 max-w-[1440px]">
      <div className="animate-pulse space-y-8">
        {/* Header Skeleton */}
        <div className="flex flex-col items-center justify-center space-y-4 mb-12">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
          <div className="h-10 bg-gray-200 rounded w-64 md:w-96"></div>
          <div className="h-4 bg-gray-200 rounded w-full max-w-2xl"></div>
        </div>

        {/* Filters Skeleton */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 bg-gray-200 rounded-full w-24"></div>
          ))}
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
              <div className="h-48 bg-gray-200 rounded-xl mb-4 w-full"></div>
              <div className="space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="flex justify-between pt-4">
                  <div className="h-8 bg-gray-200 rounded w-20"></div>
                  <div className="h-8 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
