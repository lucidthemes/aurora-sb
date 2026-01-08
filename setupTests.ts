import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('@lib/supabase/client', () => ({
  supabase: {
    storage: {
      from: vi.fn(() => ({
        getPublicUrl: vi.fn().mockReturnValue({ data: { publicUrl: 'https://example.com/test.jpg' } }),
      })),
    },
  },
}));
