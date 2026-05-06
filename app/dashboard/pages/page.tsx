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

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold uppercase tracking-tighter text-text-primary">
            Public <span className="text-brand">Nodes.</span>
          </h1>
          <p className="text-text-muted text-[10px] font-bold uppercase">
            Manage your high-performance static pages and SEO metadata.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-stroke overflow-hidden shadow-sm">
        <div className="p-8 border-b border-stroke flex justify-between items-center bg-surface/30">
          <div className="relative w-full md:w-96">
            <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Filter nodes..." 
              className="w-full h-12 bg-white border border-stroke rounded-xl pl-16 pr-6 text-[10px] font-bold uppercase focus:outline-none focus:border-brand transition-all" 
            />
          </div>
          <p className="text-[9px] font-bold uppercase text-text-muted">
            Total nodes: <span className="text-brand">{pages?.length || 0}</span>
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-stroke bg-surface/10">
                <th className="px-10 py-6 text-[10px] font-bold uppercase text-text-muted">Node Name</th>
                <th className="px-10 py-6 text-[10px] font-bold uppercase text-text-muted">Route</th>
                <th className="px-10 py-6 text-[10px] font-bold uppercase text-text-muted">SEO Status</th>
                <th className="px-10 py-6 text-[10px] font-bold uppercase text-text-muted">Sections</th>
                <th className="px-10 py-6 text-[10px] font-bold uppercase text-text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stroke">
              {pages?.map((page: any) => {
                // Determine SEO completeness
                const seoComplete = page.metaTitle && page.metaDescription && page.ogImage;
                const seoScore = [page.metaTitle, page.metaDescription, page.ogImage].filter(Boolean).length;

                return (
                  <tr key={page.id} className="hover:bg-surface/30 transition-colors group">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-brand/5 border border-brand/10 flex items-center justify-center text-brand">
                            <Globe size={20} />
                         </div>
                         <div>
                            <p className="text-sm font-bold uppercase text-text-primary group-hover:text-brand transition-colors">{page.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                               <Clock size={10} className="text-text-muted" />
                               <p className="text-[9px] font-bold uppercase text-text-muted">
                                  Updated {new Date(page.updatedAt).toLocaleDateString()}
                               </p>
                            </div>
                         </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <span className="text-[10px] font-bold uppercase text-text-muted bg-surface px-3 py-1 rounded-full border border-stroke">
                        {page.slug === 'home' ? '/' : `/${page.slug}`}
                      </span>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-3">
                         {seoComplete ? (
                            <div className="flex items-center gap-2 text-emerald-500">
                               <CheckCircle2 size={14} />
                               <span className="text-[9px] font-bold uppercase">Optimized</span>
                            </div>
                         ) : (
                            <div className="flex items-center gap-2 text-amber-500">
                               <AlertCircle size={14} />
                               <span className="text-[9px] font-bold uppercase">Partial ({seoScore}/3)</span>
                            </div>
                         )}
                      </div>
                    </td>
                    <td className="px-10 py-8">
                       <p className="text-[10px] font-bold uppercase text-text-muted">
                          {page._count.sections} Modules
                       </p>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                        <Link 
                          href={page.slug === 'home' ? '/' : `/${page.slug}`} 
                          target="_blank"
                          className="p-3 bg-white border border-stroke hover:bg-surface rounded-lg transition-all text-text-muted shadow-sm"
                          title="Preview Page"
                        >
                          <Eye size={16} />
                        </Link>
                        <Link 
                          href={`/dashboard/pages/${page.slug}`}
                          className="p-3 bg-brand text-white border border-brand/20 hover:bg-brand/90 rounded-lg transition-all shadow-sm"
                          title="Edit Node"
                        >
                          <FileEdit size={16} />
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

