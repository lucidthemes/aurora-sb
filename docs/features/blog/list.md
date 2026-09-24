# Blog list

## Overview

The blog list feature is used to output the blog posts list and blog post taxonomy lists

## Source

- [View on GitHub](https://github.com/lucidthemes/aurora-sb/tree/main/src/features/blog/blogList)

## Responsibilities

- Display a list of blog posts
- Provide pagination to allow users to view more posts
- Accept optional props of category, tag, author, and search to allow for filtering of posts within the query
- Accept an optional prop of style to change the layout style of the post list

## Structure

### Components

- **item** - used to display the post list item
- **pagination** - used to display the post list pagination
- **taxonomy** - used to display taxonomy header

### Hooks

- **useBlogList** - used to fetch the posts list
- **useBlogListTaxonomy** - use to fetch the taxonomy information

### Schemas

- **posts** - used for the posts list
- **taxonomy** - used for the taxonomy information

### Server

- **getPosts** - fetches the list of posts from Supabase
- **getTaxonomy** - fetches the taxonomy information from Supabase
