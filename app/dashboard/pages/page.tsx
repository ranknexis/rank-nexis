import { getAllPages } from "@/actions/pages";
import { 
    FileEdit, 
    Globe, 
    Search, 
    Eye, 
    Clock, 
    ShieldCheck, 
    AlertCircle,
    CheckCircle2
} from "lucide-react";
import Link from "next/link";

import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminPagesPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/dashboard");
  }
  const { pages, error } = await getAllPages();

  if (error) {
    return <div className="p-10 text-red-500 font-bold uppercase">{error}</div>;
  }

  const mainPages = pages?.filter((p: any) => !p.slug.includes('/')) || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stroke pb-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-text-primary">Website <span className="text-brand">Pages.</span></h1>
          <p className="text-[9px] font-bold uppercase text-text-muted tracking-wider">Manage your website pages, layouts, and search engine settings.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stroke overflow-hidden shadow-sm">
        <div className="p-4 sm:p-5 border-b border-stroke flex justify-between items-center bg-surface/30">
          <div className="relative w-full md:w-96">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Filter pages..." 
              className="w-full h-11 bg-white border border-stroke rounded-xl pl-10 pr-4 text-xs font-semibold focus:outline-none focus:border-brand transition-all" 
            />
          </div>
          <p className="text-[9px] font-bold uppercase text-text-muted">
            Total pages: <span className="text-brand">{mainPages.length}</span>
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-stroke bg-surface/10">
                <th className="px-6 py-4 text-[10px] font-bold uppercase text-text-muted">Page Name</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase text-text-muted">Route</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase text-text-muted">SEO Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase text-text-muted">Sections</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase text-text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stroke">
              {mainPages.map((page: any) => {
                
                const seoComplete = page.metaTitle && page.metaDescription && page.ogImage;
                const seoScore = [page.metaTitle, page.metaDescription, page.ogImage].filter(Boolean).length;

                return (
                  <tr key={page.id} className="hover:bg-surface/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-brand/5 border border-brand/10 flex items-center justify-center text-brand shrink-0">
                            <Globe size={16} />
                         </div>
                         <div>
                            <p className="text-xs font-bold uppercase text-text-primary group-hover:text-brand transition-colors">{page.title}</p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                               <Clock size={10} className="text-text-muted" />
                               <p className="text-[9px] font-bold uppercase text-text-muted">
                                  Updated {new Date(page.updatedAt).toLocaleDateString()}
                                </p>
                            </div>
                         </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[9px] font-bold uppercase text-text-muted bg-surface px-2.5 py-0.5 rounded-full border border-stroke">
                        {page.slug === 'home' ? '/' : `/${page.slug}`}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                         {seoComplete ? (
                            <div className="flex items-center gap-1.5 text-emerald-500">
                               <CheckCircle2 size={12} />
                               <span className="text-[9px] font-bold uppercase">Optimized</span>
                            </div>
                         ) : (
                            <div className="flex items-center gap-1.5 text-amber-500">
                               <AlertCircle size={12} />
                               <span className="text-[9px] font-bold uppercase">Partial ({seoScore}/3)</span>
                            </div>
                         )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <p className="text-[9px] font-bold uppercase text-text-muted">
                          {page._count.sections} Sections
                       </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                        <Link 
                          href={page.slug === 'home' ? '/' : `/${page.slug}`} 
                          target="_blank"
                          className="p-2 bg-white border border-stroke hover:bg-surface rounded-lg transition-all text-text-muted shadow-sm"
                          title="Preview Page"
                        >
                          <Eye size={14} />
                        </Link>
                        <Link 
                          href={`/dashboard/pages/${page.slug}`}
                          className="p-2 bg-brand text-white border border-brand/20 hover:bg-brand/90 rounded-lg transition-all shadow-sm"
                          title="Edit Page"
                        >
                          <FileEdit size={14} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

