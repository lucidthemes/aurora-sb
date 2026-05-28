export default function SinglePageLoading() {
  return (
    <div className="flex flex-col gap-y-10">
      <div className="h-12 w-full animate-pulse rounded-md bg-white"></div>
      <div className="flex flex-col gap-y-6">
        <div className="h-41 w-full animate-pulse rounded-md bg-white"></div>
        <div className="h-41 w-full animate-pulse rounded-md bg-white"></div>
        <div className="h-25 w-full animate-pulse rounded-md bg-white"></div>
      </div>
    </div>
  );
}
