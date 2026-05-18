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
  Calendar
} from "lucide-react";
import Image from "next/image";

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
  };
}

export default function CaseStudyDetailClient({ study }: CaseStudyDetailClientProps) {
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

      <section className="relative pt-20 pb-12 md:pt-32 md:pb-20 overflow-hidden bg-surface/30 px-4">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand/5 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2" />
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

            <div className="flex flex-wrap gap-4 sm:gap-8 py-4 sm:py-8 border-y border-stroke">
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
            </div>
          </motion.div>
        </div>
      </section>

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
                    className="object-contain bg-surface/50"
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
              <div className="p-6 md:p-10 glass rounded-3xl md:rounded-[2.5rem] shadow-premium border border-stroke space-y-4">
                <div className="w-12 h-12 bg-brand/10 rounded-2xl flex items-center justify-center">
                  <BarChart3 className="text-brand" size={24} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-4xl md:text-6xl font-bold tracking-tighter text-text-primary">{study.stats}</h3>
                  <p className="text-xs font-bold uppercase text-brand tracking-widest">{study.kpi}</p>
                </div>
              </div>
              
              <div className="p-4 md:p-8 space-y-4 md:space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-text-muted">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {study.technologies.map((tech, i) => (
                    <span key={i} className="px-4 py-2 bg-surface text-text-primary text-[10px] font-bold rounded-xl border border-stroke">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 space-y-16 md:space-y-32 px-4">

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
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">The Project Overview</h2>
            </div>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed font-medium">
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
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">The Core Challenges</h2>
            </div>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed font-medium">
              {study.challenge}
            </p>
          </motion.div>
        </div>

        <div className="bg-brand/5 py-16 md:py-32 overflow-hidden relative px-4">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 opacity-10">
             <Lightbulb size={600} />
          </div>
          
          <div className="container-max px-4 md:px-0 relative z-10">
            <div className="max-w-3xl space-y-6 md:space-y-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center text-white">
                  <Lightbulb size={20} />
                </div>
                <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tight text-text-primary">Our Strategic Solution</h2>
              </div>
              <p className="text-lg md:text-2xl text-text-primary leading-snug font-medium">
                {study.solution}
              </p>
            </div>
          </div>
        </div>

        <div className="container-max px-4 md:px-0 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6 md:space-y-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">Project Execution</h2>
            <div className="space-y-3 md:space-y-4">
              {study.execution.map((step, i) => (
                <motion.div 
                  key={i}
                  variants={itemVariants}
                  className="flex items-start gap-4 p-4 md:p-6 rounded-2xl md:rounded-3xl bg-surface border border-stroke hover:border-brand/30 transition-colors group"
                >
                  <span className="text-xs font-bold text-brand/40 group-hover:text-brand transition-colors">0{i+1}</span>
                  <p className="text-sm md:text-base font-bold text-text-primary">{step}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6 md:space-y-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-brand">Final Results</h2>
            <div className="space-y-3 md:space-y-4">
              {study.results.map((result, i) => (
                <motion.div 
                  key={i}
                  variants={itemVariants}
                  className="flex items-center gap-4 p-4 md:p-6 rounded-2xl md:rounded-3xl glass shadow-premium border border-stroke"
                >
                  <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center text-brand flex-shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <p className="text-sm md:text-base font-bold text-text-primary">{result}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-32 border-t border-stroke text-center px-4">
        <div className="container-max px-4 md:px-0 space-y-8 md:space-y-12">
          <h2 className="text-3xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-text-primary leading-tight">
            Inspired by <br /> This Success?
          </h2>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
            <button className="btn-primary h-16 px-8 md:h-20 md:px-16 text-[11px] font-bold uppercase shadow-premium group">
              Start Your Project <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform inline" />
            </button>
            <button className="btn-outline h-16 px-8 md:h-20 md:px-16 text-[11px] font-bold uppercase glass">
              Explore More Work
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

