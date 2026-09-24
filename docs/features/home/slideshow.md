# Home - slideshow

## Overview

The home slideshow feature displays a series of blog posts in a slideshow

## Source

- [View on GitHub](https://github.com/lucidthemes/aurora-sb/tree/main/src/features/home/slideshow)

## Responsibilities

- Fetch all posts or a category of posts using an optional category prop
- Display the posts within a slideshow
- Allow the user to switch between slides using the next and previous buttons
- Allow the user to switch between slides using the navigation dots

## Structure

The feature contains the following files:

- **components** - used to display the slide, content, navigation, and dots components
- **hooks** - used to fetch the slideshow posts from Supabase and for the embla carousel
- **slideshow** - used to display the slideshow component
- **getSlideshow** - fetches the slideshow posts from Supabase
- **slideshow.schema** - used when fetching the slideshow posts to parse data
