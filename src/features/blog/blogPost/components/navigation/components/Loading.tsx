export default function BlogPostNavigationLoading() {
  return (
    <div className="flex justify-between">
      <div className="flex basis-full flex-col items-start gap-y-1">
        <div className="h-7.5 w-full max-w-25 animate-pulse rounded-md bg-white"></div>
        <div className="h-10 w-full max-w-50 animate-pulse rounded-md bg-white"></div>
      </div>
      <div className="flex basis-full flex-col items-end gap-y-1">
        <div className="h-7.5 w-full max-w-25 animate-pulse rounded-md bg-white"></div>
        <div className="h-10 w-full max-w-50 animate-pulse rounded-md bg-white"></div>
      </div>
    </div>
  );
}
