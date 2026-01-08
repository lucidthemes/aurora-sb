import Container from '@components/Layout/Container';
import InstagramFeed from '@features/instagramFeed';

export default function FooterInstagram() {
  return (
    <div className="bg-spring-wood py-10">
      <Container width="wide">
        <InstagramFeed feedId="491b660b-3ed1-4281-b53b-b93d06231205" />
      </Container>
    </div>
  );
}
