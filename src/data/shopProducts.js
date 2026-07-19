import snapshot from './products.snapshot.json' with { type: 'json' };

export const shopProducts = snapshot.products;

const productsById = new Map(shopProducts.map((product) => [product.id, product]));

export function formatNaira(kobo) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(kobo / 100);
}

export function validateCartItems(input) {
  if (!Array.isArray(input) || input.length === 0 || input.length > shopProducts.length) {
    throw new Error('Your cart is empty or invalid.');
  }

  const seen = new Set();
  const items = input.map((item) => {
    const product = item && typeof item.id === 'string' ? productsById.get(item.id) : null;
    const quantity = item?.quantity;

    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 5) {
      throw new Error('One or more cart items are invalid.');
    }

    if (seen.has(product.id)) {
      throw new Error('Duplicate cart items are not allowed.');
    }

    seen.add(product.id);
    return { product, quantity, lineTotalKobo: product.priceKobo * quantity };
  });

  const amountKobo = items.reduce((total, item) => total + item.lineTotalKobo, 0);
  return { items, amountKobo };
}
