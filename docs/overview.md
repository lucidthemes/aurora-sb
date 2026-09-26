# Documentation: Aurora

## Overview

A React conversion of our WordPress theme called [Aurora](https://www.lucid-themes.com/theme/aurora-wordpress-blog-shop-theme/) featuring pages, blog posts, products, orders, customers, media, sidebars, users, logs, and more. Designed to be used as the frontend for our Aurora dashboard project [here](https://github.com/lucidthemes/dashboard-aurora)

## Structure

### Public

The public folder contains fonts, icons, and images used for the header logo and favicon

### Src

The main src folder is split into the following folders:

#### Components

The components folder contains the following components:

- **Footer** - used for the footer
- **Form** - used for form input fields
- **Header** - used for the header
- **Layout** - used for page layout and container
- **Notification** - used for notifications
- **UI** - used for general UI components
- **Widgets** - used for sidebar widgets
- **[Content](https://github.com/lucidthemes/aurora-sb/blob/main/docs/components/content.md)** - used to render content blocks on the single page and single post

#### Contexts

The contexts folder contains the following contexts:

- **AppProviders** - used to combine the contexts into a single provider wrapper for the app
- **AuthContext** - used with Supabase auth to manage user sessions
- **HeaderLayoutContext** - used for the header layout to switch between different header styles
- **MobileMenuContext** - used for the header menu on mobile

#### Features

The documentation for each feature:

- [Account](https://github.com/lucidthemes/aurora-sb/blob/main/docs/features/account.md)
- [Auth](https://github.com/lucidthemes/aurora-sb/blob/main/docs/features/auth.md)
- [Blog](https://github.com/lucidthemes/aurora-sb/blob/main/docs/features/blog/overview.md)
- [Cart](https://github.com/lucidthemes/aurora-sb/blob/main/docs/features/cart.md)
- [Checkout](https://github.com/lucidthemes/aurora-sb/blob/main/docs/features/checkout.md)
- [Contact form](https://github.com/lucidthemes/aurora-sb/blob/main/docs/features/contact-form.md)
- [Home](https://github.com/lucidthemes/aurora-sb/blob/main/docs/features/home/overview.md)
- [Instagram feed](https://github.com/lucidthemes/aurora-sb/blob/main/docs/features/instagram-feed.md)
- [Newsletter form](https://github.com/lucidthemes/aurora-sb/blob/main/docs/features/newsletter-form.md)
- [Page](https://github.com/lucidthemes/aurora-sb/blob/main/docs/features/page.md)
- [Product](https://github.com/lucidthemes/aurora-sb/blob/main/docs/features/product/overview.md)
- [search-form](https://github.com/lucidthemes/aurora-sb/blob/main/docs/features/search-form.md)
- [Sidebar](https://github.com/lucidthemes/aurora-sb/blob/main/docs/features/sidebar.md)

#### Lib

The lib folder contains the following files:

- **client** - used to create the Supabase client
- **logEvent** - a Supabase edge function used for creating log events
- **storage** - used for fetching the Supabase public storage URL

#### Pages

The documentation for each page:

- [Account](https://github.com/lucidthemes/aurora-sb/blob/main/docs/pages/account.md)
- [Blog](https://github.com/lucidthemes/aurora-sb/blob/main/docs/pages/blog.md)
- [Cart](https://github.com/lucidthemes/aurora-sb/blob/main/docs/pages/cart.md)
- [Checkout](https://github.com/lucidthemes/aurora-sb/blob/main/docs/pages/checkout.md)
- [Home](https://github.com/lucidthemes/aurora-sb/blob/main/docs/pages/home.md)
- [Login](https://github.com/lucidthemes/aurora-sb/blob/main/docs/pages/login.md)
- [Lost password](https://github.com/lucidthemes/aurora-sb/blob/main/docs/pages/lost-password.md)
- [Not found](https://github.com/lucidthemes/aurora-sb/blob/main/docs/pages/not-found.md)
- [Order received](https://github.com/lucidthemes/aurora-sb/blob/main/docs/pages/order-received.md)
- [Reset password](https://github.com/lucidthemes/aurora-sb/blob/main/docs/pages/reset-password.md)
- [Shop](https://github.com/lucidthemes/aurora-sb/blob/main/docs/pages/shop.md)
- [Single page](https://github.com/lucidthemes/aurora-sb/blob/main/docs/pages/single-page.md)
- [Single post](https://github.com/lucidthemes/aurora-sb/blob/main/docs/pages/single-post.md)
- [Single product](https://github.com/lucidthemes/aurora-sb/blob/main/docs/pages/single-product.md)

#### Routes

The routes folder contains the following file:

- **AppRoutes** - used to define the app routes and the components they use

#### Schemas

The schemas folder contains the following Zod schemas:

- **Products** - used for the product list and single product
- **Shop** - used with shop components such as cart, checkout, and account
- **contentBlocks** - used with the content component to output content blocks

#### Server

The server folder contains the following files:

- **Products** - used to fetch data for the products list and single product
- **Shop** - used to fetch data within shop components such as cart, checkout, and account

#### Styles

The styles folder contains the following file:

- **main** - the styles used for the app

#### Types

The types folder contains the following files:

- **Cart** - used to type the cart
- **Checkout** - used to type the checkout
- **Forms** - used to type the form notification
- **Products** - used to type the products list and single product
- **Shop** - used to type the shop components such as cart, checkout, and account

#### Utils

The utils folder contains the following files:

- **Formatters** - date formatters
- **Validators** - email validator

### Supabase

The Supabase folder contains the following files:

- **functions** - used for the create log event
- **migrations** - used as the primary method to apply changes to the Supabase database
- **seed** - used with the Supabase CLI to reset the database and seed it with content

## Deployment

### Pull requests

Deploys to: [staging](https://aurora-sb-staging.vercel.app/)

Process:

1. Open pull request
2. Workflow: [CI (pull request)](https://github.com/lucidthemes/aurora-sb/blob/main/.github/workflows/ci-pr.yml)
   - Success - can proceed
   - Fail - can't proceed
3. Merge branch into main
4. Workflow: [Deploy to Staging](https://github.com/lucidthemes/aurora-sb/blob/main/.github/workflows/deploy-staging.yml)

### Releases

Deploys to: [production](https://aurora-sb.vercel.app/)

Process:

1. Create new tag for version of app
2. Open pull request
3. Workflow: [CI (pull request)](https://github.com/lucidthemes/aurora-sb/blob/main/.github/workflows/ci-pr.yml)
   - Success - can proceed
   - Fail - can't proceed
4. Merge branch into main
5. Create a new release from the tag
6. Publish the new release
7. Workflow: [Deploy to Production](https://github.com/lucidthemes/aurora-sb/blob/main/.github/workflows/deploy-production.yml)
