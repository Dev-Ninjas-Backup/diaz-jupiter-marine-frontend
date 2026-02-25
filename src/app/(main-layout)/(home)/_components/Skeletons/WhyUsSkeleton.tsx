const WhyUsSkeleton = () => (
  <section className="py-16 md:py-20">
    <div className="container mx-auto px-2 md:px-4">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-5 md:gap-20 lg:gap-16">
        <div className="space-y-6 w-full lg:w-1/2">
          <div className="h-4 w-16 bg-gray-200 animate-pulse rounded" />
          <div className="space-y-2">
            <div className="h-10 w-3/4 bg-gray-200 animate-pulse rounded-lg" />
            <div className="h-10 w-1/2 bg-gray-200 animate-pulse rounded-lg" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
            <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
            <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-1">
                <div className="h-5 w-20 bg-gray-200 animate-pulse rounded" />
                <div className="h-4 w-28 bg-gray-200 animate-pulse rounded" />
              </div>
            ))}
          </div>
          <div className="h-11 w-36 bg-gray-200 animate-pulse rounded-lg" />
        </div>
        <div className="relative flex items-center justify-center h-[250px] sm:h-[320px] md:h-[350px] lg:h-[400px] xl:h-[450px] w-full lg:w-1/2">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[45%] aspect-[4.7/5] rounded-3xl bg-gray-200 animate-pulse z-10" />
          <div className="absolute left-1/2 lg:top-0 -translate-x-1/2 w-[55%] aspect-[4.8/5] rounded-3xl bg-gray-300 animate-pulse z-30" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[45%] aspect-[4.7/5] rounded-3xl bg-gray-200 animate-pulse z-50" />
        </div>
      </div>
    </div>
  </section>
);

export default WhyUsSkeleton;
