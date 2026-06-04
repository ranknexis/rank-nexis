"use client";

import { CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ServiceDetailClient({
  service,
  pageData
}: {
  service: any;
  pageData: any;
  relatedCaseStudies?: any[];
}) {
  const sections = pageData?.sections || [];

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <main className="grain">

        {/* Page Header (Simple, clean, dynamic) */}
        <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-white px-4 border-b border-stroke">
          <div className="container-max">
            <div className="w-full">
              {/* Dynamic Breadcrumbs */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-text-secondary/70 mb-6">
                <Link href="/" className="hover:text-brand transition-colors">Home</Link>
                <ChevronRight size={12} className="text-text-secondary/40" />
                <Link href="/services" className="hover:text-brand transition-colors">Services</Link>
                <ChevronRight size={12} className="text-text-secondary/40" />
                <span className="text-brand font-extrabold">{service.title}</span>
              </div>

              {/* Service Title */}
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-text-primary mb-6 uppercase">
                {service.title}
              </h1>

              {/* Service Summary (3-5 line paragraph) */}
              <p className="text-text-secondary text-base md:text-lg font-medium leading-relaxed w-full text-justify">
                {service.description}
              </p>
            </div>
          </div>
        </section>

        {/* Render Sections mapped dynamically */}
        {sections.map((section: any, idx: number) => {
          const content = section.content;
          const type = section.sectionType;

          if (type === 'hero') {
            // We skip rendering the hero database section because it has a fancy design
            // and we already render the service title/description at the top.
            return null;
          }

          if (type === 'text_block' || type === 'text_image') {
            const tags = content.tags || [];
            const title = content.heading || content.title;
            const bodyContent = content.body || content.text || '';
            const visualImage = content.imageUrl || content.image || "/website-images/home-page/digital-marketing-services-for-small-business.webp";

            return (
              <section key={idx} className="py-16 md:py-24 border-b border-stroke last:border-b-0 px-4 bg-white">
                <div className="container-max">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

                    {/* Visual Media Column (Alternating alignment) */}
                    <div className={`lg:col-span-6 relative ${idx % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}>
                      <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border border-stroke shadow-md">
                        <Image
                          src={visualImage}
                          alt={title || service.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className={`lg:col-span-6 space-y-6 ${idx % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}>
                      {content.label && (
                        <span className="text-xs font-bold uppercase text-brand tracking-wider block">
                          {content.label}
                        </span>
                      )}

                      <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight uppercase">
                        {title}
                      </h2>

                      {/* Rich Text body content */}
                      {bodyContent && (
                        <div
                          className="text-text-secondary text-sm md:text-base font-normal leading-relaxed space-y-4 text-justify w-full [&_p]:text-justify [&_p]:w-full"
                          dangerouslySetInnerHTML={{ __html: bodyContent }}
                        />
                      )}

                      {/* Checklist tags */}
                      {tags.length > 0 && (
                        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                          {tags.map((tag: any, tIdx: number) => {
                            const tagText = typeof tag === 'string' ? tag : (tag?.text || '');
                            if (!tagText) return null;
                            return (
                              <div key={tIdx} className="flex items-center gap-2">
                                <CheckCircle2 size={16} className="text-brand shrink-0" />
                                <span className="text-sm text-text-primary">{tagText}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              </section>
            );
          }

          if (type === 'table') {
            const rows = content.rows || [];
            const heading = content.heading || "Industries We Serve";
            return (
              <section key={idx} className="py-16 md:py-24 bg-surface-light border-b border-stroke px-4">
                <div className="container-max">
                  <div className="max-w-4xl mx-auto space-y-8">
                    <div className="space-y-2 text-center">
                      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-text-primary uppercase">
                        {heading}
                      </h2>
                    </div>

                    {/* Clean Table Container */}
                    <div className="overflow-hidden rounded-2xl border border-stroke bg-white shadow-sm">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-stroke bg-surface-light text-xs font-bold uppercase text-text-secondary/70 tracking-wider">
                            <th className="py-4 px-6 md:px-8 w-1/3">Industry / Category</th>
                            <th className="py-4 px-6 md:px-8">Specialty & Focus</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stroke text-sm">
                          {rows.map((row: any, rIdx: number) => (
                            <tr
                              key={rIdx}
                              className="hover:bg-brand/[0.01] transition-colors"
                            >
                              <td className="py-4 px-6 md:px-8 font-bold text-text-primary">
                                {row.industry}
                              </td>
                              <td className="py-4 px-6 md:px-8 text-text-secondary">
                                {row.specialty}
                              </td>
                            </tr>
                          ))}
                          {rows.length === 0 && (
                            <tr>
                              <td colSpan={2} className="py-8 text-center text-text-muted font-bold">
                                No industries defined.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          return null;
        })}

      </main>
    </div>
  );
}
