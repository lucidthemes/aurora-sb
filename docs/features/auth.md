# Auth

## Overview

The auth feature is used for auth checking, login, register, lost password, and reset password

## Source

- [View on GitHub](https://github.com/lucidthemes/aurora-sb/tree/main/src/features/auth)

## Responsibilities

### Auth checking

- Check user is authenticated
- Redirect to the login page if they aren't

### Login

- Display a form with email and password fields
- Validate submitted form data on form submission
- If successful sign in, redirect the user to the account dashboard
- If unsuccessful sign in, show an error message to the user

### Register

- Display a form with email, password, and confirm password fields
- Validate submitted form data on form submission
- If successful, redirect the user to the account dashboard
- If unsuccessful, show an error message to the user

### Lost password

- Display a form with an email field
- Validate submitted form data on form submission
- Create reset Supabase auth password event

### Reset password

- Display a form with a password field
- Validate submitted form data on form submission
- Create update user Supabase event with new password

## Structure

The feature contains the following files:

- **loginForm** - used to display the login form
- **lostPasswordForm** - used to display the lost password form
- **registerForm** - used to display the register form
- **requireAuth** - used to check if the user is authenticated
- **resetPasswordForm** - used to display the reset password form

The feature also contains the following folders:

### Hooks

- **useLoginForm** - the login form hook using React Hook Form
- **useLostPasswordForm** - the lost password form hook using React Hook Form
- **useRegisterForm** - the register form hook using React Hook Form
- **useResetPasswordForm** - the reset password form hook using React Hook Form

### Schemas

- **login** - the schema used for the login form fields
- **lostPassword** - the schema used for the lost password form field
- **register** - the schema used for the register form fields
- **resetPassword** - the schema used for the reset password form field

### Server

- **lostPassword** - used to submit a Supabase reset password event
- **resetPassword** - used to update the user's password in Supabase
- **signIn** - used to sign the user in using Supabase
- **signUp** - used to register a new user in Supabase
