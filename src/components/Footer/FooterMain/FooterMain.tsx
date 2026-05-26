import Container from '@components/Layout/Container';
import Sidebar from '@features/sidebar';

export default function FooterMain() {
  return (
    <div className="bg-pampas py-10">
      <Container>
        <div className="grid grid-cols-1 gap-x-7.5 gap-y-10 md:grid-cols-3">
          <Sidebar name="footer-1" aside={false} />
          <Sidebar name="footer-2" aside={false} />
          <Sidebar name="footer-3" aside={false} />
        </div>
      </Container>
    </div>
  );
}
