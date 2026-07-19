import { PolicyPage } from '@/components/PolicyPage';
import { site } from '@/data/site';

export const metadata = { title: 'Service terms' };

const sections = [
  {
    id: 'what-is-offered',
    title: 'What the shop offers',
    content: (
      <>
        <p>
          Shop listings are consultations, property services or deposits towards a service. They are
          not the sale of a completed construction project or a promise that every item of later
          work is included. Each listing describes its starting scope and unit.
        </p>
        <p>
          A consultation, inspection or concept may provide direction or recommendations. It does
          not replace specialist legal, structural, engineering, surveying or other regulated advice
          where that is required for a property.
        </p>
      </>
    ),
  },
  {
    id: 'prices-payment',
    title: 'Prices and payment',
    content: (
      <>
        <p>
          Shop prices are shown in Nigerian naira (NGN). The server confirms the current catalogue
          price before opening Paystack&apos;s hosted checkout. A listing marked as a deposit is a
          payment towards the stated assessment or service and is not necessarily the final project
          price.
        </p>
        <p>
          Any additional work, materials, travel, third-party service or changed scope must be set
          out and agreed separately before it is treated as part of our delivery.
        </p>
      </>
    ),
  },
  {
    id: 'acceptance-availability',
    title: 'Acceptance and availability',
    content: (
      <>
        <p>
          Sending a quote request, selecting a service or completing payment does not by itself
          confirm a visit or delivery date. We will review the request and confirm acceptance, the
          applicable service area, property requirements and an available date directly with you.
        </p>
        <p>
          Services remain subject to team availability, safe and practical site access, and the
          information needed to define the work. If we cannot accept the requested service, we will
          contact you to agree the appropriate treatment of any payment made.
        </p>
      </>
    ),
  },
  {
    id: 'scope-changes',
    title: 'Scope and changes',
    content: (
      <>
        <p>
          The listing, our written confirmation and any later approved proposal together define the
          scope. Conditions discovered at a property, incomplete information or a requested change
          may affect the work, timing or amount due. We will explain a material change and seek
          agreement before proceeding with the affected additional work.
        </p>
        <p>
          Images, concepts, samples and estimates help explain direction but can be affected by site
          conditions, availability and agreed substitutions. No outcome or property value is
          guaranteed.
        </p>
      </>
    ),
  },
  {
    id: 'customer-responsibilities',
    title: 'Your responsibilities',
    content: (
      <>
        <p>
          Please provide accurate contact, location, dimension and property information; identify
          any known hazards or access restrictions; obtain permissions you are responsible for; and
          ensure agreed, safe access at the confirmed time. Someone authorised to make decisions
          should be available where the agreed service requires it.
        </p>
        <p>
          You remain responsible for reviewing the stated scope and raising questions before
          approval. Delay or extra work caused by inaccurate information, unavailable access or an
          unagreed site condition will need to be discussed and agreed.
        </p>
      </>
    ),
  },
  {
    id: 'law-contact',
    title: 'Questions and Nigerian law',
    content: (
      <>
        <p>
          These terms are intended to operate under the laws of the Federal Republic of Nigeria. Any
          mandatory consumer rights that apply are not excluded. We encourage both sides to first
          try to resolve a concern directly and practically; any unresolved matter may be handled by
          a court or other competent process in Nigeria as applicable.
        </p>
        <p>
          Questions about an order or these terms can be sent to{' '}
          <a href={`mailto:${site.email}`} className="font-bold text-red hover:text-red-dark">
            {site.email}
          </a>
          .
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <PolicyPage
      eyebrow="Service terms"
      title="A clear basis for the work."
      introduction="These terms explain how online service selections, deposits, scope and delivery confirmation work for customers in Abuja and elsewhere we agree to serve."
      sections={sections}
    />
  );
}
