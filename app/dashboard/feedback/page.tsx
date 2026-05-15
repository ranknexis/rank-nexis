import { getTestimonials } from "@/actions/feedback";
import FeedbackList from "./components/FeedbackList";

export const metadata = {
  title: "Feedback Hub | RankNexis Dashboard",
  description: "Global synchronization of client testimonials and expertise feedback.",
};

import { getSession } from "@/lib/auth";

export default async function FeedbackPage() {
  const [session, { testimonials = [] }] = await Promise.all([
    getSession(),
    getTestimonials()
  ]);

  return (
      <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-stroke pb-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold uppercase tracking-tighter text-text-primary">Client <span className="text-brand">Sentiment.</span></h1>
          <p className="text-[10px] font-bold uppercase text-text-muted tracking-widest">Global synchronization of client testimonials and expertise feedback.</p>
        </div>
      </div>

        <FeedbackList initialTestimonials={testimonials} />
      </div>
  );
}
