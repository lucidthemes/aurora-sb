interface ErrorProps {
  message: string;
}

export default function Error({ message }: ErrorProps) {
  return <p className="rounded-md bg-pampas p-5 text-center">Error: {message}</p>;
}
