# Product list

## Overview

The product list feature is used to output the product list and product taxonomy lists

## Source

- [View on GitHub](https://github.com/lucidthemes/aurora-sb/tree/main/src/features/product/productList)

## Responsibilities

- Display a list of products
- Provide filtering to allow users to filter products by attributes
- Provide sort by to allow users to change list sorting
- Provide pagination to allow users to view more products
- Accept optional props of category and tag to allow for filtering of products within the query

## Structure

### Components

- **filters** - used to display the product list filters
- **items** - used to display the product list items
- **pagination** - used to display the product list pagination

### Hooks

- **filters** - used to fetch the product list filters
- **usePagination** - used for product list pagination
- **useProductList** - used to fetch the product list
- **useSort** - used for product list sorting
