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
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight text-text-primary">Profile</h1>
                    <p className="text-sm text-text-muted">Manage your personal information and security settings.</p>
                </div>
            </div>

            <ProfileForm initialUser={JSON.parse(JSON.stringify(user))} />

            <div className="pt-12 border-t border-stroke">
                <SecurityForm />
            </div>
        </div>
    );
}
