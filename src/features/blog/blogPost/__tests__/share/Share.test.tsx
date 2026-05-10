import { render, screen } from '@testing-library/react';

import BlogPostShare from '../../components/share';

describe('BlogPostShare component', () => {
  test('renders Facebook share icon', () => {
    render(<BlogPostShare />);

    expect(screen.getByRole('link', { name: /share on facebook/i })).toBeInTheDocument();
  });

  test('renders X share icon', () => {
    render(<BlogPostShare />);

    expect(screen.getByRole('link', { name: /share on x/i })).toBeInTheDocument();
  });

  test('renders Pinterest share icon', () => {
    render(<BlogPostShare />);

    expect(screen.getByRole('link', { name: /share on pinterest/i })).toBeInTheDocument();
  });

  test('renders Linkedin share icon', () => {
    render(<BlogPostShare />);

    expect(screen.getByRole('link', { name: /share on linkedin/i })).toBeInTheDocument();
  });
});
