import { getAllUsers } from "@/actions/users";
import UsersList from "./components/UsersList";
import { UserPlus } from "lucide-react";

export default async function UsersPage() {
    const res = await getAllUsers();
    const users = res.users || [];

    return (
        <div className="space-y-10">


            <UsersList initialUsers={JSON.parse(JSON.stringify(users))} />
        </div>
    );
}
