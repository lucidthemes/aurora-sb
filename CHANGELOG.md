# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - [Unreleased]

### Added

#### Root

- React hook form dependency
- Zod react hook form resolver dependency

#### Account

- details name component
- details name hook
- details name form component
- details name form hook
- details password component
- details password hook
- details password form component
- details password form hook

#### Auth

- reset password form component
- reset password form hook

#### Pages

- reset password

#### Routes

- reset password

#### Schemas

- auth sub folder
- login form
- register form
- lost password form
- reset password form
- account sub folder
- details email form
- details name form
- details password form
- address form

#### Server

- auth sub folder
- sign up using supabase auth
- sign in using supabase auth
- lost password using supabase auth
- reset password using supabase auth
- update email using supabase auth
- update password using supabase auth
- update name using supabase
- update address using supabase

#### Supabase

- add user roles table migration
- add user role trigger migration
- add customers table migration
- add customer trigger migration

#### Types

- forms sub folder
- notification

### Changed

#### Contexts

- auth context to work with supabase

#### Features

##### Account

- nav log out link to use supabase auth signout
- dashboard log out link to use supabase auth signout
- dashboard hello message to use supabase auth email
- details email form component to use react hook form
- details email form hook to use react hook form
- address form component to use react hook form
- address form hook to use react hook form

##### Auth

- login form component to use react hook form
- login form hook to use react hook form
- login form hook to use tanstack query
- register form component to use react hook form
- register form hook to use react hook form
- register form hook to use tanstack query
- lost password form component to use react hook form
- lost password form hook to use react hook form
- lost password form hook to use tanstack query
- require auth to use supabase auth user

#### Services

- added user id to create log event

#### Supabase

- added user id to log event edge function

#### Pages

- login to use supabase auth user
- lost password to use supabase auth user

## [0.1.1] - 2026-01-14

### Changed

- updated dependencies

## [0.1.0] - 2026-01-13

### Added

#### Root

- Supabase JS library dependency
- TanStack Query dependency

#### Lib

- lib folder to src
- Supabase client file to lib folder

### Changed

#### Contexts

- wrap providers in AppProviders with TanStack Query client provider

#### Schemas

- instagram feed schema to include settings and media schemas

#### Server

- instagram getFeed to fetch data from Supabase

#### Types

- instagram feed type to include settings and media types

### Fixed

#### Cart

- quantity button icons not being centred on mobile

#### ProductPost

- add to cart quantity button icons not being centred on mobile
- add to cart notification button not being below text on mobile
- tab buttons not spanning full width on mobile

### Removed

#### Root

- eslint config section for JS/JSX files

#### Footer

- footer instagram props that are no longer needed

#### Widgets

- instagram widget props that are no longer needed

## [0.0.0] - 2026-01-02

- initial setup
