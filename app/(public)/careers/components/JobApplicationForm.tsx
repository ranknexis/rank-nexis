"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { submitJobApplication } from "@/actions/careers";

interface Props {
  jobId: string;
}

export default function JobApplicationForm({ jobId }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      jobId,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      resume: "RESUME_PLACEHOLDER", 
      portfolio: formData.get("portfolio") as string,
      coverLetter: formData.get("coverLetter") as string,
    };

    try {
      const res = await submitJobApplication(data);
      if (res.success) {
        toast.success("Application Received. Our team will review your application soon.");
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error(res.error || "Failed to submit application");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleApply} className="space-y-8">
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase text-brand ml-4">Full Name</label>
        <input required name="name" type="text" placeholder="John Doe" className="input-field shadow-sm bg-white" />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase text-brand ml-4">Email Address</label>
        <input required name="email" type="email" placeholder="john@example.com" className="input-field shadow-sm bg-white" />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase text-brand ml-4">Portfolio Link (Optional)</label>
        <input name="portfolio" type="url" placeholder="https://..." className="input-field shadow-sm bg-white" />
      </div>
      <div className="space-y-4">
        <label className="text-[10px] font-bold uppercase text-brand ml-4">Why should we hire you?</label>
        <textarea required name="coverLetter" rows={4} placeholder="Tell us about your experience..." className="input-field h-auto py-6 resize-none shadow-sm bg-white" />
      </div>

      <button disabled={isSubmitting} type="submit" className="btn-primary w-full h-20 text-[10px] uppercase group shadow-premium">
        {isSubmitting ? "Sending..." : "Submit Application"}
        <ArrowRight size={16} className="ml-3 group-hover:translate-x-2 transition-transform" />
      </button>
    </form>
  );
}
