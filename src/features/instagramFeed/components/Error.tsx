interface ErrorProps {
  code: string;
}

export default function Error({ code }: ErrorProps) {
  let errorMessage = '';

  switch (code) {
    case 'FETCH_FEED_NOT_FOUND':
      errorMessage = 'This feed does not exist or has been removed';
      break;
    case 'FETCH_FEED_SETTINGS_FAILED':
    case 'FETCH_FEED_INVALID_DATA':
    case 'FETCH_FEED_MEDIA_FAILED':
    default:
      errorMessage = 'Error loading feed';
      break;
  }

  return <p className="rounded-md bg-pampas p-5 text-center">{errorMessage}</p>;
}
