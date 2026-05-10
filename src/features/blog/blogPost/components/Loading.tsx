export default function BlogPostLoading() {
  return (
    <div className="flex flex-col gap-y-10">
      <div className="h-125 w-full animate-pulse rounded-md bg-white"></div>
      <div className="flex flex-col items-center gap-y-4">
        <div className="h-3 w-32 animate-pulse rounded-md bg-white"></div>
        <div className="h-12 w-65 animate-pulse rounded-md bg-white"></div>
        <div className="h-3 w-72 animate-pulse rounded-md bg-white"></div>
      </div>
      <div className="flex flex-col gap-y-7">
        <div className="h-40 w-full animate-pulse rounded-md bg-white"></div>
        <div className="h-25 w-full animate-pulse rounded-md bg-white"></div>
      </div>
    </div>
  );
}
