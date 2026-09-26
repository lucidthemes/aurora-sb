# Architecture

## Frontend

The app is built using the following:

- **React** - library used for the app
- **TypeScript** - the primary language used
- **Tailwind CSS** - the CSS framework used
- **TanStack Query (React query)** - library used for client component data fetching
- **Zod** - the validation library used to create schemas and types
- **React Hook Form** - library used for forms
- **Embla Carousel** - library used for slideshows

## Database

The app uses a Postgres database that is hosted on [Supabase](https://supabase.com/database)

The docs for the app database structure can be found [here](https://github.com/lucidthemes/aurora-sb/blob/main/docs/database.md)

## Authentication

The app uses [Supabase Auth](https://supabase.com/auth) for user authentication and sessions

The docs for the app authentication can be found [here](https://github.com/lucidthemes/aurora-sb/blob/main/docs/authentication.md)

## Storage

The app uses [Supabase storage](https://supabase.com/storage) for the storage of media - images and videos

## Data

### Fetching

Data is fetched within the app using TanStack query. Each data fetching query provided by TanStack query has a cache key which will show cached results if the same query is run again. TanStack query also provides the pagination used for the blog posts list.

### Updating

Data is updated primarily using TanStack query mutations. Most routes that have data which can be updated use forms provided by React Hook Form and when the submit button is clicked by the user, the data is passed through to a mutation function which then passes it to the relevant server function.

### Validation

Zod schemas are used to validate data both when it's fetched and created:

- **Fetching** - after data has been fetched from Supabase, it passes through a Zod schema to ensure that it correctly matches the expected structure. If it doesn't pass the schema parse, an error will be returned.
- **Creating** - when data is created, such as a new comment or signing up to the newsletter, the data is first parsed through a Zod schema to ensure that it validates correctly. If the schema parse doesn't succeed, the function is stopped and an error is returned.
