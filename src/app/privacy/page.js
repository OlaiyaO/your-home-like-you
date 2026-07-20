import { PolicyPage } from '@/components/PolicyPage';
import { site } from '@/data/site';

export const metadata = { title: 'Privacy notice' };

const sections = [
  {
    id: 'information-we-collect',
    title: 'Information we collect',
    content: (
      <>
        <p>
          When you request a quote, we receive the details you enter, which may include your name,
          phone number, email address, service required, property location and your message. At
          checkout, we receive your name, email, phone number and property address, city and state,
          together with the services selected.
        </p>
        <p>
          We also receive ordinary technical information needed to operate and protect the website,
          such as request records and basic browser or device information made available by our
          hosting systems.
        </p>
      </>
    ),
  },
  {
    id: 'how-we-use-information',
    title: 'How we use it',
    content: (
      <>
        <p>
          We use this information to understand your property brief, prepare or discuss a scope,
          confirm service area and availability, respond to you, administer checkout and payment,
          arrange delivery, keep appropriate service records and protect the website from misuse.
        </p>
        <p>We do not use the published Google Sheets product catalogue to hold customer data.</p>
      </>
    ),
  },
  {
    id: 'providers',
    title: 'Payment and email providers',
    content: (
      <>
        <p>
          Paystack provides the hosted payment page. This website sends Paystack your email address,
          the server-confirmed amount in Nigerian naira, an order reference, selected service
          details and the customer and property contact details entered at checkout. Your card or
          bank payment details are entered on Paystack&apos;s systems, not on this website.
        </p>
        <p>
          Quote requests may be delivered to our team through Resend or another configured email
          service. Those providers process the information needed to deliver and secure the relevant
          service under their own terms and privacy notices.
        </p>
      </>
    ),
  },
  {
    id: 'sharing-retention-security',
    title: 'Sharing, retention and security',
    content: (
      <>
        <p>
          We share information only where needed to operate the service, process a payment, work
          with people involved in an agreed project, meet a lawful request or protect our rights and
          users. We do not say that internet transmission or storage is completely secure.
        </p>
        <p>
          We keep customer and enquiry information only for as long as reasonably needed for the
          purpose collected, our service records, disputes, security and applicable legal or
          accounting obligations. Retention can therefore differ according to the record and the
          work requested. We restrict access and use practical technical and organisational
          safeguards appropriate to the information held.
        </p>
      </>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your choices and rights',
    content: (
      <>
        <p>
          You may ask what personal information we hold about you, ask for an inaccurate record to
          be corrected, or ask us to delete or restrict use of information where applicable. You may
          also object to a use or withdraw consent where consent is the basis for that use. Some
          records may need to be retained where the law or an ongoing service, payment or dispute
          requires it.
        </p>
        <p>We may need to confirm your identity before acting on a request.</p>
      </>
    ),
  },
  {
    id: 'contact',
    title: 'Contact us',
    content: (
      <>
        <p>Send privacy questions or requests to our business email:</p>
        <div className="flex flex-col items-start gap-2">
          {site.primaryEmailConfigured ? (
            <a
              href={`mailto:${site.primaryEmail}`}
              className="break-all font-bold text-red hover:text-red-dark"
            >
              {site.primaryEmail}
            </a>
          ) : (
            <span className="text-sm italic text-ink/50">
              Primary business email is being configured.
            </span>
          )}
        </div>
        {site.location && <p>Our contact area is {site.location}.</p>}
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <PolicyPage
      eyebrow="Privacy notice"
      title="Your information, handled with purpose."
      introduction="This notice explains what customer information Your Home Like You receives, why it is used and the choices available to you."
      sections={sections}
    />
  );
}
