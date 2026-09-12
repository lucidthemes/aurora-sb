import DOMPurify from 'dompurify';

const RICH_TEXT_ALLOWED_TAGS = ['strong', 'i', 'a', 'u', 's'];

export function sanitizeBlockContent({ value }: { value: string }) {
  return DOMPurify.sanitize(String(value), {
    ALLOWED_TAGS: RICH_TEXT_ALLOWED_TAGS,
  });
}
