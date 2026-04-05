export default function InstagramFeedLoading() {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <li className="aspect-square w-full animate-pulse rounded-md bg-pampas md:max-h-60"></li>
      <li className="hidden aspect-square w-full animate-pulse rounded-md bg-pampas md:block md:max-h-60"></li>
      <li className="hidden aspect-square w-full animate-pulse rounded-md bg-pampas md:block md:max-h-60"></li>
    </ul>
  );
}
