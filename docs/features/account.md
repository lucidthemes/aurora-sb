# Account

## Overview

The account feature is used to output the account dashboard sections

## Source

- [View on GitHub](https://github.com/lucidthemes/aurora-sb/tree/main/src/features/account)

## Responsibilities

- Display the account dashboard with orders, addresses, and details sections
- Allow a user to view their past orders
- Allow a user to update their shipping address, billing address, email address, name, and password

## Structure

### Components

- **addresses** - used to display the shipping and billing address forms
- **details** - used to display the details forms
- **orders** - used to display the orders list
- **dashboard** - used to display the account dashboard
- **nav** - used to display the dashboard nav

### Hooks

- **addresses** - the shipping and billing address form hook using React Hook Form
- **details** - the details forms hook using React Hook Form
- **orders** - used to fetch the orders

### Schemas

- **address** - the schema used for the address form
- **detailsEmail** - the schema used for the details email form
- **detailsName** - the schema used for the details name form
- **detailsPassword** - the schema used for the details password form

### Server

- **updateAddress** - update the user address in Supabase
- **updateEmail** - update the user email address in Supabase
- **updateName** - update the user name in Supabase
- **updatePassword** - update the user password in Supabase
