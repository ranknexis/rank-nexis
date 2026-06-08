"use client";

import React from "react";
import BlogCard from "./BlogCard";
import CaseStudyItem from "./CaseStudyItem";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { stripHtml } from "@/lib/utils";

interface RecommendationsListProps {
  recommendations: any[];
}

export default function RecommendationsList({ recommendations = [] }: RecommendationsListProps) {
  if (recommendations.length === 0) return null;

  return (
    <section className="mt-20 md:mt-40 pt-10 md:pt-20 border-t border-stroke">
      <div className="space-y-4 mb-10 md:mb-16">
        <span className="text-[10px] font-bold uppercase text-brand tracking-[0.2em] block">Hand-Picked Suggestions</span>
        <h2 className="text-2xl md:text-5xl font-black tracking-tighter uppercase leading-[0.95]">Recommended <br />For You.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 xl:gap-12">
        {recommendations.map((item: any) => {
          if (item.type === "blog") {
            const dateStr = new Date(item.createdAt).toLocaleDateString(undefined, {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            });
            return (
              <BlogCard
                key={item.id}
                title={item.title}
                excerpt={item.metaDescription || "Read our latest article."}
                category={item.category?.name || "Insight"}
                author={item.author?.name || "RankNexis Team"}
                date={dateStr}
                slug={item.slug}
                image={item.image}
              />
            );
          }

          if (item.type === "work") {
            return (
              <CaseStudyItem
                key={item.id}
                title={item.title}
                category={item.tag || "Success Story"}
                stats={[{ label: item.kpi || "Growth Boost", value: item.stats || "+240%" }]}
                image={item.image}
                brand={item.client || "Client Project"}
                slug={item.slug}
              />
            );
          }

          if (item.type === "service") {
            return (
              <div 
                key={item.id}
                className="glass group p-6 md:p-8 flex flex-col justify-between hover:border-brand/40 transition-all duration-500 rounded-2xl md:rounded-3xl shadow-sm hover:shadow-premium h-full border border-stroke bg-white relative overflow-hidden"
              >
                <div className="space-y-4 md:space-y-6 relative z-10">
                  <div className="bg-surface border border-stroke w-12 h-12 rounded-xl flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-sm">
                    <Zap className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <span className="text-[9px] font-black uppercase text-brand tracking-wider">{item.category || "Service offering"}</span>
                    <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight leading-snug group-hover:text-brand transition-colors blog-content-area-title">
                      <div dangerouslySetInnerHTML={{ __html: item.title }} />
                    </h3>
                    <p className="text-text-muted text-xs md:text-sm font-medium leading-relaxed line-clamp-3">
                      {stripHtml(item.description)}
                    </p>
                  </div>
                </div>
                <div className="pt-4 mt-4 md:pt-6 md:mt-8 border-t border-stroke relative z-10">
                  <Link href={`/services/${item.slug}`} className="btn-outline h-11 md:h-12 w-full flex items-center justify-center text-[10px] font-bold uppercase tracking-widest group/btn bg-white hover:border-brand hover:text-brand transition-all border border-stroke rounded-xl">
                    Explore Service <ArrowRight size={14} className="ml-3 group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            );
          }

          return null;
        })}
      </div>
    </section>
  );
}
