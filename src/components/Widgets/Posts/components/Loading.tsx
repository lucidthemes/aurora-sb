export default function PostsWidgetLoading({ style, location }: { style?: 'small' | 'wide'; location?: 'sidebar' | 'footer' }) {
  const itemClasses = style === 'wide' ? 'flex-col gap-y-5' : 'flex-row gap-x-5';
  const imageWidthClass = style === 'small' ? 'basis-[40%]' : '';
  const imageHeightClass = style === 'wide' ? 'h-42' : 'h-25 ';
  const colorClass = location === 'sidebar' ? 'bg-pampas' : 'bg-spring-wood';
  const contentClass = style === 'small' ? 'basis-[60%]' : '';

  return (
    <div className="flex flex-col gap-y-8">
      <div className={`flex ${itemClasses}`}>
        <div className={`animate-pulse rounded-md ${imageWidthClass} ${imageHeightClass} ${colorClass}`}></div>
        <div className={`flex flex-col gap-y-4 ${contentClass}`}>
          <div className={`h-8 animate-pulse rounded-md ${colorClass}`}></div>
          <div className={`h-5 animate-pulse rounded-md ${colorClass}`}></div>
        </div>
      </div>
      <div className={`flex ${itemClasses}`}>
        <div className={`animate-pulse rounded-md ${imageWidthClass} ${imageHeightClass} ${colorClass}`}></div>
        <div className={`flex flex-col gap-y-4 ${contentClass}`}>
          <div className={`h-8 animate-pulse rounded-md ${colorClass}`}></div>
          <div className={`h-5 animate-pulse rounded-md ${colorClass}`}></div>
        </div>
      </div>
      {location === 'footer' && (
        <div className={`flex ${itemClasses}`}>
          <div className={`animate-pulse rounded-md ${imageWidthClass} ${imageHeightClass} ${colorClass}`}></div>
          <div className={`flex flex-col gap-y-4 ${contentClass}`}>
            <div className={`h-8 animate-pulse rounded-md ${colorClass}`}></div>
            <div className={`h-5 animate-pulse rounded-md ${colorClass}`}></div>
          </div>
        </div>
      )}
    </div>
  );
}
