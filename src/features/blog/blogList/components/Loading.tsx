export default function BlogListLoading({ style }: { style?: string }) {
  let listClasses = 'grid-cols-1';
  let wideClass = '';

  if (style === 'wide-grid-2' || style === 'wide-grid-3' || style === 'wide-grid-4') {
    listClasses += ' lg:grid-cols-2';
    wideClass = 'col-span-full';
  }

  if (style === 'grid-2' || style === 'grid-3' || style === 'grid-4') {
    listClasses += ' lg:grid-cols-3';
  }

  return (
    <div className="flex flex-col gap-y-10">
      <div className={`grid gap-10 ${listClasses}`}>
        <div className={`h-115 w-full animate-pulse rounded-md bg-white ${wideClass}`}></div>
        <div className="h-115 w-full animate-pulse rounded-md bg-white"></div>
        <div className="h-115 w-full animate-pulse rounded-md bg-white"></div>
      </div>
      <div className="flex justify-center gap-x-4">
        <div className="h-11 w-11 animate-pulse rounded-md bg-white"></div>
        <div className="h-11 w-11 animate-pulse rounded-md bg-white"></div>
        <div className="h-11 w-11 animate-pulse rounded-md bg-white"></div>
      </div>
    </div>
  );
}
