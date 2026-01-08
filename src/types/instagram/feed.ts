export interface FeedSettings {
  layout: {
    gap: number;
    aspectRatio: string;
    mobilePosts: number;
    tabletPosts: number;
    desktopPosts: number;
    mobileColumns: number;
    tabletColumns: number;
    desktopColumns: number;
  };
  button: {
    enabled: boolean;
    link?: string;
    text?: string;
  };
}

export interface FeedMedia {
  id: string;
  media: {
    storage_path: string;
    alt_text?: string;
  };
}
