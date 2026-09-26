# Newsletter form

## Overview

The newsletter form feature is used to output a newsletter form

## Source

- [View on GitHub](https://github.com/lucidthemes/aurora-sb/tree/main/src/features/newsletterForm)

## Responsibilities

- Display the newsletter form fields
- Validate submitted form data on form submission
- If successful, show a success notification to the user
- If unsuccessful, show an error message to the user

## Structure

The feature contains the following files:

- **newsletterForm** - used to display the newsletter form
- **createNewsletterSubscriber** - creates a new newsletter subscriber by inserting the email into Supabase
- **newsletter.schema** - the schema used for the form field
- **useNewsletterForm** - the form hook using React Hook Form
