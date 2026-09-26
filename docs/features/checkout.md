# Checkout

## Overview

The checkout feature is used to output the checkout and the order received

## Source

- [View on GitHub](https://github.com/lucidthemes/aurora-sb/tree/main/src/features/checkout)

## Responsibilities

### Checkout

- Display the checkout form fields
- Display the order summary
- Allow the user to enter their email address
- Allow the user to enter their address
- Allow the user to select a shipping option
- Allow the user to select a payment option
- Allow the user to enter notes
- Allow the user to apply a coupon using the form
- Validate submitted form data on form submission
- If successful, create a new order and redirect to the order received route
- If unsuccessful, show an error message to the user

### Order received

- Display the order information
- Display the shipping address
- Display the billing address

## Structure

The feature contains the following files:

- **checkout** - used to display the checkout

The feature also contains the following folders:

### Components

- **form** - used to display the checkout form fields
- **orderReceived** - used to display the checkout order received route
- **summary** - used to display the checkout order summary

### Hooks

- **form** - used for the form hook using React Hook Form, fetching the shipping options, and fetching the payment options
- **orderReceived** - used to fetch the order
- **useCheckout** - used for the checkout form state
