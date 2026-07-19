export const DRAFT_POLICY_VERSION = 'yhly-draft-2026-07-17';

const yhlyReferencePattern =
  /^YHLY-[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isYhlyPaymentReference(reference) {
  return typeof reference === 'string' && yhlyReferencePattern.test(reference);
}

export function isAllowedPaystackAuthorizationUrl(value) {
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();
    return (
      url.protocol === 'https:' &&
      !url.username &&
      !url.password &&
      !url.port &&
      (hostname === 'paystack.com' || hostname.endsWith('.paystack.com'))
    );
  } catch {
    return false;
  }
}
