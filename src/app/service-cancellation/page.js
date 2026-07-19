import { PolicyPage } from '@/components/PolicyPage';
import { site } from '@/data/site';

export const metadata = { title: 'Service cancellation and rescheduling' };

const sections = [
  {
    id: 'confirmation',
    title: 'When scheduling is confirmed',
    content: (
      <p>
        A date shown in an enquiry or requested during checkout is not confirmed automatically.
        Scheduling is confirmed only when our team has reviewed the service, location, access and
        availability and has expressly confirmed the date with you.
      </p>
    ),
  },
  {
    id: 'before-delivery',
    title: 'Before delivery begins',
    content: (
      <>
        <p>
          If you or our team needs to reschedule or cancel, contact the other side as soon as
          practical. The treatment of rescheduling, cancellation and any refund must be discussed
          and agreed before delivery, taking account of the service, work already carried out,
          commitments already made and whether another suitable date is available.
        </p>
        <p>
          We do not publish a universal deadline, percentage deduction or automatic refund rule
          here. The agreed treatment should be recorded in writing for the relevant booking. This
          does not remove any right that cannot lawfully be excluded.
        </p>
      </>
    ),
  },
  {
    id: 'clean-deposit',
    title: 'Post-construction clean deposit',
    content: (
      <>
        <p>
          The post-construction clean deposit secures a property assessment and a preferred date. It
          is not the final price for the complete clean. After the property survey, we confirm the
          final scope and the balance required for that scope.
        </p>
        <p>
          Before delivery, the customer and our team must agree how the deposit will be treated if
          the assessment, preferred date or proposed cleaning service is rescheduled or cancelled.
          That discussion should account for assessment work completed and commitments made, without
          assuming an unlisted deduction or refund amount.
        </p>
      </>
    ),
  },
  {
    id: 'changes-after-start',
    title: 'After work has started',
    content: (
      <p>
        If you ask to stop or change a service after delivery has begun, we will identify completed
        work, committed materials or third-party costs and any safe close-out needed. The resulting
        scope, timing and payment treatment must be agreed as far as possible, subject to applicable
        rights and obligations.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Request a change',
    content: (
      <>
        <p>
          Contact us with your name, order or payment reference, service and requested change. Do
          not assume a date has changed until our team confirms it.
        </p>
        <p>
          Email{' '}
          <a href={`mailto:${site.email}`} className="font-bold text-red hover:text-red-dark">
            {site.email}
          </a>{' '}
          or call{' '}
          <a
            href={`tel:${site.phone.replaceAll(' ', '')}`}
            className="font-bold text-red hover:text-red-dark"
          >
            {site.phone}
          </a>
          .
        </p>
      </>
    ),
  },
];

export default function ServiceCancellationPage() {
  return (
    <PolicyPage
      eyebrow="Service changes"
      title="Rescheduling and cancellation, agreed clearly."
      introduction="This policy explains how a requested date becomes confirmed and how service changes should be agreed before delivery."
      sections={sections}
    />
  );
}
