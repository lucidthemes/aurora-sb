import Button from '@components/UI/Button';
import { getPublicMediaUrl } from '@lib/supabase/storage';

import useInstagramFeed from './useInstagramFeed';
import InstagramFeedLoading from './components/Loading';

export default function InstagramFeed({ feedId }: { feedId: string }) {
  const { instagramFeedSettingsQuery, instagramFeedMediaQuery } = useInstagramFeed(feedId);

  if (instagramFeedSettingsQuery.isPending || instagramFeedMediaQuery.isPending) {
    return <InstagramFeedLoading />;
  }

  if (instagramFeedSettingsQuery.isError || !instagramFeedSettingsQuery.data || instagramFeedMediaQuery.isError || !instagramFeedMediaQuery.data) {
    return <p className="rounded-md bg-pampas p-5 text-center">Error loading feed</p>;
  }

  const feedLayout = instagramFeedSettingsQuery.data.layout;

  const feedColumnClasses = `grid-cols-${feedLayout.mobileColumns} md:grid-cols-${feedLayout.tabletColumns} lg:grid-cols-${feedLayout.desktopColumns}`;
  const feedGapClass = `gap-${feedLayout.gap}`;

  const feedImageAspectRatioClass =
    feedLayout.aspectRatio === 'square' ? 'aspect-square' : feedLayout.aspectRatio === 'portrait' ? 'aspect-[4/5]' : 'aspect-square';

  const feedMedia = instagramFeedMediaQuery.data;

  const feedButton = instagramFeedSettingsQuery.data.button;

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

        const publicMediaImageUrl = getPublicMediaUrl(feedMedia.media.storage_path);

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
