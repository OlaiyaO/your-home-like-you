'use client';

import { useSyncExternalStore } from 'react';

const storageKey = 'yhly-shop-cart-v1';
let cart = [];
let loaded = false;
const listeners = new Set();

function emit() {
  listeners.forEach((listener) => listener());
}

function readStoredCart() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(storageKey) || '[]');
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function persist(nextCart) {
  cart = nextCart;
  window.localStorage.setItem(storageKey, JSON.stringify(cart));
  emit();
}

function subscribe(listener) {
  listeners.add(listener);

  if (!loaded) {
    loaded = true;
    cart = readStoredCart();
    queueMicrotask(emit);
  }

  return () => listeners.delete(listener);
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key === storageKey) {
      cart = readStoredCart();
      emit();
    }
  });
}

export function useCart() {
  return useSyncExternalStore(
    subscribe,
    () => cart,
    () => [],
  );
}

export function addToCart(id) {
  const existing = cart.find((item) => item.id === id);
  persist(
    existing
      ? cart.map((item) =>
          item.id === id ? { ...item, quantity: Math.min(item.quantity + 1, 5) } : item,
        )
      : [...cart, { id, quantity: 1 }],
  );
}

export function updateCartQuantity(id, quantity) {
  if (quantity <= 0) {
    persist(cart.filter((item) => item.id !== id));
    return;
  }

  persist(
    cart.map((item) => (item.id === id ? { ...item, quantity: Math.min(quantity, 5) } : item)),
  );
}

export function clearCart() {
  persist([]);
}
