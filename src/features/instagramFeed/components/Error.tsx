interface ErrorProps {
  message: string;
}

export default function Error({ message }: ErrorProps) {
  let errorMessage = '';

  switch (message) {
    case 'FEED_NOT_FOUND':
      errorMessage = 'This feed does not exist or has been removed';
      break;
    case 'FETCH_FAILED':
    case 'INVALID_DATA':
    default:
      errorMessage = 'Error loading feed';
      break;
  }

  return <p className="rounded-md bg-pampas p-5 text-center">{errorMessage}</p>;
}
