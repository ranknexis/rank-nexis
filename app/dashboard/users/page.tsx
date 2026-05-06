import { getAllUsers } from "@/actions/users";
import UsersList from "./components/UsersList";
import { UserPlus } from "lucide-react";

export default async function UsersPage() {
    const res = await getAllUsers();
    const users = res.users || [];

    return (
        <div className="space-y-10">
            <div className="flex justify-between items-end">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold uppercase tracking-tighter text-text-primary">System <span className="text-brand">Users.</span></h1>
                    <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest">Manage access nodes and permission levels.</p>
                </div>
            </div>

            <UsersList initialUsers={JSON.parse(JSON.stringify(users))} />
        </div>
    );
}
