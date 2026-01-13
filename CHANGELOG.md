# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - [Unreleased]

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
