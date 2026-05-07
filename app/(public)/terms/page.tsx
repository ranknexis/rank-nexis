import { getPageData } from "@/lib/pageContent";
import { buildSeoMetadata, getSectionData } from "@/lib/pageUtils";
import { Metadata } from "next";
import InternalLinksSection from "@/components/InternalLinksSection";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("terms");
  return buildSeoMetadata(page, {
    title: "Terms of Service | RankNexis",
    description: "Terms and conditions for RankNexis services.",
  });
}

export default async function TermsPage() {
  const pageData = await getPageData("terms");
  const sectionsMap = pageData?.sectionsMap || {};
  const legal = getSectionData(sectionsMap, "legal", { sections: [] });

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <main className="grain">

        <section className="pt-32 pb-24 border-b border-stroke bg-surface/30">
          <div className="container-max">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase mb-6">Terms of <br /> <span className="text-brand">Service.</span></h1>
            <p className="text-text-secondary text-xl font-medium max-w-2xl">Rules and guidelines for our partnership.</p>
          </div>
        </section>

        <section className="py-24">
          <div className="container-max max-w-4xl">
            <div className="space-y-16">
              {legal.sections?.map((section: any, i: number) => (
                <div key={i} className="space-y-6">
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-brand">{section.heading}</h2>
                  <div className="text-text-secondary text-lg leading-relaxed font-medium space-y-4" dangerouslySetInnerHTML={{ __html: section.body }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <InternalLinksSection links={(pageData?.internalLinks as any[]) || []} />
      </main>
    </div>
  );
}

