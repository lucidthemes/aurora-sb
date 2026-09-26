# Product post

## Overview

The product post feature is used to output the single product components

## Source

- [View on GitHub](https://github.com/lucidthemes/aurora-sb/tree/main/src/features/product/productPost)

## Responsibilities

- Display the components that form the single product, including the breadcrumb, gallery, notification, related, summary, and tabs
- Allow users to add a product to the cart using the form
- Allow users to leave a review on a product

## Structure

The feature contains the following files:

- **productPost** - used to display the product post
- **useProductPost** - used for the product tabs
- **useSingleProduct** - used to fetch the product

The feature also contains the following folders:

### Breadcrumb

- **breadcrumb** - used to display the breadcrumbs
- **separator** - used to display the breadcrumb separator
- **useBreadcrumbs** - used to fetch the category for the product to use within the breadcrumbs

### Gallery

- **components** - used to display the product gallery slideshow and overlay components
- **hooks** - used for the product gallery slideshow and overlay
- **gallery** - used to display the product gallery section

### Notification

- **notification** - used to display the product notification after adding an item to the cart
- **useNotification** - used to control the product notification

### Related

- **item** - used to display the related item
- **related** - used to display the related products section
- **useRelated** - used to fetch the related products

### Summary

- **components** - used to display the product summary components and add to cart form
- **hooks** - used for the product summary data and add to cart form
- **summary** - used to display the product summary

### Tabs

- **components** - used to display the product tabs components of description and reviews
- **hooks** - used to fetch the product reviews list
- **tabs** - used to display the product tabs section
