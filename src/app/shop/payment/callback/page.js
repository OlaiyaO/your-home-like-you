import Link from 'next/link';
import { AlertTriangle, ArrowRight, CheckCircle2, Clock3 } from 'lucide-react';

import { PaymentComplete } from '@/components/PaymentComplete';
import { PageShell } from '@/components/PageShell';
import { formatNaira } from '@/data/shopProducts';
import { verifyPaystack } from '@/lib/paystack';

export const metadata = { title: 'Payment Status' };
export const dynamic = 'force-dynamic';

export default async function PaymentCallbackPage({ searchParams }) {
  const params = await searchParams;
  const reference = typeof params.reference === 'string' ? params.reference : '';
  let result = { state: 'invalid' };

  if (!process.env.PAYSTACK_SECRET_KEY) {
    result = { state: 'configuration' };
  } else if (reference) {
    try {
      const verification = await verifyPaystack(reference);
      result = verification.verified
        ? {
            state: 'success',
            amountKobo: verification.order.amountKobo,
            itemCount: verification.order.items.reduce((sum, item) => sum + item.quantity, 0),
          }
        : { state: 'not-complete' };
    } catch (error) {
      if (!['INVALID_REFERENCE', 'PAYSTACK_NOT_CONFIGURED'].includes(error.message)) {
        console.error('Paystack verification failed:', error.message);
      }
      result = { state: 'invalid' };
    }
  }

  const content = {
    success: {
      icon: CheckCircle2,
      eyebrow: 'Payment verified',
      title: 'Your booking is confirmed.',
      body: `Paystack confirmed ${formatNaira(result.amountKobo)} for ${result.itemCount} ${result.itemCount === 1 ? 'item' : 'items'}. Our team will use your submitted details to arrange the next step.`,
    },
    'not-complete': {
      icon: Clock3,
      eyebrow: 'Payment not complete',
      title: 'No confirmed payment yet.',
      body: 'Paystack did not return a successful transaction. If you completed payment, contact us with the reference below before trying again.',
    },
    configuration: {
      icon: AlertTriangle,
      eyebrow: 'Configuration pending',
      title: 'Verification is not configured.',
      body: 'The Paystack secret key is not available, so this transaction cannot be verified on the server yet.',
    },
    invalid: {
      icon: AlertTriangle,
      eyebrow: 'Unable to verify',
      title: 'We could not confirm this transaction.',
      body: 'The payment reference is missing, invalid or temporarily unavailable. Do not make another payment until you confirm the status with our team.',
    },
  }[result.state];
  const Icon = content.icon;

  return (
    <PageShell>
      <section className="dossier-grid-dark bg-ivory px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-3xl border border-black/12 bg-paper p-7 text-center shadow-[0_24px_70px_rgba(24,21,18,0.1)] md:p-14">
          <Icon
            className={`mx-auto size-12 ${result.state === 'success' ? 'text-red' : 'text-amber-700'}`}
          />
          <p className="eyebrow mt-7 text-red">{content.eyebrow}</p>
          <h1 className="mt-4 font-display text-5xl leading-tight md:text-7xl">{content.title}</h1>
          <p className="mx-auto mt-6 max-w-xl leading-7 text-ink/60">{content.body}</p>
          {reference && (
            <p className="mx-auto mt-7 max-w-full overflow-hidden text-ellipsis border border-black/10 bg-ivory px-4 py-3 font-mono text-xs text-ink/60">
              Reference: {reference}
            </p>
          )}
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={result.state === 'success' ? '/' : '/shop/checkout'}
              className="button-primary"
            >
              {result.state === 'success' ? 'Return home' : 'Return to checkout'}
              <ArrowRight className="size-4" />
            </Link>
            <Link href="/contact" className="button-secondary">
              Contact the team
            </Link>
          </div>
          {result.state === 'success' && <PaymentComplete />}
        </div>
      </section>
    </PageShell>
  );
}
