# Blog post

## Overview

The blog post feature is used to output the single post components

## Source

- [View on GitHub](https://github.com/lucidthemes/aurora-sb/tree/main/src/features/blog/blogPost)

## Responsibilities

- Display the components that form the single blog post, including the newsletter, tags, share, author, navigation, related, and comments
- Allow users to sign up for the newsletter using the form
- Allow users to navigate to other blog posts using the next/previous navigation
- Allow users to comment on blog posts

## Structure

### Components

- **author** - used to display the post author section
- **comments** - used to display the post comments section
- **header** - used to display the post header section
- **navigation** - used to display the post navigation section
- **newsletter** - used to display the post newsletter form section
- **related** - used to display the post related posts section
- **share** - used to display the post social share section
- **tags** - used to display the post tags section

### Schemas

- **author** - used for the post author
- **category** - used for the post category
- **comment** - used for the post comments
- **options** - used for the post options
- **post** - used for the post
- **related** - used for the post related posts
- **tags** - used for the post tags

### Server

- **getPost** - fetches the post from Supabase
