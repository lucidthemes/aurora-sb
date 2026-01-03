interface LoadingProps {
  desktopPosts: number;
  tabletPosts: number;
  mobilePosts: number;
  feedColumnClasses: string;
  feedGapClass: string;
  feedImageAspectRatioClass: string;
}

export default function Loading({ desktopPosts, tabletPosts, mobilePosts, feedColumnClasses, feedGapClass, feedImageAspectRatioClass }: LoadingProps) {
  return (
    <ul className={`grid ${feedColumnClasses} ${feedGapClass} relative`}>
      {[...Array(desktopPosts)].map((_, index) => {
        let visibilityClasses = '';

        if (index < mobilePosts) {
          visibilityClasses = 'block';
        } else if (index < tabletPosts) {
          visibilityClasses = 'hidden md:block';
        } else if (index < desktopPosts) {
          visibilityClasses = 'hidden lg:block';
        }
        return (
          <li key={index} className={visibilityClasses}>
            <div className={`h-full w-full max-w-full ${feedImageAspectRatioClass} animate-pulse rounded-md bg-pampas`}></div>
          </li>
        );
      })}
    </ul>
  );
}
