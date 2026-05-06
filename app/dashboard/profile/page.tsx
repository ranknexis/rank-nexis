import { getMyProfile } from "@/actions/profile";
import ProfileForm from "./components/ProfileForm";
import SecurityForm from "./components/SecurityForm";

export default async function ProfilePage() {
    const res = await getMyProfile();
    const user = res.user;

    if (!user) return <div>Access Denied</div>;

    return (
        <div className="space-y-12 pb-20">
            <div className="flex justify-between items-end">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold uppercase tracking-tighter text-text-primary">My <span className="text-brand">Profile.</span></h1>
                    <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest">Update your expert node and public identity.</p>
                </div>
            </div>

            <ProfileForm initialUser={JSON.parse(JSON.stringify(user))} />

            <div className="pt-12 border-t border-stroke">
                <SecurityForm />
            </div>
        </div>
    );
}
