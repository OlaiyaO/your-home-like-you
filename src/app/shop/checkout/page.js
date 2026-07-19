import { CheckoutForm } from '@/components/CheckoutForm';
import { InnerHero } from '@/components/InnerHero';
import { PageShell } from '@/components/PageShell';
import { shopProducts } from '@/data/shopProducts';

export const metadata = { title: 'Confirm Checkout' };

export default function CheckoutPage() {
  return (
    <PageShell>
      <InnerHero
        eyebrow="Checkout confirmation"
        title="Check every detail before payment."
        body="Confirm your selection and contact details. You will then continue to Paystack's secure hosted checkout."
        marker="Step 1 of 2 / no charge yet"
      />
      <CheckoutForm
        products={shopProducts}
        paystackConfigured={Boolean(process.env.PAYSTACK_SECRET_KEY)}
      />
    </PageShell>
  );
}
