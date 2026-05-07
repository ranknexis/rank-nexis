import { getTestimonials } from "@/actions/feedback";
import DashboardShell from "../components/DashboardShell";
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
    <DashboardShell session={session}>
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-black uppercase tracking-tight text-text-primary">
               Feedback <span className="text-brand">Hub.</span>
            </h1>
            <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Manage global client testimonials and expertise loops</p>
          </div>
        </div>

        <FeedbackList initialTestimonials={testimonials} />
      </div>
    </DashboardShell>
  );
}
