export default function BlogListTaxonomyError({ taxonomy }: { taxonomy: string }) {
  return <p className="rounded-sm bg-white p-5 text-center">{taxonomy} not found</p>;
}
