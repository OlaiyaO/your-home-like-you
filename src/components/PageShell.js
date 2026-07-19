import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export function PageShell({ children }) {
  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
