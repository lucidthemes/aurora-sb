# Authentication

## Overview

The app uses Supabase auth to manage authentication and user sessions. Authentication is required to access the account section.

## Authentication flow

1. User navigates to the login page
2. Credentials are submitted
3. Supabase auth validates the credentials
4. A session is established
5. The user is redirected to the account section
6. Subsequent requests use the authenticated session

## User roles

The default user role assigned to a user when they sign up is customer. This grants the user the ability to log into their account.

## Route protection

The app has protected routes that are only accessible to users who have signed up and logged into their account. These routes include: account, orders, addresses, and details.
