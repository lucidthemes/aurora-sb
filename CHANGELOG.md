# Changelog

All notable changes to this project will be documented in this file.

## [0.6.0] - [Unreleased]

### Changed

#### Features

##### Account

- password update form to require current password

#### Schemas

##### Account

- move account schemas into features account folder

#### Server

##### Account

- move account server into features account folder

### Removed

#### Schemas

- account sub folder

#### Server

- account sub folder

## [0.5.0] - 2026-04-06

### Added

#### Supabase

- add media rls policies migration
- add media storage bucket upload rls policy migration
- add media storage bucket upload trigger migration
- add media storage bucket delete trigger migration
- add media storage bucket delete rls policy migration
- add media storage bucket select rls policy migration
- add instagram feeds insert rls policy migration
- add instagram feeds update rls policy migration
- add instagram feeds delete rls policy migration
- add instagram feed media insert rls policy migration
- add instagram feed media delete rls policy migration
- add customers select rls policy migration
- add logs select rls policy migration
- add customers list view migration
- add users list view migration
- add user roles update rls policy migration
- add user roles select rls policy migration
- add admin user check function migration
- add admin or editor check function migration

### Changed

#### Features

- instagram feed component to use updated supabase storage media public url function
- instagram feed to use loading skeleton

#### Lib

- supabase storage media public url to a generic function instead of specifically for images folder

#### Services

- moved create log event function file into lib/supabase
- removed fetch error
- removed services folder

#### Supabase

- logs select rls policy to allow admin users only migration
- is admin function search path to empty string migration
- customers rls policies to use admin or editor check function migration
- instagram feed media rls policies to use admin or editor check function migration
- instagram feeds rls policies to use admin or editor check function migration
- media rls policies to use admin or editor check function migration

### Fixed

#### Supabase

- handle new customer function mutable search path migration
- handle new user function mutable search path migration
- handle new storage object function mutable search path migration
- handle delete storage object function mutable search path migration

## [0.4.0] - 2026-03-01

### Added

#### Supabase

- add source column logs table migration
- add user role editor migration

### Changed

#### Features

##### Account

- move address form hook create log event call into server update address function
- move name hook create log event call into server update name function
- move email hook create log event call into server update email function
- move password hook create log event call into server update password function

##### Auth

- move login form hook create log event call into server sign in function
- move register form hook create log event call into server sign up function
- move lost password form hook create log event call into server lost password function
- move reset password form hook create log event call into server reset password function

#### Schemas

- shop customer fields to allow nullable
- login form password error message

#### Services

- create log event to use supabase function invoke

#### Supabase

- log event edge function to accept source value

### Removed

#### Schemas

- login form return schema
- register form return schema
- reset password form return schema

#### Server

- lost password supabase auth redirect

## [0.3.0] - 2026-02-24

### Added

#### Schemas

- contact sub folder
- contact form
- newsletter sub folder
- newsletter form
- search sub folder
- search form

#### Server

- create newsletter subscriber using supabase

#### Supabase

- add newsletter table migration

### Changed

#### Contact form

- contact form component to use react hook form
- contact form hook to use react hook form

#### Newsletter form

- newsletter form component to use react hook form
- newsletter form hook to use react hook form

#### Search form

- search form component to use react hook form
- search form hook to use react hook form

### Removed

#### Components

##### Header

- use search hook for overlay ref

#### Pages

- blog search page term prop from search form

## [0.2.2] - 2026-02-22

### Changed

- updated dependencies

## [0.2.1] - 2026-02-21

### Fixed

#### Services

- add apikey to create log event headers for auth
- add authorization bearer to create log event headers

#### Supabase

- set verify jwt to false for log event edge function

## [0.2.0] - 2026-02-21

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

#### Schemas

- shop customer fields

#### Server

- shop get customer to use supabase

#### Services

- added user id to create log event

#### Supabase

- added user id to log event edge function
- updated instagram feed media table unique constraint

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
