export default function BlogListTaxonomyHeader({ heading, description }: { heading: string; description?: string }) {
  return (
    <header className="mb-10 flex flex-col gap-y-5">
      <h1>{heading}</h1>
      {description && <p>{description}</p>}
    </header>
  );
}
