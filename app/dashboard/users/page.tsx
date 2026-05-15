import { getAllUsers } from "@/actions/users";
import UsersList from "./components/UsersList";
import { UserPlus } from "lucide-react";

export default async function UsersPage() {
    const res = await getAllUsers();
    const users = res.users || [];

    return (
        <div className="space-y-10">
            <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight text-text-primary">Users</h1>
                    <p className="text-sm text-text-muted">Manage user accounts and permission levels.</p>
                </div>
            </div>

            <UsersList initialUsers={JSON.parse(JSON.stringify(users))} />
        </div>
    );
}
