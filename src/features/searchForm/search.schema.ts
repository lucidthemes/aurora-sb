import { z } from 'zod';

export const SearchFormSchema = z.object({
  term: z.string().trim().min(1, 'Please enter a search term'),
});

export type SearchForm = z.infer<typeof SearchFormSchema>;
