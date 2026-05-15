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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-text-primary">
               Feedback
            </h1>
            <p className="text-sm text-text-muted">Manage client testimonials and reviews</p>
          </div>
        </div>

        <FeedbackList initialTestimonials={testimonials} />
      </div>
  );
}
