# Home - banner

## Overview

The home banner feature displays a specified post image and title

## Source

- [View on GitHub](https://github.com/lucidthemes/aurora-sb/tree/main/src/features/home/banner)

## Responsibilities

- Fetch a post specified by a slug
- Display the post image and title within a banner

## Structure

The feature contains the following files:

- **components** - used to display the banner content and banner layouts of overlay and split
- **banner** - used to display the banner component
- **banner.schema** - used when fetching the banner post to parse data
- **getBanner** - fetches the banner post from Supabase
- **useBanner** - used to fetch the banner post from Supabase
