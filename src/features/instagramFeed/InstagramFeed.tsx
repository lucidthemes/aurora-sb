import Button from '@components/UI/Button';
import { getPublicMediaImageUrl } from '@lib/supabase/storage';

import useInstagramFeed from './useInstagramFeed';
import Loading from './components/Loading';
import Error from './components/Error';

interface InstagramFeedProps {
  feedId: string;
}

export default function InstagramFeed({ feedId }: InstagramFeedProps) {
  const { feedSettingsQuery, feedMediaQuery } = useInstagramFeed(feedId);

  if (feedSettingsQuery.isPending) {
    return <p className="rounded-md bg-pampas p-5 text-center">Loading feed...</p>;
  }

  if (feedSettingsQuery.isError && feedSettingsQuery.error) {
    return <Error message={feedSettingsQuery.error.message} />;
  }

  const feedLayout = feedSettingsQuery.data.layout;

  const feedColumnClasses = `grid-cols-${feedLayout.mobileColumns} md:grid-cols-${feedLayout.tabletColumns} lg:grid-cols-${feedLayout.desktopColumns}`;
  const feedGapClass = `gap-${feedLayout.gap}`;

  const feedImageAspectRatioClass =
    feedLayout.aspectRatio === 'square' ? 'aspect-square' : feedLayout.aspectRatio === 'portrait' ? 'aspect-[4/5]' : 'aspect-square';

  if (feedMediaQuery.isPending) {
    return (
      <Loading
        desktopPosts={feedLayout.desktopPosts}
        tabletPosts={feedLayout.tabletPosts}
        mobilePosts={feedLayout.mobilePosts}
        feedColumnClasses={feedColumnClasses}
        feedGapClass={feedGapClass}
        feedImageAspectRatioClass={feedImageAspectRatioClass}
      />
    );
  }

  if (feedMediaQuery.isError && feedMediaQuery.error) {
    return <Error message={feedMediaQuery.error.message} />;
  }

  const feedMedia = feedMediaQuery.data;

  const feedButton = feedSettingsQuery.data.button;

  return (
    <ul className={`grid ${feedColumnClasses} ${feedGapClass} relative`} aria-label="Instagram feed">
      {feedMedia.map((feedMedia, index) => {
        let visibilityClasses = '';

        if (index < feedLayout.mobilePosts) {
          visibilityClasses = 'block';
        } else if (index < feedLayout.tabletPosts) {
          visibilityClasses = 'hidden md:block';
        } else if (index < feedLayout.desktopPosts) {
          visibilityClasses = 'hidden lg:block';
        }

        const publicMediaImageUrl = getPublicMediaImageUrl(feedMedia.media.storage_path);

        return (
          <li key={feedMedia.id} className={visibilityClasses}>
            <img src={publicMediaImageUrl} alt={feedMedia.media.alt_text} className={`h-full w-full ${feedImageAspectRatioClass} rounded-md object-cover`} />
          </li>
        );
      })}
      {feedButton.enabled && (
        <Button to={feedButton.link} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          {feedButton.text}
        </Button>
      )}
    </ul>
  );
}
