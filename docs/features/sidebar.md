# Sidebar

## Overview

The sidebar feature is used to output a sidebar containing widgets

## Source

- [View on GitHub](https://github.com/lucidthemes/aurora-sb/tree/main/src/features/sidebar)

## Responsibilities

- Display the sidebar
- Display the widgets within the sidebar

## Structure

The feature contains the following files:

- **sidebar** - used to display the sidebar
- **getSidebar** - fetches the sidebar from Supabase
- **useSidebar** - used to fetch the sidebar from Supabase

The feature also contains the following folders:

### Components

- **error** - the error component if the sidebar can't be fetched
- **loading** - the loading component when fetching the sidebar
- **widgets** - renders the widgets within the sidebar

### Schemas

- **widgets** - the schemas used for each of the widgets
- **sidebar** - the schema used for the sidebar
