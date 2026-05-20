import { useSearchParams } from 'react-router-dom';

import Container from '@components/Layout/Container';
import Button from '@components/UI/Button';

export default function NotFound() {
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get('returnto');

  let returnFromPage = 'page';
  let returnToPage = 'home';
  let returnToLink = '/';

  if (returnTo) {
    switch (returnTo) {
      case 'blog':
        returnFromPage = 'post';
        returnToPage = 'blog';
        returnToLink = '/blog';
        break;
      case 'shop':
        returnFromPage = 'product';
        returnToPage = 'shop';
        returnToLink = '/shop';
        break;
      default:
        break;
    }
  }

  return (
    <Container>
      <div className="flex flex-col items-center gap-y-4 rounded-sm bg-white px-8 py-15 md:px-10 md:py-20 lg:px-12 lg:py-25">
        <h1>
          <span className="capitalize">{returnFromPage}</span> not found
        </h1>
        <p>Sorry, but we cannot find the {returnFromPage} you were looking for.</p>
        <Button className="max-w-fit" to={returnToLink}>
          Return to {returnToPage}
        </Button>
      </div>
    </Container>
  );
}
