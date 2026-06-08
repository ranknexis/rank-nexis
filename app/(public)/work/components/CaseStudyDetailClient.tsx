"use client";

import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Target, 
  Lightbulb, 
  Workflow, 
  BarChart3, 
  ChevronRight,
  User,
  Tag,
  Calendar,
  Link2,
  ArrowUpRight,
  TrendingUp,
  Award
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import RecommendationsList from "@/components/RecommendationsList";

interface CaseStudyDetailClientProps {
  study: {
    title: string;
    client: string;
    description: string;
    challenge: string;
    solution: string;
    execution: string[];
    results: string[];
    image: string | null;
    stats: string;
    kpi: string;
    tag: string;
    technologies: string[];
    createdAt: string;
    liveUrl?: string | null;
  };
  recommendations?: any[];
}

export default function CaseStudyDetailClient({ study, recommendations = [] }: CaseStudyDetailClientProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-white min-h-screen">

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 md:pt-32 md:pb-20 overflow-hidden bg-surface/30 px-4">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand/5 rounded-full blur-[80px] -translate-x-1/4 translate-y-1/4" />
        </div>

        <div className="container-max px-4 md:px-0">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl space-y-6 md:space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 glass rounded-full shadow-sm">
              <span className="w-2 h-2 bg-brand rounded-full animate-pulse" />
              <p className="text-[10px] font-bold uppercase tracking-wider text-brand">{study.tag}</p>
            </div>
            
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-tight text-text-primary">
              {study.title}
            </h1>

            <div className="flex flex-wrap gap-6 sm:gap-10 py-4 sm:py-8 border-y border-stroke">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase text-text-muted flex items-center gap-2">
                  <User size={12} className="text-brand" /> Client
                </p>
                <p className="text-base md:text-lg font-bold text-text-primary">{study.client}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase text-text-muted flex items-center gap-2">
                  <Tag size={12} className="text-brand" /> Service
                </p>
                <p className="text-base md:text-lg font-bold text-text-primary">{study.tag}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase text-text-muted flex items-center gap-2">
                  <Calendar size={12} className="text-brand" /> Completion
                </p>
                <p className="text-base md:text-lg font-bold text-text-primary">
                  {new Date(study.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>
              {study.liveUrl && (
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase text-text-muted flex items-center gap-2">
                    <Link2 size={12} className="text-brand" /> Live Preview
                  </p>
                  <a 
                    href={study.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-base md:text-lg font-bold text-brand hover:text-brand-dark flex items-center gap-1 transition-colors group/live"
                  >
                    Visit Project <ArrowUpRight size={14} className="group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview Block with Stats Card */}
      <section className="relative -mt-10 pb-12 md:pb-24 px-4">
        <div className="container-max px-4 md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-8 relative rounded-3xl md:rounded-[3rem] overflow-hidden shadow-2xl bg-surface grain"
            >
              {study.image ? (
                <div className="relative w-full aspect-video">
                  <Image 
                    src={study.image} 
                    alt={study.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 80vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-full aspect-video bg-surface flex items-center justify-center">
                  <p className="text-text-muted italic">Visual asset pending optimization</p>
                </div>
              )}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-4 flex flex-col justify-center gap-6 md:gap-8"
            >
              <div className="p-6 md:p-10 glass rounded-3xl md:rounded-[2.5rem] shadow-premium border border-stroke space-y-4 bg-white">
                <div className="w-12 h-12 bg-brand/10 rounded-2xl flex items-center justify-center">
                  <BarChart3 className="text-brand" size={24} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-emerald-600 leading-none">{study.stats}</h3>
                  <p className="text-xs font-bold uppercase text-text-primary tracking-widest">{study.kpi}</p>
                </div>
              </div>
              
              <div className="p-4 md:p-8 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-text-muted">Technologies & Platforms</h4>
                <div className="flex flex-wrap gap-2">
                  {study.technologies.map((tech, i) => (
                    <span key={i} className="px-4 py-2 bg-surface text-text-primary text-[10px] font-bold rounded-xl border border-stroke uppercase tracking-wide">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Strategic Takeaways Highlight Section */}
      <section className="py-8 md:py-16 bg-surface-light border-y border-stroke/60 px-4">
        <div className="container-max px-4 md:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white p-6 rounded-2xl border border-stroke flex gap-4 shadow-sm items-start">
              <div className="w-10 h-10 rounded-xl bg-brand/5 flex items-center justify-center text-brand shrink-0">
                <Award size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="text-[10px] font-black uppercase tracking-wider text-text-muted">Core Objective</h4>
                <p className="text-xs font-bold text-text-primary leading-snug">Achieving measurable {study.kpi} outcomes for {study.client}.</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-stroke flex gap-4 shadow-sm items-start">
              <div className="w-10 h-10 rounded-xl bg-brand/5 flex items-center justify-center text-brand shrink-0">
                <TrendingUp size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="text-[10px] font-black uppercase tracking-wider text-text-muted">Impact Metrics</h4>
                <p className="text-xs font-bold text-text-primary leading-snug">Proven execution delivering {study.stats} acceleration.</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-stroke flex gap-4 shadow-sm items-start">
              <div className="w-10 h-10 rounded-xl bg-brand/5 flex items-center justify-center text-brand shrink-0">
                <Target size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="text-[10px] font-black uppercase tracking-wider text-text-muted">Strategy Focus</h4>
                <p className="text-xs font-bold text-text-primary leading-snug">Custom optimized {study.tag} framework integration.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview & Challenge Section */}
      <section className="py-12 md:py-24 px-4 bg-white">
        <div className="container-max px-4 md:px-0 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4 md:space-y-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand/5 flex items-center justify-center text-brand">
                <Target size={20} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-text-primary">The Project Overview</h2>
            </div>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed font-medium text-justify">
              {study.description}
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4 md:space-y-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand/5 flex items-center justify-center text-brand">
                <Workflow size={20} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-text-primary">The Core Challenges</h2>
            </div>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed font-medium text-justify">
              {study.challenge}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Premium Solution Section */}
      <section className="bg-brand/5 py-16 md:py-32 overflow-hidden relative px-4 border-y border-stroke">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 opacity-10">
           <Lightbulb size={600} />
        </div>
        
        <div className="container-max px-4 md:px-0 relative z-10">
          <div className="max-w-4xl space-y-6 md:space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center text-white">
                <Lightbulb size={20} />
              </div>
              <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tight text-text-primary">Our Strategic Solution</h2>
            </div>
            <p className="text-lg md:text-3xl text-text-primary leading-relaxed font-semibold">
              {study.solution}
            </p>
          </div>
        </div>
      </section>

      {/* Execution Plan & Results Sections */}
      <section className="py-12 md:py-24 px-4 bg-white">
        <div className="container-max px-4 md:px-0 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-start">
          
          {/* Timeline Execution Phases */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6 md:space-y-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-text-primary">Project Execution Timeline</h2>
            
            <div className="space-y-6 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-px before:bg-stroke">
              {study.execution.map((step, i) => (
                <motion.div 
                  key={i}
                  variants={itemVariants}
                  className="flex items-start gap-6 relative group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand text-white border border-brand shadow-lg flex items-center justify-center shrink-0 text-sm font-bold relative z-10 transition-transform duration-300 group-hover:scale-105">
                    0{i+1}
                  </div>
                  <div className="p-6 rounded-3xl bg-white border border-stroke hover:border-brand/20 transition-all shadow-sm flex-grow">
                    <h4 className="text-[9px] font-black uppercase text-brand tracking-widest mb-1.5">Phase 0{i+1} / Milestone</h4>
                    <p className="text-sm font-bold text-text-primary leading-relaxed">{step}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Metrics-First Results Panel */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6 md:space-y-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-brand">Final Results & Impact</h2>
            
            <div className="space-y-6">
              <div className="p-8 rounded-[2rem] bg-emerald-50/50 border border-emerald-100 flex items-center gap-6 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-lg animate-pulse">
                  <BarChart3 size={24} />
                </div>
                <div>
                  <h4 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-emerald-600 leading-none mb-1.5">{study.stats}</h4>
                  <p className="text-[10px] font-bold uppercase text-text-muted tracking-widest">{study.kpi}</p>
                </div>
              </div>

              <div className="space-y-3 md:space-y-4">
                {study.results.map((result, i) => (
                  <motion.div 
                    key={i}
                    variants={itemVariants}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-stroke hover:border-emerald-200 transition-colors shadow-sm"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 size={14} />
                    </div>
                    <p className="text-sm font-bold text-text-primary leading-relaxed">{result}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium Client Quote Panel */}
      <section className="py-12 md:py-24 bg-surface-light border-y border-stroke px-4">
        <div className="container-max px-4 md:px-0">
          <div className="max-w-4xl mx-auto">
            <div className="relative p-8 md:p-16 rounded-[2.5rem] bg-white border border-stroke overflow-hidden shadow-premium text-center space-y-6">
              <div className="absolute top-0 left-0 w-24 h-24 bg-brand/5 rounded-br-[100px] flex items-center justify-center">
                <span className="text-4xl text-brand font-serif font-black">“</span>
              </div>
              <p className="text-lg md:text-2xl font-medium text-text-primary italic leading-relaxed">
                Partnering with RankNexis was a turning point. Their strategic implementation of {study.tag} directly yielded {study.stats} {study.kpi} and established a reliable channel for our long term growth.
              </p>
              <div className="space-y-1">
                <h4 className="text-sm font-bold uppercase text-brand tracking-widest">{study.client} Executive Team</h4>
                <p className="text-[9px] font-black uppercase text-text-muted tracking-wider">Verified Partnership</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations List Container */}
      {recommendations.length > 0 && (
        <section className="py-8 md:py-16 px-4">
          <div className="container-max px-4 md:px-0">
            <RecommendationsList recommendations={recommendations} />
          </div>
        </section>
      )}

      {/* CTA Footer */}
      <section className="py-16 md:py-32 border-t border-stroke text-center px-4 bg-white">
        <div className="container-max px-4 md:px-0 space-y-8 md:space-y-12">
          <h2 className="text-3xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-text-primary leading-tight">
            Inspired by <br /> This Success?
          </h2>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary h-16 px-8 md:h-20 md:px-16 text-[11px] font-bold uppercase shadow-premium group flex items-center justify-center">
              Start Your Project <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform inline" size={14} />
            </Link>
            {study.liveUrl && (
              <a 
                href={study.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-outline h-16 px-8 md:h-20 md:px-16 text-[11px] font-bold uppercase glass flex items-center justify-center gap-2"
              >
                Visit Live Site <ArrowUpRight size={16} />
              </a>
            )}
            <Link href="/work" className="btn-outline h-16 px-8 md:h-20 md:px-16 text-[11px] font-bold uppercase glass flex items-center justify-center">
              Explore More Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
