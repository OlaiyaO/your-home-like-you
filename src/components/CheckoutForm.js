'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, LockKeyhole, Minus, Plus, ShieldCheck } from 'lucide-react';

import { formatNaira } from '@/data/shopProducts';
import { updateCartQuantity, useCart } from '@/lib/cart';

export function CheckoutForm({ products, paystackConfigured }) {
  const cart = useCart();
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const productMap = new Map(products.map((product) => [product.id, product]));
  const lines = cart.flatMap((item) => {
    const product = productMap.get(item.id);
    return product ? [{ ...item, product }] : [];
  });
  const totalKobo = lines.reduce(
    (total, item) => total + item.product.priceKobo * item.quantity,
    0,
  );

  async function handleSubmit(event) {
    event.preventDefault();
    setPending(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    const policyAccepted = formData.get('policyAccepted') === 'on';
    formData.delete('policyAccepted');
    const customer = Object.fromEntries(formData);

    try {
      const response = await fetch('/api/payments/paystack/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer,
          cart: lines.map(({ id, quantity }) => ({ id, quantity })),
          policyAccepted,
        }),
      });
      const payload = await response.json();

      if (!response.ok || !payload.authorizationUrl) {
        throw new Error(payload.error || 'Payment could not be started. Please try again.');
      }

      window.location.assign(payload.authorizationUrl);
    } catch (submissionError) {
      setError(submissionError.message);
      setPending(false);
    }
  }

  if (lines.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-20 text-center md:px-10 md:py-28">
        <p className="eyebrow text-red">Nothing to confirm</p>
        <h2 className="mt-4 font-display text-5xl">Your cart is empty.</h2>
        <p className="mx-auto mt-5 max-w-lg leading-7 text-ink/55">
          Return to the shop to choose the service that best fits your property.
        </p>
        <Link href="/shop" className="button-primary mt-8">
          <ArrowLeft className="size-4" /> Back to the shop
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto grid max-w-[1240px] gap-10 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
      <form onSubmit={handleSubmit} className="border border-black/12 bg-paper p-6 md:p-10">
        <div className="flex items-center gap-3 border-b border-black/12 pb-6">
          <span className="grid size-10 place-items-center bg-red text-sm font-extrabold text-white">
            01
          </span>
          <div>
            <p className="eyebrow text-red">Customer details</p>
            <h2 className="mt-1 font-display text-3xl">Who are we preparing for?</h2>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <label className="field-label sm:col-span-2">
            Full name
            <input
              className="field"
              name="name"
              autoComplete="name"
              minLength="2"
              maxLength="100"
              required
            />
          </label>
          <label className="field-label">
            Email address
            <input
              className="field"
              name="email"
              type="email"
              autoComplete="email"
              maxLength="254"
              required
            />
          </label>
          <label className="field-label">
            Phone number
            <input
              className="field"
              name="phone"
              type="tel"
              autoComplete="tel"
              minLength="7"
              maxLength="20"
              required
            />
          </label>
          <label className="field-label sm:col-span-2">
            Property address
            <input
              className="field"
              name="address"
              autoComplete="street-address"
              minLength="5"
              maxLength="200"
              required
            />
          </label>
          <label className="field-label">
            City
            <input
              className="field"
              name="city"
              autoComplete="address-level2"
              minLength="2"
              maxLength="80"
              defaultValue="Abuja"
              required
            />
          </label>
          <label className="field-label">
            State
            <input
              className="field"
              name="state"
              autoComplete="address-level1"
              minLength="2"
              maxLength="80"
              defaultValue="FCT"
              required
            />
          </label>
        </div>

        <label className="mt-8 flex cursor-pointer items-start gap-3 border border-black/12 bg-ivory p-4 text-sm leading-6 text-ink/65 md:p-5">
          <input
            type="checkbox"
            name="policyAccepted"
            required
            className="mt-1 size-4 shrink-0 accent-red"
          />
          <span>
            I have read and accept the{' '}
            <Link
              href="/terms"
              target="_blank"
              className="font-bold text-red underline underline-offset-2"
            >
              service terms
            </Link>
            ,{' '}
            <Link
              href="/privacy"
              target="_blank"
              className="font-bold text-red underline underline-offset-2"
            >
              privacy notice
            </Link>{' '}
            and{' '}
            <Link
              href="/service-cancellation"
              target="_blank"
              className="font-bold text-red underline underline-offset-2"
            >
              service cancellation policy
            </Link>
            .
          </span>
        </label>

        {!paystackConfigured && (
          <div
            className="mt-8 border border-amber-700/25 bg-amber-50 p-5 text-sm leading-6 text-amber-950"
            role="status"
          >
            <strong>Online checkout is being configured.</strong> Your selection is saved on this
            device, but payment cannot begin until the Paystack test key is added.
          </div>
        )}

        {error && (
          <p className="mt-8 border border-red/25 bg-red/5 p-4 text-sm text-red-dark" role="alert">
            {error}
          </p>
        )}

        <div className="mt-8 flex flex-col-reverse gap-4 border-t border-black/12 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/shop" className="button-secondary">
            <ArrowLeft className="size-4" /> Edit selection
          </Link>
          <button
            type="submit"
            disabled={!paystackConfigured || pending}
            className="button-primary disabled:cursor-not-allowed disabled:opacity-45"
          >
            <LockKeyhole className="size-4" />
            {pending ? 'Connecting securely...' : 'Continue to Paystack'}
            {!pending && <ArrowRight className="size-4" />}
          </button>
        </div>
      </form>

      <aside className="border border-black/12 bg-ivory p-6 lg:sticky lg:top-28">
        <p className="eyebrow text-red">Order confirmation</p>
        <h2 className="mt-3 font-display text-3xl">Your selection</h2>
        <div className="mt-5 divide-y divide-black/10 border-y border-black/10">
          {lines.map(({ product, quantity }) => (
            <div key={product.id} className="py-5">
              <div className="flex justify-between gap-4">
                <div>
                  <p className="text-sm font-bold">{product.name}</p>
                  <p className="mt-1 text-xs text-ink/45">{product.unit}</p>
                </div>
                <p className="text-sm font-bold">{formatNaira(product.priceKobo * quantity)}</p>
              </div>
              <div className="mt-3 flex w-fit items-center border border-black/15 bg-paper">
                <button
                  type="button"
                  onClick={() => updateCartQuantity(product.id, quantity - 1)}
                  aria-label={`Decrease ${product.name} quantity`}
                  className="grid size-8 place-items-center"
                >
                  <Minus className="size-3" />
                </button>
                <span className="min-w-8 text-center text-xs font-bold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => updateCartQuantity(product.id, quantity + 1)}
                  disabled={quantity >= 5}
                  aria-label={`Increase ${product.name} quantity`}
                  className="grid size-8 place-items-center disabled:opacity-30"
                >
                  <Plus className="size-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-baseline justify-between pt-5">
          <span className="text-sm font-bold">Total</span>
          <span className="font-display text-3xl">{formatNaira(totalKobo)}</span>
        </div>
        <div className="mt-6 flex gap-3 border-t border-black/10 pt-5 text-xs leading-5 text-ink/50">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-red" />
          <p>
            The server confirms current prices before Paystack opens. Card details are never handled
            by this website.
          </p>
        </div>
      </aside>
    </section>
  );
}
