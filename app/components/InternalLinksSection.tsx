import Link from 'next/link';
import { ArrowRight, LinkIcon } from 'lucide-react';

interface InternalLink {
  label: string;
  url: string;
  relationship: string;
}

const getBadgeStyles = (relationship: string) => {
  switch (relationship) {
    case 'Primary':
      return "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-950/20 dark:border-indigo-800 dark:text-indigo-400";
    case 'Related':
      return "bg-amber-50 border-amber-200 text-amber-600 dark:bg-amber-950/20 dark:border-amber-800 dark:text-amber-400";
    case 'Service':
      return "bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-950/20 dark:border-emerald-800 dark:text-emerald-400";
    case 'CaseStudy':
      return "bg-violet-50 border-violet-200 text-violet-600 dark:bg-violet-950/20 dark:border-violet-800 dark:text-violet-400";
    default:
      return "bg-surface border-stroke text-text-muted";
  }
};

const getCategoryLabel = (relationship: string) => {
  switch (relationship) {
    case 'Primary':
      return "Main Navigation";
    case 'Related':
      return "Related Content";
    case 'Service':
      return "Service Page";
    case 'CaseStudy':
      return "Case Study";
    default:
      return relationship;
  }
};

export default function InternalLinks({ links }: { links: InternalLink[] }) {
  if (!links || links.length === 0) return null;

  return (
    <section className="py-24 bg-white border-t border-stroke">
      <div className="container-max">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase text-brand flex items-center gap-2">
               <LinkIcon size={12} /> Explore Connections
            </p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Related <br /> <span className="text-brand">Connections.</span></h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {links.map((link, idx) => (
            <Link 
              key={idx} 
              href={link.url}
              className="group p-8 glass border border-stroke rounded-[2rem] hover:border-brand/40 transition-all duration-500 shadow-sm hover:shadow-premium bg-white relative overflow-hidden flex flex-col justify-between min-h-[180px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <div className="space-y-4 relative z-10">
                <span className={`text-[8px] font-bold uppercase px-2.5 py-1 border rounded-md transition-colors ${getBadgeStyles(link.relationship)}`}>
                  {getCategoryLabel(link.relationship)}
                </span>
                <h3 className="text-xl font-bold uppercase tracking-tight group-hover:text-brand transition-colors leading-tight">
                  {link.label}
                </h3>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-text-muted group-hover:text-brand transition-colors pt-4 mt-4 border-t border-stroke/50 relative z-10">
                 Explore Page <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

