import { getMyProfile } from "@/actions/profile";
import ProfileForm from "./components/ProfileForm";
import SecurityForm from "./components/SecurityForm";

export default async function ProfilePage() {
    const res = await getMyProfile();
    const user = res.user;

    if (!user) return <div>Access Denied</div>;

    return (
        <div className="space-y-12 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-stroke pb-8">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold uppercase tracking-tighter text-text-primary">Operator <span className="text-brand">Identity.</span></h1>
                    <p className="text-[10px] font-bold uppercase text-text-muted tracking-widest">Manage personal credentials and system access protocols.</p>
                </div>
            </div>

            <ProfileForm initialUser={JSON.parse(JSON.stringify(user))} />

            <div className="pt-12 border-t border-stroke">
                <SecurityForm />
            </div>
        </div>
    );
}
