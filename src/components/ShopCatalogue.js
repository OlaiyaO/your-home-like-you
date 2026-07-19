'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';

import { formatNaira } from '@/data/shopProducts';
import { addToCart, updateCartQuantity, useCart } from '@/lib/cart';

export function ShopCatalogue({ products }) {
  const cart = useCart();
  const productMap = new Map(products.map((product) => [product.id, product]));
  const cartLines = cart.flatMap((item) => {
    const product = productMap.get(item.id);
    return product ? [{ ...item, product }] : [];
  });
  const totalKobo = cartLines.reduce(
    (total, item) => total + item.product.priceKobo * item.quantity,
    0,
  );
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
      <div className="mb-10 flex flex-col gap-5 border-b border-black/12 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-red">Bookable now</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            Choose a useful starting point.
          </h2>
        </div>
        <div className="flex items-center gap-3 text-sm font-bold">
          <ShoppingBag className="size-5 text-red" />
          {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_23rem] lg:items-start">
        <div className="grid gap-px overflow-hidden border border-black/12 bg-black/12 sm:grid-cols-2">
          {products.map((product) => {
            const inCart = cart.some((item) => item.id === product.id);
            return (
              <article key={product.id} className="flex flex-col bg-paper">
                <div className="relative aspect-[4/3] overflow-hidden bg-stone">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 35vw"
                    className="object-cover transition duration-700 hover:scale-[1.03]"
                  />
                  <span className="absolute left-4 top-4 bg-paper px-3 py-2 text-[0.65rem] font-extrabold uppercase tracking-[0.16em]">
                    {product.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink/40">
                    {product.sku} / {product.unit}
                  </p>
                  <h3 className="mt-3 font-display text-3xl leading-tight">{product.name}</h3>
                  <p className="mt-4 flex-1 text-sm leading-7 text-ink/60">{product.description}</p>
                  <div className="mt-7 flex items-center justify-between gap-4 border-t border-black/10 pt-5">
                    <p className="font-display text-2xl">{formatNaira(product.priceKobo)}</p>
                    <button
                      type="button"
                      onClick={() => addToCart(product.id)}
                      className={inCart ? 'button-secondary' : 'button-primary'}
                    >
                      {inCart ? <Check className="size-4" /> : <Plus className="size-4" />}
                      {inCart ? 'Add another' : 'Add'}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <aside
          className="border border-black/12 bg-ivory p-6 lg:sticky lg:top-28"
          aria-label="Cart"
        >
          <div className="flex items-center justify-between border-b border-black/12 pb-5">
            <h2 className="font-display text-3xl">Your selection</h2>
            <ShoppingBag className="size-5 text-red" />
          </div>

          {cartLines.length === 0 ? (
            <p className="py-10 text-sm leading-6 text-ink/55">
              Your cart is ready when you are. Add a service to continue to confirmation.
            </p>
          ) : (
            <div className="divide-y divide-black/10">
              {cartLines.map(({ product, quantity }) => (
                <div key={product.id} className="py-5">
                  <div className="flex justify-between gap-4">
                    <p className="text-sm font-bold leading-5">{product.name}</p>
                    <button
                      type="button"
                      onClick={() => updateCartQuantity(product.id, 0)}
                      aria-label={`Remove ${product.name}`}
                      className="text-ink/40 hover:text-red"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center border border-black/15 bg-paper">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(product.id, quantity - 1)}
                        aria-label={`Decrease ${product.name} quantity`}
                        className="grid size-9 place-items-center"
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="min-w-8 text-center text-sm font-bold">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(product.id, quantity + 1)}
                        aria-label={`Increase ${product.name} quantity`}
                        disabled={quantity >= 5}
                        className="grid size-9 place-items-center disabled:opacity-30"
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>
                    <p className="text-sm font-bold">{formatNaira(product.priceKobo * quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="border-t border-black/15 pt-5">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-bold">Total</span>
              <span className="font-display text-3xl">{formatNaira(totalKobo)}</span>
            </div>
            <p className="mt-2 text-xs leading-5 text-ink/45">All prices are in Nigerian naira.</p>
            {cartLines.length > 0 && (
              <Link href="/shop/checkout" className="button-primary mt-6 flex w-full">
                Review and confirm <ArrowRight className="size-4" />
              </Link>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
