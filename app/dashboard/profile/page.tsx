import { getMyProfile } from "@/actions/profile";
import ProfileForm from "./components/ProfileForm";
import SecurityForm from "./components/SecurityForm";

export default async function ProfilePage() {
    const res = await getMyProfile();
    const user = res.user;

    if (!user) return <div className="p-8 text-center text-xs font-bold text-red-500 uppercase">Access Denied</div>;

    return (
        <div className="space-y-6 pb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stroke pb-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-extrabold uppercase tracking-tight text-text-primary">Profile Settings</h1>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-text-muted">Manage your personal profile details, contact information, and account password.</p>
                </div>
            </div>

            <ProfileForm initialUser={JSON.parse(JSON.stringify(user))} />

            <div className="pt-6 border-t border-stroke">
                <SecurityForm />
            </div>
        </div>
    );
}
