import { InnerHero } from '@/components/InnerHero';
import { PageShell } from '@/components/PageShell';
import { ShopCatalogue } from '@/components/ShopCatalogue';
import { shopProducts } from '@/data/shopProducts';

export const metadata = {
  title: 'Shop Property Services',
  description:
    'Book fixed-scope interior, property inspection and property-care services in Abuja.',
};

export default function ShopPage() {
  return (
    <PageShell>
      <InnerHero
        eyebrow="The property shop"
        title="A clear first step for your space."
        body="Book defined consultations, inspections and service deposits at a fixed price. Larger works still begin with a tailored property brief."
        marker="Curated services / Abuja"
      />
      <ShopCatalogue products={shopProducts} />
    </PageShell>
  );
}
