import { notFound } from 'next/navigation';

import { BusinessTemplate } from '@/components/BusinessTemplate';
import { TemplatePrintToolbar } from '@/components/TemplatePrintToolbar';
import { brandTemplates, getBrandTemplate } from '@/data/brandTemplates';

export function generateStaticParams() {
  return brandTemplates.map((template) => ({ template: template.slug }));
}

export async function generateMetadata({ params }) {
  const { template: slug } = await params;
  const template = getBrandTemplate(slug);

  if (!template) return { title: 'Template not found' };

  return {
    title: `${template.title} Template`,
    description: `${template.description} View, print or save this Your Home Like You business template.`,
    robots: { index: false, follow: false },
  };
}

export default async function BrandTemplatePage({ params, searchParams }) {
  const [{ template: slug }, query] = await Promise.all([params, searchParams]);
  const template = getBrandTemplate(slug);

  if (!template) notFound();

  return (
    <main className="template-preview min-h-screen bg-stone/45">
      <TemplatePrintToolbar
        autoPrint={query.auto === '1'}
        download={template.download}
        title={template.title}
      />
      <div className="template-stage px-3 py-8 md:px-8 md:py-12">
        <BusinessTemplate template={template} />
      </div>
    </main>
  );
}
