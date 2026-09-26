# Cart

## Overview

The cart feature is used to output the cart

## Source

- [View on GitHub](https://github.com/lucidthemes/aurora-sb/tree/main/src/features/cart)

## Responsibilities

- Display the list of items within the cart
- Display the cart totals
- Display an empty cart component if the cart is empty
- Allow the user to increase or decrease the quantity for an item in the cart
- Allow the user to remove an item from the cart
- Allow the user to apply a coupon using the form
- Allow the user to proceed to the checkout with a button

## Structure

The feature contains the following files:

- **cart** - used to display the cart
- **cartContext** - the cart context used to access the cart state within and outside the cart route
- **cartObjects** - used to create a new cart instance or a new cart item
- **cartReducer** - the cart functions used to add, update, and remove items from the cart

The feature also contains the following folders:

### Components

- **items** - used to display the cart items
- **total** - used to display the cart totals

### Hooks

- **items** - used for cart item quantity and remove actions
- **total** - the coupon form hook using React Hook Form
